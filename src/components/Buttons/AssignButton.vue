<template>
  <button class="btn btn-primary" :class="{ disabled }" :disabled="disabled" @click.prevent="$emit('click')">Assign</button>
</template>

<script>
export default {
  name: 'AssignButton',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
