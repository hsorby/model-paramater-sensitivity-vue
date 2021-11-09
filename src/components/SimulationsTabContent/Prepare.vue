<template>
  <div class="next-steps">
    <div class="row">
      <sideways-slider :slides="steps" :slides-ready="stepsReady" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

import SidewaysSlider from '@/components/Slider/SidewaysSlider.vue'

export default {
  name: 'PrepareTabContent',
  components: {
    SidewaysSlider,
  },
  computed: {
    ...mapGetters({ steps: 'simulationSteps', stepsReady: 'simulationStepsReady' }),
  },
  watch: {
    stepsReady: {
      handler(value) {
        if (!value[5]) {
          let copy = value.slice(0)
          copy[5] = true
          if (copy.every(Boolean)) {
            this.setSimulationStepReady(5)
          }
        }
      },
    },
  },
  methods: {
    ...mapMutations(['setSimulationStepReady']),
  },
}
</script>
