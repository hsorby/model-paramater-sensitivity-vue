<template>
  <div class="flex-container vertical-centre horizontal-centre mb-4">
    <button class="btn btn-primary" @click.prevent="runSimulation">Do it!</button>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { submitJob } from '../../services/backend-api'

export default {
  name: 'RunStep',
  computed: {
    ...mapGetters(['parameterUncertaintiesData', 'outputParametersData']),
    ...mapGetters('model', ['currentItem']),
    ...mapGetters('simulationParameters', ['simulation', 'solver']),
  },
  methods: {
    ...mapActions('notifications', ['addSuccess', 'addFailure']),
    ...mapMutations('simulations', ['addActive']),
    async runSimulation() {
      const simulationData = {
        model: this.currentItem,
        uncertainties: this.parameterUncertaintiesData,
        settings: {
          simulation: this.simulation,
          solver: this.solver,
        },
        outputs: this.outputParametersData,
      }
      const accessToken = await this.$auth.getTokenSilently()
      submitJob(simulationData, accessToken)
        .then(
          (response) => {
            this.addActive({ reference: response.reference, title: response.title, status: response.status })
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
