<template>
  <div class="relative">
    <Loading v-if="$auth.isLoading" />
    <div v-else id="app" class="d-flex flex-column h-100">
      <template>
        <NavBar />
        <div class="container flex-grow-1">
          <div class="mt-5">
            <router-view />
          </div>
        </div>
        <Footer />
      </template>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import Loading from '@/components/Loading'

import 'vue-select/dist/vue-select.css'

export default {
  components: {
    Loading,
    Footer,
    NavBar,
  },
}
</script>

<style scoped>
.relative {
  position: relative;
}
</style>
