import Vue from 'vue'
import Vuex from 'vuex'

import { getInstance } from '@/auth/auth0-plugin'

import { listUserModels, fetchModelParameterInfo } from '@/services/backend-api.js'

import * as notifications from '@/store/modules/notifications.js'

import LoadModelStep from '@/components/SimulationSteps/LoadModelStep.vue'
import SelectParameterUncertaintiesStep from '@/components/SimulationSteps/SelectParameterUncertaintiesStep.vue'

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

export default new Vuex.Store({
  state: {
    activeUser: false,
    parameterInformation: {},
    parameterUncertaintiesData: [],
    simulationSteps: [LoadModelStep, SelectParameterUncertaintiesStep],
    simulationStepsReady: [true, false],
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
    async loadModelParameterUncertainties({ state }) {
      console.log('loading parameter uncertainties: ', state.parameterUncertainties.currentItem)
    },
  },
  modules: { notifications, model, parameterUncertainties },
})
