<template>
  <div>
    <local-loading :loading="loadingItem">
      <slot></slot>
      <div id="load-file-target">
        <span :class="{ 'ghost-text': !valueReady }">{{ currentItem }}</span>
        <load-button class="ml-2" :disabled="!valueReady" @click="loadUserModel" />
      </div>
    </local-loading>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import LoadButton from '../../Buttons/LoadButton.vue'
import LocalLoading from '../../LocalLoading.vue'

export default {
  name: 'LoadModel',
  components: { LoadButton, LocalLoading },
  computed: {
    ...mapGetters('model', ['currentItem', 'loadingItem']),
    valueReady() {
      return this.currentItem !== '<not-set>'
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
