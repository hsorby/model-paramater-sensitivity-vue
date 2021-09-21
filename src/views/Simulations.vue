<template>
  <div>
    <SimulationContent />
  </div>
</template>

<script>
import SimulationContent from '@/components/SimulationContent'
import titleMixin from '@/mixins/title'

export default {
  name: 'Simulation',
  title: 'Simulation - Model Parameter Sensitivity',
  components: {
    SimulationContent,
  },
  mixins: [titleMixin],
}
</script>
