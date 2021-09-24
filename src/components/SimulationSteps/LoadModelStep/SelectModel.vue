<template>
  <div>
    <local-loading :loading="fetchingUserModels">
      <slot></slot>
      <v-select
        :value="selectedUserModel"
        :options="userModels"
        :disabled="userModelCount === 0"
        :clearable="false"
        class="mr-4 inline-block select"
        @input="userModelChanged"
      ></v-select>
      <select-button id="use-file-source" :disabled="userModelCount === 0" @click="selectCurrentUserModel" />
    </local-loading>
  </div>
</template>

<script>
import vSelect from 'vue-select'

import SelectButton from '../../Buttons/SelectButton.vue'
import LocalLoading from '../../LocalLoading.vue'

import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'SelectModel',
  components: { vSelect, SelectButton, LocalLoading },
  computed: {
    ...mapGetters(['userModels', 'fetchingUserModels', 'selectedUserModel']),
    userModelCount() {
      return this.userModels.length
    },
  },
  methods: {
    ...mapMutations(['setCurrentUserModel', 'setSelectedUserModel']),
    selectCurrentUserModel() {
      this.setCurrentUserModel(this.selectedUserModel)
    },
    userModelChanged(userModel) {
      this.setSelectedUserModel(userModel)
    },
  },
}
</script>

<style scoped>
.inline-block {
  display: inline-block;
}
.select {
  min-width: 27rem;
}
@media (max-width: 768px) {
  .select {
    min-width: 11rem;
  }
}
</style>
