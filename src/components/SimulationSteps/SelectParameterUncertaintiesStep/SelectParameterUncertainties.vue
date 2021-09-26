<template>
  <div>
    <local-loading :loading="fetchingItems">
      <slot></slot>
      <v-select
        :value="selectedItem"
        :options="itemList"
        :disabled="itemCount === 0"
        :clearable="false"
        class="mr-4 inline-block select"
        @input="itemChanged"
      ></v-select>
      <select-button id="select-parameter-uncertainties-source" :disabled="itemCount === 0" @click="selectCurrentItem" />
    </local-loading>
  </div>
</template>

<script>
import vSelect from 'vue-select'

import SelectButton from '../../Buttons/SelectButton.vue'
import LocalLoading from '../../LocalLoading.vue'

import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'SelectParameterUncertainties',
  components: { vSelect, SelectButton, LocalLoading },
  computed: {
    ...mapGetters('parameterUncertainties', ['itemList', 'fetchingItems', 'selectedItem']),
    itemCount() {
      return this.itemList.length
    },
  },
  methods: {
    ...mapMutations('parameterUncertainties', ['setCurrentItem', 'setSelectedItem']),
    selectCurrentItem() {
      this.setCurrentItem(this.selectedItem)
    },
    itemChanged(item) {
      this.setSelectedItem(item)
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
