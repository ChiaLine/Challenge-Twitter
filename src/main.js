import Vue from 'vue'
import VueSocketIOExt from 'vue-socket.io-extended';
import { io } from 'socket.io-client'

import App from './App.vue'
import router from './router'
import store from './store'
import './assets/scss/styles.scss'

import { socketURL } from "./utils/helpers";

const getToken = () => localStorage.getItem('token')

const options = { auth: { token: getToken() } }; //Options object to pass into SocketIO
const socket = io(socketURL, options);

Vue.use(VueSocketIOExt, socket, { store });

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
