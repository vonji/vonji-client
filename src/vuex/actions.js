import Vue from 'vue'

export const login = ({dispatch}, email, password) => {
    Vue.http.get('http://localhost:1618/users/' + email).then((result) => {
        "use strict";
        if (JSON.parse(result.data).Password == password)
        {
            dispatch('LOGIN', email, password);
            dispatch('ALERT', 'info', 'Logged in');
        }
        else
            console.error('Bad password: ' + password);
    });
};

export const logout = ({dispatch}) => {
    dispatch('LOGOUT');
    dispatch('ALERT', 'info', 'Logged out');
};

export const alert = ({dispatch}, type, message) => {
    "use strict";
    dispatch('ALERT');
};

export const alertDismiss = ({dispatch}, index) => {
    "use strict";
    dispatch('ALERT_DISMISS', index);
};