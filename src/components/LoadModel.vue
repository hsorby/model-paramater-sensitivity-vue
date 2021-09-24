<template>
  <div>
    <local-loading :loading="loadingUserModel">
      <span :class="{ 'ghost-text': !valueReady }">{{ currentUserModel }}</span>
      <load-button class="ml-2" :disabled="!valueReady" @click="loadUserModel" />
    </local-loading>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import LoadButton from './Buttons/LoadButton.vue'
import LocalLoading from './LocalLoading.vue'

export default {
  name: 'LoadModel',
  components: { LoadButton, LocalLoading },
  computed: {
    ...mapGetters(['currentUserModel', 'loadingUserModel']),
    valueReady() {
      return this.currentUserModel !== '<no-model-selected>'
    },
  },
  methods: {
    ...mapActions(['loadUserModel']),
  },
}
</script>

<style scoped>
.ghost-text {
  color: lightslategray;
}
</style>
