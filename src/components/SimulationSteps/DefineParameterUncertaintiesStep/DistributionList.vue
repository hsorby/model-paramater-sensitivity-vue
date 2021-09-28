<template>
  <div>
    <v-select v-model="localName" :options="names" :clearable="false" class="mr-4 inline-block v-select"></v-select>
  </div>
</template>

<script>
import vSelect from 'vue-select'

export default {
  name: 'DistributionList',
  components: { vSelect },
  props: {
    names: {
      type: Array,
      default: () => [],
    },
    value: {
      type: String,
      default: '',
    },
  },
  computed: {
    localName: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
  },
}
</script>
