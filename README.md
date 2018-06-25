# holdsqueue

An electron.js desktop application that displays a live queue of our library's current holds requests, via the User API in ALMA (our library software vendor).

This improves our service by giving us the ability to see and fetch holds request the moment they come in, instead of processing a report one time per day. As a reward for getting the queue down to zero, you'll see our owl logo chilling out.

![queue](https://github.com/DanOswalt/holdsqueue/blob/master/queue.png)

[![https://gyazo.com/f452ff06fb7df989876fcb115fbac666](https://i.gyazo.com/f452ff06fb7df989876fcb115fbac666.gif)](https://gyazo.com/f452ff06fb7df989876fcb115fbac666)

## Tech used
* JavaScript (ES6) / Node
* Electron.js
* Vue.js
* HTML5 / CSS3 / SVG Animation
* Web APIs

#### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build

# run unit tests
npm test


# lint all JS/Vue component files in `src/`
npm run lint

```

---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).
