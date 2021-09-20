<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
import titleMixin from '@/mixins/title'

export default {
  name: 'About',
  title: 'About - Model Parameter Sensitivity',
  mixins: [titleMixin],
}
</script>
