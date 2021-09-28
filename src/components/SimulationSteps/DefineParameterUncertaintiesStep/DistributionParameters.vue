<template>
  <div class="form-layout">
    <template v-for="(p, index) in parameterNames" :label="p">
      <label :key="p + '-label'" :for="'parameter-name-' + p" :class="{ 'apply-min-width': truncatable }"
        ><strong>{{ p }}</strong> </label
      ><input :id="'parameter-name-' + p" :key="p + '-input'" v-model.number="localParameterValues[index]" type="number" />
    </template>
    <template v-if="truncatable">
      <label>truncate</label>
      <input id="checkbox" v-model="localTruncate" type="checkbox" />
      <template v-if="localTruncate">
        <label><strong>minimum</strong></label>
        <input v-model.number="localParameterValues[truncateIndex]" type="number" />
        <label><strong>maximum</strong></label>
        <input v-model.number="localParameterValues[truncateIndex + 1]" type="number" />
      </template>
    </template>
  </div>
</template>

<script>
export default {
  name: 'DistributionParameters',
  props: {
    parameters: {
      type: Object,
      default: () => {
        return { parameters: [], truncatable: false }
      },
    },
    parameterValues: {
      type: Array,
      required: true,
    },
    truncate: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      localParameterValues: this.parameterValues,
      incomingChange: false,
    }
  },
  computed: {
    parameterNames() {
      return this.parameters.parameters
    },
    truncatable() {
      return this.parameters.truncatable
    },
    truncateIndex() {
      return this.parameters.parameters.length
    },
    localTruncate: {
      get() {
        return this.truncate
      },
      set(value) {
        this.$emit('truncate-changed', value)
      },
    },
  },
  watch: {
    localParameterValues: {
      handler(newValue) {
        if (!this.incomingChange) {
          this.$emit('parameter-values-changed', newValue)
        }
        this.incomingChange = false
      },
    },
    parameterValues: {
      handler(newValue) {
        this.incomingChange = true
        this.localParameterValues = newValue
      },
    },
  },
}
</script>

<style scoped>
.apply-min-width {
  min-width: 5rem;
}
</style>
