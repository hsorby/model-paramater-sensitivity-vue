<template>
  <div>
    <slot></slot>
    <div class="form-layout horizontal-centre">
      <label for="time_start"><strong>Time start</strong> </label><input id="time_start" v-model.number="localTimeStart" type="number" />
      <label for="time_stop"><strong>Time stop</strong> </label><input id="time_stop" v-model.number="localTimeStop" type="number" />
      <label for="point_interval"><strong>Point interval</strong> </label
      ><input id="point_interval" v-model.number="localPointInterval" type="number" />
      <label for="num_trials"><strong>Number of trials</strong> </label><input id="num_trials" v-model.number="localNumberTrials" type="number" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SetSimulationParameters',
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  computed: {
    localTimeStart: {
      get() {
        return this.value.timeStart
      },
      set(value) {
        let newValue = this.currentState()
        newValue.timeStart = value
        this.$emit('input', newValue)
      },
    },
    localTimeStop: {
      get() {
        return this.value.timeStop
      },
      set(value) {
        let newValue = this.currentState()
        newValue.timeStop = value
        this.$emit('input', newValue)
      },
    },
    localPointInterval: {
      get() {
        return this.value.pointInterval
      },
      set(value) {
        let newValue = this.currentState()
        newValue.pointInterval = value
        this.$emit('input', newValue)
      },
    },
    localNumberTrials: {
      get() {
        return this.value.numberTrials
      },
      set(value) {
        let newValue = this.currentState()
        newValue.numberTrials = value
        this.$emit('input', newValue)
      },
    },
  },
  methods: {
    currentState() {
      return {
        timeStart: this.localTimeStart,
        timeStop: this.localTimeStop,
        pointInterval: this.localPointInterval,
        numberTrials: this.localNumberTrials,
      }
    },
  },
}
</script>
