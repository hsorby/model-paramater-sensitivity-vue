<template>
  <div class="mb-4 flex-container fill-available space-between">
    <div class="flex-container flex-column">
      <div class="mb-4">
        <select-parameter-uncertainties-definition class="mb-4"
          ><h2 class="mb-4 inline-block">Select,</h2>
          <span> parameter</span><br
        /></select-parameter-uncertainties-definition>
        <input v-model="fileName" type="text" placeholder="set filename here" class="mr-2" />
        <store-button :disabled="fileName === ''" @click="storeParameterUncertainityDistributions" />
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
      <distribution-definition v-model="currentDefinition" class="mb-4"></distribution-definition>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

import StoreButton from '../Buttons/StoreButton.vue'
import DistributionDefinition from './DefineParameterUncertaintiesStep/DistributionDefinition.vue'
import SelectParameterUncertaintiesDefinition from './DefineParameterUncertaintiesStep/SelectParameterUncertaintiesDefinition.vue'

import { storeParameterUncertainties } from '@/services/backend-api'

export default {
  name: 'DefineParameterUncertaintiesStep',
  components: { SelectParameterUncertaintiesDefinition, DistributionDefinition, StoreButton },
  data() {
    const definition_default = {
      name: 'normal',
      parameters: {
        values: [1.0, 1.0, 0.0, 2.0],
        truncate: false,
      },
    }
    return {
      definition: definition_default,
      fileName: '',
    }
  },
  computed: {
    ...mapGetters('uncertaintyDefinitions', ['itemList', 'selectedItem']),
    ...mapGetters('model', ['currentItem']),
    currentDefinition: {
      get() {
        if (this.selectedItem.distribution === null) {
          return {
            name: 'normal',
            parameters: {
              values: [1.0, 1.0, 0.0, 2.0],
              truncate: false,
            },
          }
        }
        return this.selectedItem.distribution
      },
      set(value) {
        this.assignUncertaintyDistribution({ item: this.selectedItem, distribution: value })
      },
    },
    undefinedDistributions() {
      const undefinedDistributionItems = this.itemList.filter((item) => item.distribution === null)
      return undefinedDistributionItems
    },
    haveUndefinedDistributions() {
      return this.undefinedDistributions.length > 0
    },
  },
  watch: {
    undefinedDistributions: {
      handler(value) {
        if (value.length === 0) {
          this.setSimulationStepReady(3)
        }
      },
      immediate: true,
    },
  },
  methods: {
    ...mapActions('notifications', ['addSuccess', 'addFailure']),
    ...mapMutations('uncertaintyDefinitions', ['assignUncertaintyDistribution']),
    ...mapMutations(['setSimulationStepReady']),
    async storeParameterUncertainityDistributions() {
      const accessToken = await this.$auth.getTokenSilently()
      storeParameterUncertainties(this.itemList, this.currentItem, this.fileName, accessToken)
        .then(
          (response) => {
            this.addSuccess(response.message)
          },
          (reason) => {
            this.addFailure(reason.message)
          }
        )
        .catch((error) => {
          this.addFailure(error)
        })
    },
  },
}
</script>
