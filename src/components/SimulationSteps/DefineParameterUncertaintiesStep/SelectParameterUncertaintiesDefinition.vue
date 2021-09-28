<template>
  <div>
    <slot></slot>
    <v-select
      id="select-uncertain-parameter"
      :value="selectedItem"
      :options="itemList"
      :clearable="false"
      label="id"
      class="mr-4 inline-block v-select"
      @input="setSelectedItem"
    ></v-select>
  </div>
</template>

<script>
import vSelect from 'vue-select'

import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'SelectParameterUncertaintiesDefinition',
  components: { vSelect },
  computed: {
    ...mapGetters('uncertaintyDefinitions', ['itemList', 'selectedItem']),
    itemCount() {
      return this.parameterUncertaintiesData.length
    },
  },
  methods: {
    ...mapMutations('uncertaintyDefinitions', ['setSelectedItem']),
  },
}
</script>
