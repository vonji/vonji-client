import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    user: undefined
};

const mutations = {
    LOGIN (state, user) {
        state.user = user;
    },
    LOGOUT (state) {
        "use strict";
        state.user = undefined;
    }
};

export default new Vuex.Store({
    state,
    mutations
});
