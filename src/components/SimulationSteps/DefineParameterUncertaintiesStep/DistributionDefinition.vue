<template>
  <div>
    <h2 class="mb-4 inline-block">Define,</h2>
    <span> distribution for parameter</span><br />
    <distribution-list v-model="localName" class="mb-4" :names="distributionNames"></distribution-list>
    <distribution-parameters
      :parameter-values="localValues"
      :truncate="localTruncate"
      :parameters="currentParameters"
      @parameter-values-changed="parameterValuesChanged"
      @truncate-changed="truncateChanged"
    ></distribution-parameters>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import DistributionList from './DistributionList.vue'
import DistributionParameters from './DistributionParameters.vue'

export default {
  name: 'DistributionDefinition',
  components: { DistributionList, DistributionParameters },
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters('distributions', ['distributionDefinitions', 'parameters']),
    distributionNames() {
      return Object.keys(this.distributionDefinitions)
    },
    currentParameters() {
      return this.parameters(this.localName)
    },
    localName: {
      get() {
        return this.value.name
      },
      set(value) {
        const newValue = {
          name: value,
          parameters: {
            values: this.localValues,
            truncate: this.localTruncate,
          },
        }
        this.$emit('input', newValue)
      },
    },
    localTruncate() {
      return this.value.parameters.truncate
    },
    localValues() {
      return this.value.parameters.values
    },
  },
  methods: {
    parameterValuesChanged(value) {
      const newValue = {
        name: this.localName,
        parameters: {
          values: value,
          truncate: this.localTruncate,
        },
      }
      this.$emit('input', newValue)
    },
    truncateChanged(value) {
      const newValue = {
        name: this.localName,
        parameters: {
          values: this.localValues,
          truncate: value,
        },
      }
      this.$emit('input', newValue)
    },
  },
}
</script>
