const axios = require('axios')

const processHoldsData = (requestedResources) => {
  const holds = requestedResources.filter(req => req.request[0].request_type === 'HOLD')

  if (holds.length > 0) {
    const holdsQueue = makeHoldsQueue(holds)
    displayHoldsQueueInTerminal(holdsQueue)
    return holdsQueue
  }
}

const makeHoldsQueue = (holds) => {
  return holds.map(hold => {
    return {
      callNumber: hold.location.call_number,
      shelvingLocation: hold.location.shelving_location,
      requester: hold.request[0].requester.desc,
      title: hold.resource_metadata.title,
      author: hold.resource_metadata.author
    }
  })
}

const displayHoldsQueueInTerminal = (holdsQueue) => {
  holdsQueue.forEach(hold => {
    if (hold.title.length > 40) { hold.title = hold.title.substr(0, 40) + '...' }
    console.log('|')
    console.log(`${hold.callNumber} (${hold.shelvingLocation})`)
    console.log(`${hold.title}, ${hold.author}`)
    console.log(`${hold.requester}`)
  })
}

const fetchRequests = (component) => {
  component.isRequestingData = true

  const req = {
    query: 'https://api-eu.hosted.exlibrisgroup.com/almaws/v1/task-lists/requested-resources',
    library: 'Watzek', // required
    circ_desk: 'DEFAULT_CIRC_DESK', // required
    apikey: 'l7xx7ad7bd452f5948c8862d81717b0356f8', // required
    format: 'json',
    limit: 100,
    offset: 100,
    order_by: '',
    location: '',
    pickup_inst: 'Watzek',
    reported: '',
    printed: ''
  }

  const url = `${req.query}?library=${req.library}&circ_desk=${req.circ_desk}&apikey=${req.apikey}&format=${req.format}&limit=${req.limit}`

  console.log('fetch the first batch...')
  axios
    .get(url)
    .then(response => {
      const requestedResources = response.data.requested_resource
      const totalCount = response.data.total_record_count

      let fetchedCount = requestedResources.length
      let diff = totalCount - fetchedCount

      console.log(totalCount + ' total in Alma.')
      console.log(fetchedCount + ' results fetched in first try.')

      // fetch more results if count is greater
      if (diff > 0) {
        console.log('there are ' + diff + ' more results, hold on...')

        // add offset of 100, and limit HAS TO BE EXACTLY THE REMAINING NUMBER OF RECORDS $*#&^#*$
        const urlWithOffset = `${req.query}?library=${req.library}&circ_desk=${req.circ_desk}&apikey=${req.apikey}&format=${req.format}&offset=${req.offset}&limit=${diff - 1}`

        axios
          .get(urlWithOffset)
          .then(response => {
            console.log('actual holds in first batch count? ' + requestedResources.filter(req => req.request[0].request_type === 'HOLD').length)
            const moreResults = response.data.requested_resource
            if (moreResults) {
              console.log(moreResults.length + ' more results fetched in second try')
              console.log('actual holds in second batch count? ' + moreResults.filter(req => req.request[0].request_type === 'HOLD').length)
              console.dir('last record in first batch: ', moreResults[moreResults.length - 1])
              console.dir('last record in second batch: ', requestedResources[requestedResources.length - 1])
            } else {
              console.log('no requested resources with offset at ' + req.offset)
            }

            requestedResources.push.apply(requestedResources, response.data.requested_resource)
            fetchedCount += moreResults.length

            // console.log(fetchedCount + ' requests fetched.')

            component.holds = processHoldsData(requestedResources)
            component.lastCheck = new Date()
            component.isRequestingData = false
          }).catch(error => {
            console.dir(error.response.data.errorList.error)
            component.isRequestingData = false
          })
      } else {
        console.log('only needed one try, go to process')
        component.holds = processHoldsData(requestedResources)
        component.lastCheck = new Date()
        component.isRequestingData = false
        console.log(new Date())
      }
    })
    .catch(error => {
      if (error.response != null) {
        console.dir(error.response.data.errorList.error)
        component.isRequestingData = false
      } else {
        console.dir(error)
        component.isRequestingData = false
      }
    })
}

module.exports = fetchRequests
