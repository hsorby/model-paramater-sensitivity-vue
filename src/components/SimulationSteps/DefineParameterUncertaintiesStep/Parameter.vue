<template>
  <!-- <div> -->
  <label :for="'parameter-name-' + label"
    ><strong>{{ label }}</strong> <input :id="'parameter-name-' + label" v-model.number="parameterValue" type="number"
  /></label>
  <!-- </div> -->
</template>

<script>
export default {
  name: 'Parameter',
  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      default: 1.0,
    },
  },
  data() {
    return {
      parameterValue: this.value,
    }
  },
  watch: {
    parameterValue: {
      handler(value) {
        this.$emit('input', { label: this.label, value })
      },
    },
  },
}
</script>

<style scoped></style>
