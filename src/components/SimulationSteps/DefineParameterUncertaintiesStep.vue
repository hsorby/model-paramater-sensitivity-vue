<template>
  <div class="mb-4 flex-container fill-available space-between">
    <div class="flex-container flex-column">
      <div class="mb-4">
        <select-parameter-uncertainties-definition class="mb-4"
          ><h2 class="mb-4 inline-block">Define,</h2>
          <span> parameter uncertainties distribution:</span><br
        /></select-parameter-uncertainties-definition>
        <store-button @click="storeParameterUncertainityDistributions" />
      </div>
      <div v-show="haveUndefinedDistributions">
        <h2 class="mb-4 inline-block">[Currently Undefined,</h2>
        <span> distributions:</span>
        <h2 class="mb-4 inline-block">]</h2>
        <br />
        <ul>
          <li v-for="item in undefinedDistributions" :key="item.id">{{ item.id }}</li>
        </ul>
      </div>
    </div>
    <div>
      <distribution-definition v-model="definition" class="mb-4"></distribution-definition>
      <assign-button id="assign-parameter-distribution" @click="assignDistribution" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

import AssignButton from '../Buttons/AssignButton.vue'
import StoreButton from '../Buttons/StoreButton.vue'
import DistributionDefinition from './DefineParameterUncertaintiesStep/DistributionDefinition.vue'
import SelectParameterUncertaintiesDefinition from './DefineParameterUncertaintiesStep/SelectParameterUncertaintiesDefinition.vue'

import linesMixin from '@/mixins/lines'

export default {
  name: 'DefineParameterUncertaintiesStep',
  components: { SelectParameterUncertaintiesDefinition, DistributionDefinition, AssignButton, StoreButton },
  mixins: [linesMixin],
  data() {
    return {
      definition: {
        name: 'normal',
        parameters: {
          values: [1.0, 1.0, 0.0, 2.0],
          truncate: false,
        },
      },
      line1Start: 'assign-parameter-distribution',
      linesEnd: 'select-uncertain-parameter',
    }
  },
  computed: {
    ...mapGetters('uncertaintyDefinitions', ['itemList', 'selectedItem']),
    undefinedDistributions() {
      const undefinedDistributionItems = this.itemList.filter((item) => item.distribution === null)
      return undefinedDistributionItems
    },
    haveUndefinedDistributions() {
      return this.undefinedDistributions.length > 0
    },
  },
  watch: {
    'definition.parameters.truncate': {
      handler() {
        // The truncate value has been toggled so update the position of the line.
        this.$nextTick(function () {
          this.line1.position()
        })
      },
    },
  },
  methods: {
    ...mapMutations('uncertaintyDefinitions', ['assignUncertaintyDistribution']),
    assignDistribution() {
      this.assignUncertaintyDistribution({ item: this.selectedItem, distribution: this.definition })
    },
    storeParameterUncertainityDistributions() {
      console.log('Save the definitions to disk.')
    },
  },
}
</script>
