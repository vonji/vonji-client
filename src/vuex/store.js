import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    user: localStorage.user
};

const mutations = {
    LOGIN (state, user) {
        state.user = user;
        localStorage.user = user;
    },
    LOGOUT (state) {
        "use strict";
        state.user = undefined;
        localStorage.user = '';//maybe undefine ?
    },
    }
};

export default new Vuex.Store({
    state,
    mutations
});
