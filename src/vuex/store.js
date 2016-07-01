import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    alerts: [],
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
    ALERT (state, type, message) {
        "use strict";
        state.alerts.push({type: type, message: message});
    },
    ALERT_DISMISS (state, index) {
        "use strict";
        state.alerts.splice(index, index + 1);
    }
};

export default new Vuex.Store({
    state,
    mutations
});
