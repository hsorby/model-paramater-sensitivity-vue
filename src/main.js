import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Import the Auth0 configuration and plugin
import { domain, clientId, audience } from '../auth_config.json'
import { Auth0Plugin } from '@/auth/auth0-plugin'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes, faPlusSquare, faMinusSquare, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'

import VueSweetalert2 from 'vue-sweetalert2'

import '@/assets/css/styles.css'
import 'vue-select/dist/vue-select.css'
import 'sweetalert2/dist/sweetalert2.min.css'

library.add(faTimes, faPlusSquare, faMinusSquare, faAngleRight, faAngleLeft)

Vue.config.productionTip = false

Vue.component('font-awesome-icon', FontAwesomeIcon)

// Install the authentication plugin
Vue.use(Auth0Plugin, {
  domain,
  clientId,
  audience,
  onRedirectCallback: (appState) => {
    router.push(appState && appState.targetUrl ? appState.targetUrl : window.location.pathname)
  },
})

Vue.use(VueSweetalert2)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
