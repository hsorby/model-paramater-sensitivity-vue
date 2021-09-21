import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Import the Auth0 configuration and plugin
import { domain, clientId, audience } from '../auth_config.json'
import { Auth0Plugin } from '@/auth/auth0-plugin'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes, faPlusSquare, faMinusSquare } from '@fortawesome/free-solid-svg-icons'

import '@/assets/css/styles.css'

library.add(faTimes, faPlusSquare, faMinusSquare)

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

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
