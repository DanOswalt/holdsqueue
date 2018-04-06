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
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Monaco');

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
