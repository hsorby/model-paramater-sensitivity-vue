<template>
  <div>
    <local-loading :loading="fetchingItems">
      <slot></slot>
      <v-select
        :value="selectedItem"
        :options="itemList"
        :disabled="itemCount === 0"
        :clearable="false"
        class="mr-4 inline-block v-select"
        @input="itemChanged"
      ></v-select>
      <select-button id="select-output-parameters-source" :disabled="itemCount === 0" @click="selectCurrentItem" />
    </local-loading>
  </div>
</template>

<script>
import vSelect from 'vue-select'

import SelectButton from '../../Buttons/SelectButton.vue'
import LocalLoading from '../../LocalLoading.vue'

import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'SelectOutputParameters',
  components: { vSelect, SelectButton, LocalLoading },
  computed: {
    ...mapGetters('outputParameters', ['itemList', 'fetchingItems', 'selectedItem']),
    itemCount() {
      return this.itemList.length
    },
  },
  mounted() {
    this.fetchOutputParameters()
  },
  methods: {
    ...mapActions(['fetchOutputParameters']),
    ...mapMutations('outputParameters', ['setCurrentItem', 'setSelectedItem']),
    selectCurrentItem() {
      this.setCurrentItem(this.selectedItem)
    },
    itemChanged(item) {
      this.setSelectedItem(item)
    },
  },
}
</script>
