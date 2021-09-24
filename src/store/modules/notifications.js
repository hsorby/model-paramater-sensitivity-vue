export const namespaced = true

export const state = {
  notifications: [],
}

let nextId = 1

export const getters = {
  messages(state) {
    return state.notifications
  },
}

export const mutations = {
  PUSH(state, notification) {
    state.notifications.push({
      ...notification,
      id: nextId++,
    })
  },
  DELETE(state, notificationToRemove) {
    state.notifications = state.notifications.filter((notification) => notification.id !== notificationToRemove.id)
  },
}

export const actions = {
  add({ commit }, notification) {
    commit('PUSH', notification)
  },
  addSuccess({ commit }, message) {
    commit('PUSH', { message, options: { type: 'success', time: 1000 } })
  },
  addFailure({ commit }, message) {
    commit('PUSH', { message, options: { type: 'error', time: 3000 } })
  },
  remove({ commit }, notificationToRemove) {
    commit('DELETE', notificationToRemove)
  },
}
