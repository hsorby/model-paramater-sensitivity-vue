<template>
  <div>
    <v-select v-model="selected" :options="names" :clearable="false" class="mr-4 inline-block v-select"></v-select>
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
  data() {
    return {
      selected: this.value,
    }
  },
  watch: {
    selected: {
      handler(value) {
        this.$emit('input', value)
      },
    },
  },
}
</script>
