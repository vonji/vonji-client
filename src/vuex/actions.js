import Vue from 'vue'

export const login = ({dispatch}, email, password) => {
    Vue.http.get('http://localhost:1618/users/' + email).then((result) => {
        "use strict";
        if (JSON.parse(result.data).Password == password)
            dispatch('LOGIN', email, password);
        else
            console.error('Bad password: ' + password);
    });
};

export const logout = ({dispatch}) => {
    dispatch('LOGOUT');
};
