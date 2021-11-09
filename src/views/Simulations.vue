<template>
  <div class="container">
    <simulation-tabs />
  </div>
</template>

<script>
import titleMixin from '@/mixins/title'
import SimulationTabs from '@/components/SimulationTabs.vue'

export default {
  name: 'Simulation',
  title: 'Simulation - Model Parameter Sensitivity',
  components: {
    SimulationTabs,
  },
  mixins: [titleMixin],
}
</script>
