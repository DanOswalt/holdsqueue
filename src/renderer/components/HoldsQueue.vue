<template>
  <div id="wrapper">
    <main>
      <header>
        <span class="title">Current Local Holds ({{ holds.length }})</span>
      </header>
      <ul id="queue">
        <li v-for="hold in holds"
            class="cell info">
          <p class="hold-call-number"><a :href="hold.primoLink">{{ hold.callNumber }} ({{ hold.shelvingLocation }})</a></p>
          <p class="hold-title"> {{ hold.title }} </p>
          <p class="hold-author"> - {{ hold.author }} </p>
        </a></li>
      </ul>
      <div class="spinner" v-show="isRequestingData">
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
      </div>
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
        lastCheck: null,
        isRequestingData: false
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
      setInterval(fetchRequests, 2 * 60 * 1000, component)
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
    background: #0f2326;
  }

  header {
    text-align: center;
    color: #a9e0e5;
    padding: 15px;
    font-size: 24px;
  }

  #queue {
    list-style: none;
    padding: 0;
  }

  .cell {
    height: 80px;
    width: 390px;
    color: #444;
    background: #0f2326;
    border: #51bec0 1px solid;
    padding: 10px 15px;
    margin: 4px;
    border-radius: 10px;
    color: #a9e0e5;
  }

  .hold-call-number {
    color: #ef7630;
    padding-bottom: 3px;
  }

  .hold-title {
    font-weight: bolder;
    font-size: 12px;
  }

  .hold-author {
    opacity: 0.7;
    font-size: 12px;
  }



  /* http://tobiasahlin.com/spinkit/ */

  .spinner {
    margin: 15px auto 0;
    width: 70px;
    text-align: center;
  }

  .spinner > div {
    width: 14px;
    height: 14px;
    background-color: #a9e0e5;

    border-radius: 100%;
    display: inline-block;
    -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
    animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  }

  .spinner .bounce1 {
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }

  .spinner .bounce2 {
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
  }

  @-webkit-keyframes sk-bouncedelay {
    0%, 80%, 100% { -webkit-transform: scale(0) }
    40% { -webkit-transform: scale(1.0) }
  }

  @keyframes sk-bouncedelay {
    0%, 80%, 100% {
      -webkit-transform: scale(0);
      transform: scale(0);
    } 40% {
      -webkit-transform: scale(1.0);
      transform: scale(1.0);
    }
  }
</style>
