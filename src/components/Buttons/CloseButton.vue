<template>
  <button class="btn btn-primary" :class="{ disabled }" :disabled="disabled" @click="$emit('click')">Close</button>
</template>

<script>
export default {
  name: 'CloseButton',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
