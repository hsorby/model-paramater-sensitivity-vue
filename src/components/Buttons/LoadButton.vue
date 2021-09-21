<template>
  <button class="btn btn-primary" @click="$emit('click')">Load</button>
</template>

<script>
export default {
  name: 'LoadButton',
}
</script>
