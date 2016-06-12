import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  user: '',
  token: '',
};

const mutations = {
  LOGIN (state, username, password) {
    if (username === 'loup' && password === 'loup') {
      state.user = username;
      state.token = 'token';
    } else {
      state.user = '';
      state.token = '';
    }
  },
  LOGOUT (state) {
    state.user = '';
    state.token = '';
  },
};

export default new Vuex.Store({
  state,
  mutations,
});
