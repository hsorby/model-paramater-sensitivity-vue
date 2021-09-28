<template>
  <div>
    <slot></slot>
    <div class="form-layout horizontal-centre">
      <label for="max_step"><strong>Maximum step</strong> </label><input id="max_step" v-model.number="localMaxStep" type="number" />
      <label for="max_num_steps"><strong>Max. # steps</strong> </label><input id="max_num_steps" v-model.number="localMaxNumSteps" type="number" />
      <label for="integration_method"><strong>Integration method</strong> </label
      ><select id="integration_method" v-model="locaIntMethod">
        <option>BDF</option>
        <option>Adams Moulton</option>
      </select>
      <label for="iteration_type"><strong>Iteration type</strong> </label
      ><select id="iteration_type" v-model="localIterationType">
        <option>Newton</option>
        <option>Functional</option>
      </select>
      <label for="linear_solver"><strong>Linear solver</strong> </label
      ><select id="linear_solver" v-model="localLinearSolver">
        <option>Dense</option>
        <option>Banded</option>
        <option>Diagonal</option>
        <option>GMRES</option>
        <option>BiCGStab</option>
        <option>TFQMR</option>
      </select>
      <label for="rel_tol"><strong>Relative tolerance</strong> </label><input id="rel_tol" v-model.number="localRelativeTolerance" type="number" />
      <label for="abs_tol"><strong>Absolute tolerance</strong> </label><input id="abs_tol" v-model.number="localAbsoluteTolerance" type="number" />
      <label for="interpolate"><strong>Interpolate solution</strong></label
      ><input id="interpolate" v-model="localInterpolate" type="checkbox" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SetSolverParameters',
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  computed: {
    localMaxStep: {
      get() {
        return this.value.maxStep
      },
      set(value) {
        let newValue = this.currentState()
        newValue.maxStep = value
        this.$emit('input', newValue)
      },
    },
    localMaxNumSteps: {
      get() {
        return this.value.maxNumSteps
      },
      set(value) {
        let newValue = this.currentState()
        newValue.maxNumSteps = value
        this.$emit('input', newValue)
      },
    },
    locaIntMethod: {
      get() {
        return this.value.intMethod
      },
      set(value) {
        let newValue = this.currentState()
        newValue.intMethod = value
        this.$emit('input', newValue)
      },
    },
    localIterationType: {
      get() {
        return this.value.iterationType
      },
      set(value) {
        let newValue = this.currentState()
        newValue.iterationType = value
        this.$emit('input', newValue)
      },
    },
    localLinearSolver: {
      get() {
        return this.value.linearSolver
      },
      set(value) {
        let newValue = this.currentState()
        newValue.linearSolver = value
        this.$emit('input', newValue)
      },
    },
    localRelativeTolerance: {
      get() {
        return this.value.relativeTolerance
      },
      set(value) {
        let newValue = this.currentState()
        newValue.relativeTolerance = value
        this.$emit('input', newValue)
      },
    },
    localAbsoluteTolerance: {
      get() {
        return this.value.absoluteTolerance
      },
      set(value) {
        let newValue = this.currentState()
        newValue.absoluteTolerance = value
        this.$emit('input', newValue)
      },
    },
    localInterpolate: {
      get() {
        return this.value.interpolate
      },
      set(value) {
        let newValue = this.currentState()
        newValue.interpolate = value
        this.$emit('input', newValue)
      },
    },
  },
  methods: {
    currentState() {
      return {
        maxStep: this.localMaxStep,
        maxNumSteps: this.localMaxNumSteps,
        intMethod: this.locaIntMethod,
        iterationType: this.localIterationType,
        linearSolver: this.localLinearSolver,
        relativeTolerance: this.localRelativeTolerance,
        absoluteTolerance: this.localAbsoluteTolerance,
        interpolate: this.localInterpolate,
      }
    },
  },
}
</script>
