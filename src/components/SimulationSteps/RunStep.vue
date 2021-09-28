<template>
  <div class="flex-container vertical-centre horizontal-centre mb-4">
    <button class="btn btn-primary" @click.prevent="runSimulation">Do it!</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'RunStep',
  computed: {
    ...mapGetters(['parameterUncertaintiesData', 'outputParametersData']),
    ...mapGetters('model', ['currentItem']),
    ...mapGetters('simulationParameters', ['simulation', 'solver']),
  },
  methods: {
    runSimulation() {
      console.log('running simulation')
      const simulationData = {
        model: this.currentItem,
        uncertainties: this.parameterUncertaintiesData,
        settings: {
          simulation: this.simulation,
          solver: this.solver,
        },
        outputs: this.outputParametersData,
      }
      console.log(simulationData)
    },
  },
}
</script>
