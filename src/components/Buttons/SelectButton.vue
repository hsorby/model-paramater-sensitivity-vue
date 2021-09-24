<template>
  <button class="btn btn-primary" :class="{ disabled }" :disabled="disabled" @click="$emit('click')">Select</button>
</template>

<script>
export default {
  name: 'SelectButton',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
