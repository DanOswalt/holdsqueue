<template>
  <div id="wrapper">
    <main>
      <header>
        <h2 class="title">Holds Queue [{{ holds.length }}]</h2>
        <p> {{ lastCheck }} </p>
      </header>
      <ul id="queue">
        <li v-for="hold in holds"
            class="cell info">
          <p class="hold-top-line"> {{ hold.callNumber }} ({{ hold.shelvingLocation }})</p>
          <p class="hold-desc"> {{ hold.title }} </p>
          <p class="hold-desc"> {{ hold.author }} </p>
        </li>
      </ul>
    </main>
  </div>
</template>

<script>
  export default {
    name: 'holdsqueue',
    components: {},
    data () {
      return {
        holds: [],
        lastCheck: null
      }
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    },
    created () {
      const component = this
      const fetchRequests = require('../fetchRequests.js')
      fetchRequests(component)
      setInterval(fetchRequests, 1 * 60 * 1000, component)
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
    background: #0f2326;
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
    height: 80px;
    width: 400px;
    color: #444;
    background: #51bec0;
    border: #0f2326 2px solid;
    padding: 6px;
    border-radius: 8px;
  }

  .hold-top-line {
    font-weight: bolder;
  }

  .hold-desc {
    font-size: 12px;
  }

  .title {
    color: #ef7630;
    padding: 5px;
  }
</style>
