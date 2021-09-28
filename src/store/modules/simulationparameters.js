export const namespaced = true

export const state = {
  simulation: {
    timeStart: 0,
    timeStop: 1000,
    pointInterval: 1,
    numberTrials: 10,
  },
  solver: {
    maxStep: 0,
    maxNumSteps: 500,
    intMethod: 'BDF',
    iterationType: 'Newton',
    linearSolver: 'Dense',
    relativeTolerance: 1e-7,
    absoluteTolerance: 1e-7,
    interpolate: true,
  },
}

export const getters = {
  simulation(state) {
    return state.simulation
  },
  solver(state) {
    return state.solver
  },
}

export const mutations = {
  setSimulation(state, payload) {
    state.simulation = payload
  },
  setSolver(state, payload) {
    state.solver = payload
  },
}

export const actions = {}
