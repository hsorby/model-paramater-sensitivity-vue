<template>
  <button class="btn btn-primary" :class="{ disabled }" :disabled="disabled" @click.prevent="$emit('click')">Save</button>
</template>

<script>
export default {
  name: 'SaveButton',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
