export const namespaced = true

export const state = {
  distributions: {
    normal: {
      parameters: ['mu', 'sigma'],
      truncatable: true,
    },
    uniform: {
      parameters: ['minimum', 'maximum'],
      truncatable: false,
    },
    bernoulli: {
      parameters: ['p'],
      truncatable: false,
    },
    binomial: {
      parameters: ['n', 'p'],
      truncatable: false,
    },
    cauchy: {
      parameters: ['m', 'gamma'],
      truncatable: false,
    },
    chisquare: {
      parameters: ['n'],
      truncatable: true,
    },
    exponential: {
      parameters: ['lambda'],
      truncatable: true,
    },
    gamma: {
      parameters: ['alpha', 'theta'],
      truncatable: true,
    },
    laplace: {
      parameters: ['mu', 'beta'],
      truncatable: true,
    },
    lognormal: {
      parameters: ['mu', 'sigma'],
      truncatable: true,
    },
    poisson: {
      parameters: ['lambda'],
      truncatable: true,
    },
    rayleigh: {
      parameters: ['s'],
      truncatable: true,
    },
  },
}

export const getters = {
  distributionDefinitions(state) {
    return state.distributions
  },
  parameters: (state) => (value) => {
    return state.distributions[value]
  },
  currentDistribution() {
    return 'normal'
  },
}

export const mutations = {}

export const actions = {}
