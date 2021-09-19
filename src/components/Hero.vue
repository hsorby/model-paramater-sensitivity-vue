<template>
  <div class="text-center hero">
    <img class="mb-3 app-logo" :src="heroLogo" alt="MPS logo" width="120" />
    <h1 class="mb-4">Model Parameter Sensitivity</h1>
    <p class="lead">This is an application for running parameter sensitivity simulations for CellML 2.0 models.</p>
  </div>
</template>

<script>
export default {
  name: 'Hero',
  data() {
    return {
      heroLogo: 'https://github.com/hsorby/model-paramater-sensitivity-vue/src/assets/mps-32-icon.svg',
    }
  },
}
</script>
