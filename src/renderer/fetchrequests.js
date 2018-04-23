const axios = require('axios')

const processHoldsData = (requestedResources) => {
  const holds = requestedResources.filter(req => req.request[0].request_type === 'HOLD')

  if (holds) {
    const holdsQueue = makeHoldsQueue(holds)
    trimTitles(holdsQueue)
    return holdsQueue
  }
}

const getTimeStamp = () => {
  const d = new Date()
  const hour = d.getHours()
  let minutes = d.getMinutes()
  if (minutes < 10) minutes = '0' + minutes
  return `${hour}:${minutes}`
}

const makeHoldsQueue = (holds) => {
  return holds.map(hold => {
    return {
      callNumber: hold.location.call_number,
      shelvingLocation: hold.location.shelving_location,
      requester: hold.request[0].requester.desc,
      title: hold.resource_metadata.title,
      author: hold.resource_metadata.author,
      primoLink: `https://primo.lclark.edu/primo-explore/search?query=any,contains,${encodeURI(hold.location.call_number)}&tab=default_tab&search_scope=lcc_nz_pc&vid=LCC&lang=en_US&offset=0&tab=lc_only&search_scope=lcc_local`
    }
  })
}

const trimTitles = (holdsQueue) => {
  holdsQueue.forEach(hold => {
    if (hold.title.length > 40) { hold.title = hold.title.substr(0, 40) + '...' }
    // console.log('|')
    // console.log(`${hold.callNumber} (${hold.shelvingLocation})`)
    // console.log(`${hold.title}, ${hold.author}`)
    // console.log(`${hold.requester}`)
  })
}

const fetchRequests = (component) => {
  component.isRequestingData = true

  const req = {
    query: 'https://api-eu.hosted.exlibrisgroup.com/almaws/v1/task-lists/requested-resources',
    library: 'Watzek', // required
    circ_desk: 'DEFAULT_CIRC_DESK', // required
    apikey: process.env.HQAPIKEY, // required
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

      // fetch more results if count is greater
      if (diff > 0) {
        // add offset of 100, and limit HAS TO BE EXACTLY THE REMAINING NUMBER OF RECORDS $*#&^#*$
        const urlWithOffset = `${req.query}?library=${req.library}&circ_desk=${req.circ_desk}&apikey=${req.apikey}&format=${req.format}&offset=${req.offset}&limit=${diff - 1}`

        axios
          .get(urlWithOffset)
          .then(response => {
            const moreResults = response.data.requested_resource

            requestedResources.push.apply(requestedResources, response.data.requested_resource)
            fetchedCount += moreResults.length

            // console.log(fetchedCount + ' requests fetched.')

            component.holds = processHoldsData(requestedResources, component.holds)
            component.lastCheckDate = getTimeStamp()
            component.isRequestingData = false
          }).catch(error => {
            console.dir(error.response.data.errorList.error)
            component.isRequestingData = false
          })
      } else {
        // console.log('only needed one try, go to process')
        component.holds = processHoldsData(requestedResources, component.holds)
        component.lastCheckTime = getTimeStamp()
        component.isRequestingData = false
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
