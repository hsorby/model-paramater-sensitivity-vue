<template>
  <button class="btn btn-primary" :class="{ disabled }" :disabled="disabled" @click.prevent="$emit('click')">Load</button>
</template>

<script>
export default {
  name: 'LoadButton',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
