<template>
  <div class="mb-4 flex-container fill-available space-between">
    <div class="flex-container flex-column">
      <div>
        <select-parameter-uncertainties
          ><h2 class="mb-3 inline-block">Either,</h2>
          <span> select an existing parameter uncertainties:</span>
          <br
        /></select-parameter-uncertainties>
      </div>
      <div id="user-defined-parameter-uncertainties-source">
        <model-parameter-uncertainties v-model="parameterSelections" :model-parameters="parameterInformation" class="mb-4"
          ><h2 class="mb-3 inline-block">Or,</h2>
          <span> choose uncertain parameters from model variables:</span>
        </model-parameter-uncertainties>
      </div>
    </div>
    <div class="flex-container vertical-centre">
      <load-parameter-uncertainties>
        <h2 class="mb-3 inline-block">Then,</h2>
        <span> load the parameter uncertainties:</span>
        <br
      /></load-parameter-uncertainties>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

import ModelParameterUncertainties from '@/components/SimulationSteps/SelectParameterUncertaintiesStep/ModelParameterUncertainties.vue'
import SelectParameterUncertainties from './SelectParameterUncertaintiesStep/SelectParameterUncertainties.vue'
import LoadParameterUncertainties from './SelectParameterUncertaintiesStep/LoadParameterUncertainties.vue'

import linesMixin from '@/mixins/lines'

export default {
  name: 'SelectParameterUncertaintiesStep',
  components: { ModelParameterUncertainties, SelectParameterUncertainties, LoadParameterUncertainties },
  mixins: [linesMixin],
  data() {
    return {
      line1Start: 'user-defined-parameter-uncertainties-source',
      line2Start: 'select-parameter-uncertainties-source',
      linesEnd: 'load-parameter-uncertainties-target',
    }
  },
  computed: {
    ...mapGetters(['parameterInformation', 'parameterUncertaintiesData']),
    parameterSelections: {
      get() {
        return this.parameterUncertaintiesData
      },
      set(data) {
        const parameterUncertainty = {
          id: data.id,
          distribution: null,
        }
        if (data.state) {
          this.addParameterUncertainty(parameterUncertainty)
        } else {
          this.removeParameterUncertainty(parameterUncertainty)
        }
      },
    },
  },
  methods: {
    ...mapMutations(['addParameterUncertainty', 'removeParameterUncertainty']),
  },
}
</script>

<style scoped></style>
