<template>
  <div class="next-steps">
    <h1 class="my-5 text-center">Run a simulation</h1>
    <div class="row">
      <sideways-slider :slides="steps" :slides-ready="stepsReady" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import titleMixin from '@/mixins/title'
import SidewaysSlider from '@/components/Slider/SidewaysSlider.vue'

export default {
  name: 'Simulation',
  title: 'Simulation - Model Parameter Sensitivity',
  components: {
    SidewaysSlider,
  },
  mixins: [titleMixin],
  computed: {
    ...mapGetters({ steps: 'simulationSteps', stepsReady: 'simulationStepsReady' }),
  },
}
</script>
