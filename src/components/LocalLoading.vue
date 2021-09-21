<template>
  <div class="relative">
    <loading v-if="loading" :full-screen="false" />
    <slot />
  </div>
</template>

<script>
import Loading from './Loading.vue'

export default {
  name: 'LoadingOverlay',
  components: { Loading },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped>
.relative {
  position: relative;
}
</style>
