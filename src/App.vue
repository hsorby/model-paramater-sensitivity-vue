<template>
  <div class="relative">
    <loading v-if="$auth.isLoading" />
    <div v-else id="app" class="d-flex flex-column h-100">
      <template>
        <nav-bar />
        <div class="container flex-grow-1">
          <div class="mt-5">
            <router-view />
          </div>
        </div>
        <Footer />
      </template>
    </div>
    <notifications />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import Loading from '@/components/Loading'
import Notifications from './components/Notifications.vue'

export default {
  components: {
    Loading,
    Footer,
    NavBar,
    Notifications,
  },
  watch: {
    '$auth.isAuthenticated': {
      async handler() {
        this.$store.commit('changeUserState', this.$auth.isAuthenticated)
        this.$store.dispatch('fetchUserModels')
        this.$store.dispatch('simulations/fetchUserSimulations')
      },
    },
  },
}
</script>

<style scoped>
.relative {
  position: relative;
}
</style>
