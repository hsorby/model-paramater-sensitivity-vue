import Vue from 'vue'
import Vuex from 'vuex'

import { getInstance } from '@/auth/auth0-plugin'

import {
  listUserModels,
  fetchModelParameterInfo,
  listUserOutputParameters,
  listUserParameterUncertainties,
  fetchOutputParameters,
  fetchParameterUncertainties,
} from '@/services/backend-api.js'

import * as notifications from '@/store/modules/notifications.js'
import * as distributions from '@/store/modules/distributions.js'
import * as simulationParameters from '@/store/modules/simulationparameters.js'
import * as simulations from '@/store/modules/simulations.js'

import { selectorGetters, selectorMutations, selectorState } from './selector.js'

import LoadModelStep from '@/components/SimulationSteps/LoadModelStep.vue'
import SelectParameterUncertaintiesStep from '@/components/SimulationSteps/SelectParameterUncertaintiesStep.vue'
import DefineParameterUncertaintiesStep from '@/components/SimulationSteps/DefineParameterUncertaintiesStep.vue'
import SetSimulationParametersStep from '@/components/SimulationSteps/SetSimulationParametersStep.vue'
import SelectOutputParametersStep from '@/components/SimulationSteps/SelectOutputParametersStep.vue'
import RunStep from '@/components/SimulationSteps/RunStep.vue'

Vue.use(Vuex)

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

const outputParameters = {
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
    outputParametersData: [],
    simulationSteps: [
      LoadModelStep,
      SelectParameterUncertaintiesStep,
      DefineParameterUncertaintiesStep,
      SetSimulationParametersStep,
      SelectOutputParametersStep,
      RunStep,
    ],
    simulationStepsReady: [true, false, false, true, false, false],
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
    outputParametersData: function (state) {
      return state.outputParametersData
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
    setOutputParametersData(state, payload) {
      state.outputParametersData = payload
    },
    addOutputParameter(state, payload) {
      state.outputParametersData.push(payload)
    },
    removeOutputParameter(state, payload) {
      const idx = state.outputParametersData.findIndex((e) => e.id === payload.id)
      if (idx !== -1) {
        state.outputParametersData.splice(idx, 1)
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
    async fetchOutputParameters({ dispatch, commit, state }) {
      const authService = getInstance()
      commit('outputParameters/setFetchingItems', true)
      const accessToken = await authService.getTokenSilently()
      const files = await listUserOutputParameters(state.model.currentItem, accessToken).catch((error) => {
        dispatch('notifications/addFailure', `${error.message} - unable to fetch user output parameters`)
        return
      })
      if (files) {
        dispatch('notifications/addSuccess', 'Successfully fetched available user output parameters.')
        commit('outputParameters/setItemList', files.output_parameters)
        commit('outputParameters/setFetchingItems', false)
        const currentUserOutputParameters = [...state.outputParameters.itemList]
        if (currentUserOutputParameters.indexOf(state.outputParameters.selectedItem) == -1) {
          commit('outputParameters/setSelectedItem', currentUserOutputParameters[0])
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
          commit('setSimulationStepReady', 4)
          dispatch('notifications/addSuccess', 'Parameter information successfully loaded.')
          commit('model/setLoadingItem', false)
        },
        (reason) => {
          dispatch('notifications/addFailure', `${reason} - unable to load user model`)
          commit('model/setLoadingItem', false)
        }
      )
    },
    async loadModelOutputParameters({ dispatch, commit, state }) {
      const currentItem = state.outputParameters.currentItem
      if (currentItem === '<user-selection>') {
        dispatch('notifications/addSuccess', 'Output parameters successfully loaded.')
      } else {
        const authService = getInstance()
        commit('outputParameters/setLoadingItem', true)
        const accessToken = await authService.getTokenSilently()
        const associated_model = state.model.currentItem
        const filename = state.outputParameters.currentItem
        fetchOutputParameters(associated_model, filename, accessToken).then(
          (value) => {
            commit('setOutputParametersData', value.output_parameters_information)
            dispatch('notifications/addSuccess', 'Output parameters successfully loaded.')
            commit('outputParameters/setLoadingItem', false)
          },
          (reason) => {
            dispatch('notifications/addFailure', `${reason} - unable to load user output parameters`)
            commit('outputParameters/setLoadingItem', false)
          }
        )
      }
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
            commit('setParameterUncertaintiesData', value.parameter_uncertainty_information)
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
  modules: {
    distributions,
    model,
    notifications,
    outputParameters,
    parameterUncertainties,
    simulations,
    simulationParameters,
    uncertaintyDefinitions,
  },
})
