import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Import the Auth0 configuration and plugin
import { domain, clientId, audience } from '../auth_config.json'
import { Auth0Plugin } from '@/auth/auth0-plugin'

import './assets/css/styles.css'

Vue.config.productionTip = false

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
