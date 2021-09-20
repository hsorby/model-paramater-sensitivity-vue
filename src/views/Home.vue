<template>
  <div>
    <Hero />
    <hr />
    <HomeContent />
  </div>
</template>

<script>
import Hero from '@/components/Hero'
import HomeContent from '@/components/HomeContent'
import titleMixin from '@/mixins/title'

export default {
  name: 'Home',
  title: 'Home - Model Parameter Sensitivity',
  components: {
    Hero,
    HomeContent,
  },
  mixins: [titleMixin],
}
</script>
