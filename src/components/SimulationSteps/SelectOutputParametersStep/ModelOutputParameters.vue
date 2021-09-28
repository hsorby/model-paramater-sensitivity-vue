<template>
  <div>
    <slot></slot>
    <div class="flex-container container">
      <tree :data="modelParameters" :selected-data="value" @select="$emit('input', $event)" />
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

import Tree from '@/components/Tree/Tree.vue'

export default {
  name: 'ModelOutputParamters',
  components: { Tree },
  props: {
    modelParameters: {
      type: Object,
      default: () => {},
    },
    value: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    value: {
      handler() {
        if (this.value.length > 0) {
          this.setCurrentItem('<user-selection>')
        } else {
          this.setCurrentItem('<not-set>')
        }
      },
    },
  },
  methods: {
    ...mapMutations('outputParameters', ['setCurrentItem']),
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
