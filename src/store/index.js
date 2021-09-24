import Vue from 'vue'
import Vuex from 'vuex'

import { getInstance } from '@/auth/auth0-plugin'

import { listUserModels, fetchModelParameterInfo } from '@/services/backend-api.js'

import * as notifications from '@/store/modules/notifications.js'

import LoadModelStep from '@/components/SimulationSteps/LoadModelStep.vue'
import SelectParameterUncertaintiesStep from '@/components/SimulationSteps/SelectParameterUncertaintiesStep.vue'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    activeUser: false,
    userModels: [],
    selectedUserModel: '',
    fetchingUserModels: false,
    loadingUserModel: false,
    currentUserModel: '<no-model-selected>',
    parameterInformation: {},
    simulationSteps: [LoadModelStep, SelectParameterUncertaintiesStep],
    simulationStepsReady: [true, false],
  },
  getters: {
    userModels: function (state) {
      if (state.activeUser) {
        return state.userModels
      }

      return []
    },
    fetchingUserModels: function (state) {
      return state.fetchingUserModels
    },
    loadingUserModel: function (state) {
      return state.loadingUserModel
    },
    selectedUserModel: function (state) {
      return state.selectedUserModel
    },
    currentUserModel: function (state) {
      return state.currentUserModel
    },
    parameterInformation: function (state) {
      return state.parameterInformation
    },
    hasParameterInformation: function (state) {
      return Object.keys(state.parameterInformation).length > 0
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
    setUserModels(state, payload) {
      state.userModels = payload
    },
    setFetchingUserModels(state, payload) {
      state.fetchingUserModels = payload
    },
    setLoadingUserModel(state, payload) {
      state.loadingUserModel = payload
    },
    setSelectedUserModel(state, payload) {
      state.selectedUserModel = payload
    },
    setCurrentUserModel(state, payload) {
      state.currentUserModel = payload
    },
    setParameterInformation(state, payload) {
      state.parameterInformation = payload
    },
    setSimulationStepReady(state, payload) {
      Vue.set(state.simulationStepsReady, payload, true)
    },
  },
  actions: {
    async fetchUserModels({ dispatch, commit, state }) {
      const authService = getInstance()
      commit('setFetchingUserModels', true)
      const accessToken = await authService.getTokenSilently()
      const files = await listUserModels(accessToken).catch((error) => {
        dispatch('notifications/addFailure', `${error.message} - unable to fetch user models`)
        return
      })
      if (files) {
        dispatch('notifications/addSuccess', 'Successfully fetched available user models.')
        commit('setUserModels', files.model_files)
        commit('setFetchingUserModels', false)
        const currentUserModels = [...state.userModels]
        if (currentUserModels.indexOf(state.selectedUserModel) == -1) {
          commit('setSelectedUserModel', currentUserModels[0])
        }
      }
    },
    async loadUserModel({ dispatch, commit, state }) {
      const authService = getInstance()
      commit('setLoadingUserModel', true)
      const accessToken = await authService.getTokenSilently()
      fetchModelParameterInfo(state.currentUserModel, accessToken).then(
        (value) => {
          commit('setParameterInformation', value.parameter_information)
          commit('setSimulationStepReady', 1)
          dispatch('notifications/addSuccess', 'Parameter information successfully loaded.')
          commit('setLoadingUserModel', false)
        },
        (reason) => {
          dispatch('notifications/addFailure', `${reason} - unable to load user model`)
          commit('setLoadingUserModel', false)
        }
      )
    },
  },
  modules: { notifications },
})
