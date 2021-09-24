<template>
  <div class="col-md-11 mb-4">
    <model-parameter-uncertainties :model-parameters="parameterInformation" class="mb-4" @select="parameterSelected"
      ><h2 class="mb-3">Then select uncertain parameters:</h2>
    </model-parameter-uncertainties>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import ModelParameterUncertainties from '@/components/SimulationSteps/SelectParameterUncertaintiesStep/ModelParameterUncertainties.vue'

export default {
  name: 'SelectParameterUncertaintiesStep',
  components: { ModelParameterUncertainties },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['parameterInformation']),
  },
  methods: {
    ...mapActions('notifications', ['addSuccess', 'addFailure']),
    parameterSelected(data) {
      if (data.state) {
        this.uncertainParameters.push(data.id)
      } else {
        const idx = this.uncertainParameters.findIndex((e) => e === data.id)
        if (idx !== -1) {
          this.uncertainParameters.splice(idx, 1)
        }
      }
    },
  },
}
</script>

<style scoped></style>
