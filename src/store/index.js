import Vue from 'vue'
import Vuex from 'vuex'

import { getInstance } from '@/auth/auth0-plugin'

import { listUserModels, fetchModelParameterInfo, listUserParameterUncertainties, fetchParameterUncertainties } from '@/services/backend-api.js'

import * as notifications from '@/store/modules/notifications.js'
import * as distributions from '@/store/modules/distributions.js'

import LoadModelStep from '@/components/SimulationSteps/LoadModelStep.vue'
import SelectParameterUncertaintiesStep from '@/components/SimulationSteps/SelectParameterUncertaintiesStep.vue'
import DefineParameterUncertaintiesStep from '@/components/SimulationSteps/DefineParameterUncertaintiesStep.vue'
import SetSimulationParametersStep from '@/components/SimulationSteps/SetSimulationParametersStep.vue'

Vue.use(Vuex)

const selectorState = {
  currentItem: '<not-set>',
  fetchingItems: false,
  itemList: [],
  loadingItem: false,
  selectedItem: '',
}

const selectorGetters = {
  currentItem: function (state) {
    return state.currentItem
  },
  fetchingItems: function (state) {
    return state.fetchingItems
  },
  itemList: function (state) {
    return state.itemList
  },
  loadingItem: function (state) {
    return state.loadingItem
  },
  selectedItem: function (state) {
    return state.selectedItem
  },
}

const selectorMutations = {
  setCurrentItem: function (state, payload) {
    state.currentItem = payload
  },
  setFetchingItems: function (state, payload) {
    state.fetchingItems = payload
  },
  setItemList: function (state, payload) {
    state.itemList = payload
  },
  setLoadingItem: function (state, payload) {
    state.loadingItem = payload
  },
  setSelectedItem: function (state, payload) {
    state.selectedItem = payload
  },
}

const model = {
  namespaced: true,
  state: { ...selectorState },
  getters: { ...selectorGetters },
  mutations: { ...selectorMutations },
  actions: {},
}

const parameterUncertainties = {
  namespaced: true,
  state: { ...selectorState },
  getters: { ...selectorGetters },
  mutations: { ...selectorMutations },
  actions: {},
}

const uncertaintyDefinitions = {
  namespaced: true,
  state: { ...selectorState },
  getters: { ...selectorGetters },
  mutations: {
    ...selectorMutations,
    assignUncertaintyDistribution(state, payload) {
      Vue.set(state.selectedItem, 'distribution', payload.distribution)
      // Vue.set(payload.item, 'distribution', payload.distribution)
    },
  },
  actions: {},
}

export default new Vuex.Store({
  state: {
    activeUser: false,
    parameterInformation: {},
    parameterUncertaintiesData: [],
    simulationSteps: [LoadModelStep, SelectParameterUncertaintiesStep, DefineParameterUncertaintiesStep, SetSimulationParametersStep],
    simulationStepsReady: [true, false, false, false],
  },
  getters: {
    parameterInformation: function (state) {
      return state.parameterInformation
    },
    hasParameterInformation: function (state) {
      return Object.keys(state.parameterInformation).length > 0
    },
    parameterUncertaintiesData: function (state) {
      return state.parameterUncertaintiesData
    },
    hasParameterUncertaintiesData: function (state) {
      return state.parameterUncertaintiesData.length > 0
    },
    simulationSteps: function (state) {
      return state.simulationSteps
    },
    simulationStepsReady: function (state) {
      return state.simulationStepsReady
    },
  },
  mutations: {
    changeUserState(state, payload) {
      state.activeUser = payload
    },
    setParameterInformation(state, payload) {
      state.parameterInformation = payload
    },
    setParameterUncertaintiesData(state, payload) {
      state.parameterUncertaintiesData = payload
    },
    addParameterUncertainty(state, payload) {
      state.parameterUncertaintiesData.push(payload)
    },
    removeParameterUncertainty(state, payload) {
      const idx = state.parameterUncertaintiesData.findIndex((e) => e.id === payload.id)
      if (idx !== -1) {
        state.parameterUncertaintiesData.splice(idx, 1)
      }
    },
    setSimulationStepReady(state, payload) {
      Vue.set(state.simulationStepsReady, payload, true)
    },
  },
  actions: {
    async fetchUserModels({ dispatch, commit, state }) {
      const authService = getInstance()
      commit('model/setFetchingItems', true)
      const accessToken = await authService.getTokenSilently()
      const files = await listUserModels(accessToken).catch((error) => {
        dispatch('notifications/addFailure', `${error.message} - unable to fetch user models`)
        return
      })
      if (files) {
        dispatch('notifications/addSuccess', 'Successfully fetched available user models.')
        commit('model/setItemList', files.model_files)
        commit('model/setFetchingItems', false)
        const currentUserModels = [...state.model.itemList]
        if (currentUserModels.indexOf(state.model.selectedItem) == -1) {
          commit('model/setSelectedItem', currentUserModels[0])
        }
      }
    },
    async fetchParameterUncertainties({ dispatch, commit, state }) {
      const authService = getInstance()
      commit('parameterUncertainties/setFetchingItems', true)
      const accessToken = await authService.getTokenSilently()
      const files = await listUserParameterUncertainties(state.model.currentItem, accessToken).catch((error) => {
        dispatch('notifications/addFailure', `${error.message} - unable to fetch user uncertainty definitions`)
        return
      })
      if (files) {
        dispatch('notifications/addSuccess', 'Successfully fetched available user uncertainty definitions.')
        commit('parameterUncertainties/setItemList', files.uncertainty_definitions)
        commit('parameterUncertainties/setFetchingItems', false)
        const currentUserParameterUncertainties = [...state.parameterUncertainties.itemList]
        if (currentUserParameterUncertainties.indexOf(state.parameterUncertainties.selectedItem) == -1) {
          commit('parameterUncertainties/setSelectedItem', currentUserParameterUncertainties[0])
        }
      }
    },
    async loadUserModel({ dispatch, commit, state }) {
      const authService = getInstance()
      commit('model/setLoadingItem', true)
      const accessToken = await authService.getTokenSilently()
      fetchModelParameterInfo(state.model.currentItem, accessToken).then(
        (value) => {
          commit('setParameterInformation', value.parameter_information)
          commit('setSimulationStepReady', 1)
          dispatch('notifications/addSuccess', 'Parameter information successfully loaded.')
          commit('model/setLoadingItem', false)
        },
        (reason) => {
          dispatch('notifications/addFailure', `${reason} - unable to load user model`)
          commit('model/setLoadingItem', false)
        }
      )
    },
    async loadModelParameterUncertainties({ dispatch, commit, state }) {
      const currentItem = state.parameterUncertainties.currentItem
      if (currentItem === '<user-selection>') {
        commit('uncertaintyDefinitions/setItemList', state.parameterUncertaintiesData)
        commit('uncertaintyDefinitions/setSelectedItem', state.parameterUncertaintiesData[0])
        commit('setSimulationStepReady', 2)
        dispatch('notifications/addSuccess', 'Parameter information successfully loaded.')
      } else {
        const authService = getInstance()
        commit('uncertaintyDefinitions/setLoadingItem', true)
        const accessToken = await authService.getTokenSilently()
        const associated_model = state.model.currentItem
        const filename = state.parameterUncertainties.currentItem
        fetchParameterUncertainties(associated_model, filename, accessToken).then(
          (value) => {
            commit('uncertaintyDefinitions/setItemList', value.parameter_uncertainty_information)
            commit('uncertaintyDefinitions/setSelectedItem', value.parameter_uncertainty_information[0])
            commit('setSimulationStepReady', 2)
            dispatch('notifications/addSuccess', 'Uncertainties definitions successfully loaded.')
            commit('uncertaintyDefinitions/setLoadingItem', false)
          },
          (reason) => {
            dispatch('notifications/addFailure', `${reason} - unable to load user uncertainties definitions`)
            commit('uncertaintyDefinitions/setLoadingItem', false)
          }
        )
      }
    },
  },
  modules: { distributions, notifications, model, parameterUncertainties, uncertaintyDefinitions },
})
