<template>
  <div id="owl-container">
    <svg
       xmlns:dc="http://purl.org/dc/elements/1.1/"
       xmlns:cc="http://creativecommons.org/ns#"
       xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
       xmlns:svg="http://www.w3.org/2000/svg"
       xmlns="http://www.w3.org/2000/svg"
       version="1.1"
       width=40%
       height=40%
       viewBox="0 0 2000 2000"
       id="owl-svg-canvas">
      <metadata
         id="metadata8">
        <rdf:RDF>
          <cc:Work
             rdf:about="">
            <dc:format>image/svg+xml</dc:format>
            <dc:type
               rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
            <dc:title></dc:title>
          </cc:Work>
        </rdf:RDF>
      </metadata>
      <defs
         id="defs6" />
      <g
         id="owlGroup">
        <g
           id="owl">
          <path
             d="M 286.15224,1208.1524 C 88.921867,977.02413 197.13671,621.68437 241.22276,566.15693 c 53.98166,61.84367 86.37705,72.58245 125.33217,93.11137 151.22923,180.20831 75.05774,559.9566 -80.40269,548.8841 z"
             id="leftWing"
             style="fill:#a9e0e5;stroke:#000000;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" />
          <path
             d="m 491.25644,698.95967 c 234.22346,38.47816 269.8722,8.86606 368.44234,-1.99698 -82.59623,213.47499 -27.33748,396.07061 18.97128,477.27761 l -409.38037,0.9985 c 71.90469,-113.8317 91.37372,-306.90706 21.96675,-476.27913 z"
             id="chest"
             style="fill:#a9e0e5;stroke:#000000;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" />
          <path
             d="m 1097.8893,557.06409 c -19.758,28.9759 -45.2714,57.61325 -96.7272,84.72457 -182.58304,171.96967 -86.34483,580.40694 57.1891,564.83054 107.5361,-89.5929 170.8365,-416.03936 39.5381,-649.55511 z"
             id="rightWing"
             style="fill:#a9e0e5;stroke:#000000;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" />
          <path
             d="m 417.97458,126.38082 137.67743,-0.70603 105.90572,87.54873 11.29661,0 103.08157,-88.25477 136.9714,0.70604 76.95816,237.93485 c 22.86973,18.34295 50.95153,76.70262 55.77703,98.1393 -1.2342,102.25215 -202.70529,172.48431 -376.31698,172.47442 -164.34778,-0.009 -370.31436,-58.04797 -380.55592,-171.06234 14.64522,-32.82067 4.21094,-40.93016 72.01589,-120.73253 z"
             id="head"
             style="fill:#a9e0e5;stroke:#000000;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" />
          <g id="eyes">
            <path
               d="m 611.42902,379.84851 a 107.31779,107.31779 0 1 1 -214.63557,0 107.31779,107.31779 0 1 1 214.63557,0 z"
               transform="translate(16.238877,16.944915)"
               id="leftEye"
               style="fill:##2c6ea4" />
            <path
               d="m 611.42902,379.84851 a 107.31779,107.31779 0 1 1 -214.63557,0 107.31779,107.31779 0 1 1 214.63557,0 z"
               transform="translate(308.53866,16.944919)"
               id="rightEye"
               style="fill:##2c6ea4" />
          </g>
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
  export default {
    name: 'holdsqueue',
    components: {},
    methods: {
      flutter: function () {
        console.log('doing flutter')
        // this.$('#owl-svg-canvas').delay(400).velocity({ translateX: 1350 }, { duration: 500 })

        this.$('#leftWing').delay(300)
          .velocity({ rotateZ: 5 })
          .velocity({ rotateZ: -5 }, { duration: 200 })
          .velocity({ rotateZ: 0 })

        this.$('#rightWing').delay(300)
          .velocity({ rotateZ: 5 })
          .velocity({ rotateZ: -5 }, { duration: 200 })
          .velocity({ rotateZ: 0 })

        // several blinks over 10 seconds
        this.$('#eyes').delay(2000)
          .velocity({ opacity: 0 }, { duration: 100 })
          .velocity({ opacity: 1 }, { duration: 100 })

        this.$('#eyes').delay(4000)
          .velocity({ opacity: 0 }, { duration: 100 })
          .velocity({ opacity: 1 }, { duration: 100 })

        this.$('#eyes').delay(7000)
          .velocity({ opacity: 0 }, { duration: 100 })
          .velocity({ opacity: 1 }, { duration: 100 })

        this.$('#eyes').delay(9500)
          .velocity({ opacity: 0 }, { duration: 100 })
          .velocity({ opacity: 1 }, { duration: 100 })

        // flutter and lift at 2000
        this.$('#leftWing').delay(2000)
          .velocity({ rotateZ: 5 }, { duration: 200 })
          .velocity({ rotateZ: -5 }, { duration: 200 })
          .velocity({ rotateZ: 5 }, { duration: 100 })
          .velocity({ rotateZ: -5 }, { duration: 100 })
          .velocity({ rotateZ: 5 }, { duration: 100 })
          .velocity({ rotateZ: -5 }, { duration: 100 })
          .velocity({ rotateZ: 5 }, { duration: 50 })
          .velocity({ rotateZ: -5 }, { duration: 50 })
          .velocity({ rotateZ: 5 }, { duration: 200 })
          .velocity({ rotateZ: 0 }, { duration: 400 })

        this.$('#rightWing').delay(2000)
          .velocity({ rotateZ: -5 }, { duration: 200 })
          .velocity({ rotateZ: 5 }, { duration: 200 })
          .velocity({ rotateZ: -5 }, { duration: 100 })
          .velocity({ rotateZ: 5 }, { duration: 100 })
          .velocity({ rotateZ: -5 }, { duration: 100 })
          .velocity({ rotateZ: 5 }, { duration: 100 })
          .velocity({ rotateZ: -5 }, { duration: 50 })
          .velocity({ rotateZ: 5 }, { duration: 50 })
          .velocity({ rotateZ: -5 }, { duration: 200 })
          .velocity({ rotateZ: 0 }, { duration: 400 })

        this.$('#owl-svg-canvas').delay(3000)
          .velocity({ translateY: -20 }, { duration: 500 })
          .velocity({ translateY: 0 }, { duration: 200 }, { easing: 'ease-in' })
      },
      created () {
        this.flutter()
      }
    }
  }
</script>

<style>

  #owl-container {
    text-align: center;
    margin-left: 40px;
    margin-top: 150px;
  }

  #eyes {
    fill: #0f2326;
  }

  #leftWing {
    transform-origin: top left;
  }

  #rightWing {
    transform-origin: top right;
  }

  #chest {
    transform-origin: top left;
  }

</style>
