<template>
  <div>
    <slot></slot>
    <div class="container">
      <tree :data="modelParameters" @select="$emit('select', $event)" />
    </div>
  </div>
</template>

<script>
import Tree from './Tree/Tree.vue'

export default {
  name: 'ModelParameterUncertainties',
  components: { Tree },
  props: {
    modelParameters: {
      type: Object,
      default: function () {
        return {}
      },
    },
  },
}
</script>
<style scoped>
.container {
  max-height: 30rem;
  overflow: auto;
}

/* width */
::-webkit-scrollbar {
  width: 1.25rem;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 0.7rem;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #999999;
  border-radius: 0.7rem;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #666666;
}
</style>
