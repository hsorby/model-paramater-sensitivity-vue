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
export default {
  name: 'Home',
  components: {
    Hero,
    HomeContent,
  },
}
</script>
