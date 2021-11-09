export const selectorState = {
  currentItem: '<not-set>',
  fetchingItems: false,
  itemList: [],
  loadingItem: false,
  selectedItem: '',
}

export const selectorGetters = {
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

export const selectorMutations = {
  setCurrentItem: function (state, payload) {
    state.currentItem = payload
  },
  setFetchingItems: function (state, payload) {
    state.fetchingItems = payload
  },
  setItemList: function (state, payload) {
    state.itemList = payload
  },
  addItem: function (state, payload) {
    state.itemList.push(payload)
  },
  setLoadingItem: function (state, payload) {
    state.loadingItem = payload
  },
  setSelectedItem: function (state, payload) {
    state.selectedItem = payload
  },
}
