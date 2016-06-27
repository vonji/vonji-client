//Vue.http.options.root = 'http://localhost:1618/';//TODO make this work

import Vue from 'vue';

export default {
    user: new Resource('users'),
    request: new Resource('requests'),
    response: new Resource('responses')
};

function Resource(resourceName) {
    "use strict";

    let options = {};

//  let resource = Vue.resource(resourceName + '{/id}'); // does not work because Vue is not intialized when the object is exported
    let resourceUrl = 'http://localhost:1618/' + resourceName + '/';

    let success = (response) => {
        if (this.options.success)
            o.success(response);
        if (this.options.reload && this.options.redirect) {
            console.error('Can not reload and redirect after ajax request');
            return;
        }
        if (this.options.reload)
            window.location.reload(true);
        if (this.options.redirect)
            ;//todo router.go(o.redirect);

        return response.data
    };

    let error = (o, response) => {
        if (o.error)
            o.error(response);
    };

    this.get = (o) => { this.options = o || {}; return Vue.http.get(resourceUrl + o.id).then(success, error); };
    this.post = (o) => { this.options = o || {}; return Vue.http.post(resourceUrl, o.data).then(success, error); };
    this.put = (o) => { this.options = o || {}; return Vue.http.put(resourceUrl, o.data).then(success, error); };
    this.delete = (o) => { this.options = o || {}; return Vue.http.delete(resourceUrl + o.id).then(success, error); };
}