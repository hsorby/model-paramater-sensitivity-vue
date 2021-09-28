<template>
  <div class="mb-4 flex-container-col fill-available space-between">
    <set-simulation-parameters v-model="simulationParameters"
      ><h2 class="mb-4 inline-block">Set,</h2>
      <span> simulation parameters</span><br
    /></set-simulation-parameters>
    <set-solver-parameters v-model="solverParameters"
      ><h2 class="mb-4 inline-block">Set,</h2>
      <span> solver parameters</span><br
    /></set-solver-parameters>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

import SetSimulationParameters from './SetSimulationParametersStep/SetSimulationParameters.vue'
import SetSolverParameters from './SetSimulationParametersStep/SetSolverParameters.vue'

export default {
  name: 'SetSimulationParametersStep',
  components: { SetSimulationParameters, SetSolverParameters },
  computed: {
    ...mapGetters('simulationParameters', ['simulation', 'solver']),
    simulationParameters: {
      get() {
        return this.simulation
      },
      set(value) {
        this.setSimulation(value)
      },
    },
    solverParameters: {
      get() {
        return this.solver
      },
      set(value) {
        this.setSolver(value)
      },
    },
  },
  methods: {
    ...mapMutations('simulationParameters', ['setSimulation', 'setSolver']),
  },
}
</script>
