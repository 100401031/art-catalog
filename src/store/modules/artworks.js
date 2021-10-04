import artworkAPI from '@/api/artworkAPI';

// initial state
const state = () => ({
  pageState: 'INITIAL',
  artworks: [
    { id: 'placeholder_1' },
    { id: 'placeholder_2' },
    { id: 'placeholder_3' },
    { id: 'placeholder_4' },
  ],
  config: null,
  info: {},
  pagination: {},
  listRows: 20,
  lastPage: null,
  currentPage: 1,
  searchKeyword: '',
});

// getters
const getters = {};

// actions
const actions = {
  async getConfig({ commit }) {
    const resData = await artworkAPI.getConfig();
    commit('setConfig', resData.config);
  },
  async getArtworks({ commit, state }, { page = 1, keyword }) {
    commit('setPageState', 'ACTIVED');
    const resData = await artworkAPI.getArtworks(page, keyword, state.listRows);

    if (resData.config) {
      commit('setConfig', resData.config);
    }

    commit('setArtworks', resData.data);
    commit('setPagination', resData.pagination);
    commit('setInfo', resData.info);
    commit('setLastPage', page);
  },
  async setCurrentPage({ commit }, { currentPage }) {
    commit('setCurrentPage', currentPage);
  },
  async setSearchKeyword({ commit }, { searchKeyword }) {
    commit('setSearchKeyword', searchKeyword);
  },
};

// mutations
const mutations = {
  setArtworks(state, artworks) {
    state.artworks = artworks;
  },
  setConfig(state, config) {
    state.config = config;
  },
  setPagination(state, pagination) {
    state.pagination = pagination;
  },
  setInfo(state, info) {
    state.info = info;
  },
  setLastPage(state, page) {
    state.lastPage = page;
  },
  setCurrentPage(state, currentPage) {
    state.currentPage = currentPage;
  },
  setSearchKeyword(state, searchKeyword) {
    state.searchKeyword = searchKeyword;
  },
  setPageState(state, pageState) {
    state.pageState = pageState;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
