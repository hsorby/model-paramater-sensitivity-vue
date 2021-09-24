<template>
  <div class="flex-container-col fill-available">
    <div class="flex-container">
      <div class="flex-container vertical-centre mr-2">
        <button class="btn btn-primary btn-rounded" :disabled="!prevEnabled" @click.prevent="prev"><font-awesome-icon icon="angle-left" /></button>
      </div>
      <div class="fill-available">
        <component :is="currentSlide"></component>
      </div>
      <div class="flex-container vertical-centre ml-2">
        <button class="btn btn-primary btn-rounded" :disabled="!nextEnabled" @click.prevent="next"><font-awesome-icon icon="angle-right" /></button>
      </div>
    </div>
    <div class="horizontal-centre">
      <ol class="flex-container goto-buttons-list horizontal-centre">
        <li v-for="n in slides.length" :key="n" class="goto-list-item">
          <button class="btn btn-primary btn-rounded" :disabled="!slidesReady[n - 1]" @click.prevent="goToIndex(n - 1)">
            {{ n }}
          </button>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SidewaysSlider',
  props: {
    slides: {
      default: () => [],
      type: Array,
    },
    slidesReady: {
      default: () => [],
      type: Array,
    },
  },
  data() {
    return {
      currentIndex: 0,
    }
  },
  computed: {
    prevEnabled() {
      return this.currentIndex > 0
    },
    nextEnabled() {
      const inRange = this.currentIndex < this.slides.length - 1
      const isReady = this.slidesReady[this.currentIndex + 1]
      return inRange && isReady
    },
    currentSlide() {
      return this.slides[this.currentIndex]
    },
  },
  methods: {
    next() {
      this.currentIndex += 1
    },
    prev() {
      this.currentIndex -= 1
    },
    goToIndex(n) {
      this.currentIndex = n
    },
  },
}
</script>

<style lang="scss">
.goto-buttons-list {
  list-style: none;
}

li.goto-list-item:not(:last-child) {
  margin-right: 0.2rem;
}
</style>
