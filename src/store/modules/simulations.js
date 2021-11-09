export const namespaced = true

import { getInstance } from '@/auth/auth0-plugin'

import { listUserSimulations } from '@/services/backend-api.js'
import { selectorGetters, selectorMutations, selectorState } from '@/store/selector.js'

export const state = {
  ...selectorState,
  active: [],
}

export const getters = {
  ...selectorGetters,
  getActive(state) {
    return state.active
  },
}

export const mutations = {
  ...selectorMutations,
  addActive(state, payload) {
    state.active.push(payload)
  },
  removeActive(state, payload) {
    console.log('remove active', payload, state.active)
    state.active = state.active.filter(function (a) {
      return a.reference !== payload
    })
    console.log(state.active)
  },
}

export const actions = {
  async fetchUserSimulations({ dispatch, commit }) {
    const authService = getInstance()
    commit('setFetchingItems', true)
    const accessToken = await authService.getTokenSilently()
    const response = await listUserSimulations(accessToken).catch((error) => {
      dispatch('notifications/addFailure', `${error.message} - unable to fetch user simulations`, { root: true })
      return
    })
    if (response) {
      dispatch('notifications/addSuccess', 'Successfully fetched available user simulations.', { root: true })
      commit('setItemList', response.simulation_info)
      commit('setFetchingItems', false)
    }
  },
  async activeFinished({ commit }, payload) {
    console.log('== active finished', payload)
    commit('removeActive', payload.reference)
    commit('addItem', payload)
  },
}
