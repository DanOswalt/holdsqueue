<template>
  <div id="wrapper">
    <main>
      <header>
        <span class="title">Pick up from shelf ( {{ holds.length }} )</span>
        <button id="print-btn" class="btn" @click="print">print</button>
      </header>
      <div id="last-checked">
        <span>Last checked: {{ lastCheckTime }}</span>
      </div>
      <div class="spinner" v-visible="isRequestingData">
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
      </div>
      <div id='owl-box' v-show="showOwl">
        <owl :showOwl="showOwl"></owl>
      </div>
      <ul id="queue">
      <!-- <transition-group name="list-item" tag="ul" id="queue"> -->
        <li v-for="hold in holds"
            class="cell info">
          <p class="hold-call-number"><a :href="hold.primoLink" target="_blank">{{ hold.callNumber }} ({{ hold.shelvingLocation }})</a></p>
          <p class="hold-title"> {{ hold.title }} </p>
          <p class="hold-author"> - {{ hold.author }} </p>
        </a></li>
      <!-- </transition-group> -->
      </ul>
    </main>
  </div>
</template>

<script>
  import Owl from './HoldsQueue/Owl.vue'

  export default {
    name: 'holdsqueue',
    components: {
      Owl
    },
    data () {
      return {
        holds: [],
        lastCheckTime: null,
        isRequestingData: false
      }
    },
    computed: {
      showOwl: function () {
        return (this.holds === 'undefined' || this.holds.length === 0)
      }
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      print () {
        this.$electron.ipcRenderer.send('print-to-pdf')
      }
    },
    mounted () {
      this.$electron.ipcRenderer.on('wrote-to-pdf', (event, data) => {
        console.log(data)
      })
    },
    created () {
      const component = this
      const fetchRequests = require('../fetchRequests.js')
      fetchRequests(component)
      setInterval(fetchRequests, 2 * 60 * 1000, component)
    }
  }
</script>

<style scoped>

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    /* font-family: 'Monaco', sans-serif; */
    color: #eee;
    background: #0f2326;
  }

  header {
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    color: #a9e0e5;
    padding: 15px;
    font-size: 20px;
  }

  #last-checked {
    text-align: center;
    font-size: 12px;
    margin-bottom: 3px;
  }

  #queue {
    list-style: none;
    padding: 0;
  }

  a {
    color: inherit;
    text-decoration: inherit;
  }

  .cell {
    height: 80px;
    width: 390px;
    color: #444;
    background: #0f2326;
    border: #51bec0 1px solid;
    padding: 15px 15px;
    margin: 4px;
    border-radius: 10px;
    color: #a9e0e5;
  }

  .cell:hover {
    opacity: 0.7;
  }

  .btn {
    background: #a9e0e5;
    color: #0f2326;
    border-radius: 5px;
    font-family: Arial;
    font-size: 16px;
    padding: 8px 20px 8px 20px;
    text-decoration: none;
    cursor: pointer;
  }

  .btn:hover {
    background: #a9e0e5;
    text-decoration: none;
  }

  .hold-call-number {
    color: #ef7630;
    padding-bottom: 3px;
  }

  .hold-call-number:hover {
    text-decoration: underline;
  }

  .hold-title {
    font-weight: bolder;
    font-size: 12px;
  }

  .hold-author {
    opacity: 0.7;
    font-size: 12px;
  }

  /* animated transitions */

  .list-item-enter-active, .list-item-leave-active {
    transition: opacity 1.5s;
  }

  .list-item-enter, .list-item-leave-to /* .list-leave-active for <2.1.8 */ {
    opacity: 0;
  }



  /* http://tobiasahlin.com/spinkit/ */

  .spinner {
    margin: 0 auto;
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
