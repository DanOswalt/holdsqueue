<template>
  <div id="wrapper">
    <main>
      <header>
        <div>Holds Queue</div>
      </header>
      <ul id="queue">
        <li class="cell info">Tale of two cities</li>
      </ul>
    </main>
  </div>
</template>

<script>
  export default {
    name: 'holdsqueue',
    components: {},
    data: function () {
      return {
        holds: []
      }
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    },
    created () {
      const axios = require('axios')
      // https://api-eu.hosted.exlibrisgroup.com/almaws/v1/task-lists/requested-resources?library=Watzek&circ_desk=DEFAULT_CIRC_DESK&apikey=l7xx7ad7bd452f5948c8862d81717b0356f8&format=json&limit=100

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
          if (hold.title.length > 30) { hold.title = hold.title.substr(0, 30) + '...' }
          console.log('|')
          console.log(`${hold.callNumber} (${hold.shelvingLocation})`)
          console.log(`${hold.title}, ${hold.author}`)
          console.log(`${hold.requester}`)
        })
      }

      const processHoldsData = (requestedResources) => {
        const holds = requestedResources.filter(req => req.request[0].request_type === 'HOLD')

        if (holds.length > 0) {
          this.holdsQueue = makeHoldsQueue(holds)
          displayHoldsQueueInTerminal(this.holdsQueue)
          console.log('holds count: ' + this.holdsQueue.length)
        }
      }

      const fetchRequests = () => {
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

                  processHoldsData(requestedResources)
                }).catch(error => {
                  console.dir(error.response.data.errorList.error)
                })
            } else {
              console.log('only needed one try, go to process')
              processHoldsData(requestedResources)
            }
          })
          .catch(error => {
            if (error.response != null) {
              console.dir(error.response.data.errorList.error)
            } else {
              console.dir(error)
            }
          })
      }

      /*
      run the app on load
      */

      fetchRequests()
    }
  }
</script>

<style>

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Monaco', sans-serif;
    color: #eee;
  }

  #wrapper {
    background: #222;
    height: 100vh;
    width: 100vw;
  }

  header {
    text-align: center;
  }

  #queue {
    list-style: none;
    padding: 0;
  }

  .cell {
    height: 40px;
    width: 400px;
    color: #444;
    background: orange;
  }



</style>
