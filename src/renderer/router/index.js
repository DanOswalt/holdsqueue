import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'holdsqueue',
      component: require('@/components/HoldsQueue').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
