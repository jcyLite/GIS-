import Vue from 'vue'
import App from './App.vue'  // 部件页面
import Wgsj from './wgsj.vue'  // 网格页面
import Sjsj from './sjsj.vue'  // 事件页面
import { createStore } from './store'
import { createRouter } from './router'
import { sync } from 'vuex-router-sync'
import CreateAPI from 'vue-create-api'
Vue.use(CreateAPI)

import changeName from './components/changeName.vue'
import filter from './components/fiter.vue'
import diyLayer from './components/diyLayer.vue'
import sortTable from './components/sortTable.vue'
import add from './components/add.vue'
import poperDetail from './components/poperDetail.vue'
import wgsjAdd from './components/wgsjAdd.vue'
import wgsjPoperDetail from './components/wgsjPoperDetail.vue'
Vue.createAPI(changeName,true)
Vue.createAPI(filter,true)
Vue.createAPI(diyLayer,true)
Vue.createAPI(sortTable,true)
Vue.createAPI(add,true)
Vue.createAPI(poperDetail,true)
Vue.createAPI(wgsjAdd,true)
Vue.createAPI(wgsjPoperDetail,true)


export function createApp (type) {  // type：0---部件页面  1---网格页面  2---事件页面
  // create store and router instances
  const store = createStore()
  const router = createRouter()

  // sync the router with the vuex store.
  // this registers `store.state.route`
  sync(store, router);
  // create the app instance.
  // here we inject the router, store and ssr context to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = new Vue({
    router,
    store,
    mounted(){},
    render: h => h(type==1?Wgsj:type==2?Sjsj:App)
  })

  // expose the app, the router and the store.
  // note we are not mounting the app here, since bootstrapping will be
  // different depending on whether we are in a browser or on the server.
  return { app, router, store }
}
