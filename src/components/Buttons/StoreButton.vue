<template>
  <button class="btn btn-primary" :class="{ disabled }" :disabled="disabled" @click.prevent="$emit('click')">Store</button>
</template>

<script>
export default {
  name: 'StoreButton',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
