<template>
  <div :class="{ 'loading-overlay-full-screen': fullScreen, 'loading-overlay-local': !fullScreen, 'loading-overlay': true }">
    <div v-if="imageOrText" class="image loading-overlay-content" />
    <div v-else class="text loading-overlay-content">Loading ...</div>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    imageOrText: {
      type: Boolean,
      default: true,
    },
    fullScreen: {
      type: Boolean,
      default: true,
    },
  },
}
</script>
