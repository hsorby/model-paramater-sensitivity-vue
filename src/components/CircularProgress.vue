<template>
  <div class="vue-circular-progress">
    <div class="circle">
      <svg :width="circleSize" :height="circleSize" class="circle__svg">
        <circle
          :cx="centralP"
          :cy="centralP"
          :r="radius"
          :style="{ 'stroke-width': strokeWidth, stroke: strokeColor }"
          class="circle__progress circle__progress--path"
        ></circle>
        <circle :cx="centralP" :cy="centralP" :r="radius" :style="fillStyle" class="circle__progress circle__progress--fill"></circle>
      </svg>

      <div class="percent">
        <slot>
          <span class="percent__int">{{ int }}</span>
          <span class="dot">.</span>
          <span class="percent__dec">{{ dec }}</span>
          <span class="percent_sign">%</span>
        </slot>
      </div>
    </div>
    <slot name="footer"></slot>
  </div>
</template>

<script>
export default {
  name: 'CircularProgress',
  props: {
    strokeWidth: {
      type: Number,
      default: 4,
    },
    radius: {
      type: Number,
      default: 38,
    },
    transitionDuration: {
      type: Number,
      default: 1000,
    },
    strokeColor: {
      type: String,
      default: '#aaff00',
    },
    precision: {
      type: Number,
      default: 1,
    },
    value: {
      validator: function (value) {
        // should be a number and between 0 and 100 inclusive
        return !Number.isNaN(value) && 0 <= value <= 100
      },
      type: Number,
      default: 0.0,
    },
  },
  data() {
    return {
      offset: '',
      int: 0,
      number: 0,
      dec: '0',
      stepSize: 10,
      intervalTargetNumber: 0,
    }
  },
  computed: {
    circumference() {
      return this.radius * Math.PI * 2
    },
    fillStyle() {
      return {
        strokeDashoffset: this.offset,
        '--initialStroke': this.circumference,
        '--transitionDuration': `${this.transitionDuration}ms`,
        'stroke-width': this.strokeWidth,
        stroke: this.strokeColor,
      }
    },
    circleSize() {
      return (this.radius + this.strokeWidth) * 2
    },
    centralP() {
      return this.circleSize / 2
    },
  },
  watch: {
    value: {
      handler: function (v) {
        this.clearHandlers()
        this.animateValue(v)
      },
      immediate: true,
    },
  },
  beforeDestroy() {
    this.clearHandlers()
  },
  methods: {
    increaseNumber(number) {
      if (number == 0) {
        return
      }
      this.intervalTargetNumber = number
      const intervalValueStepSize = (number - this.number) / this.stepSize
      const interval = this.transitionDuration / this.stepSize
      this.numberInterval = setInterval(() => {
        this.number += intervalValueStepSize
        if (this.number >= this.intervalTargetNumber) {
          this.number = this.intervalTargetNumber
          window.clearInterval(this.numberInterval)
        }
        this.offset = (this.circumference * (100 - this.number)) / 100
        this.displayNumber()
      }, interval)
    },
    displayNumber() {
      let [int, dec] = this.number.toFixed(this.precision).split('.')
      this.int = Number(int)
      this.dec = Number.isNaN(Number(dec)) ? 0 : dec
    },
    animateValue(v) {
      if (this.$slots.default) {
        this.offset = (this.circumference * (100 - v)) / 100
        return
      }
      this.increaseNumber(v)
    },
    clearHandlers() {
      if (this.initTimeoutHandler) {
        clearTimeout(this.initTimeoutHandler)
      }
      if (this.numberInterval) {
        clearInterval(this.numberInterval)
      }
    },
  },
}
</script>
