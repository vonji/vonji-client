let vonji = {
    get: function (o) {
        "use strict";

        o.method = 'GET';
        return ajaxPromise(o);
    },
    post: function (o) {
        "use strict";

        o.method = 'POST';
        ajax(o);
    },
    put: function (o) {
        "use strict";

        o.method = 'PUT';
        ajax(o);
    },
    delete: function (o) {
        "use strict";

        o.method = 'DELETE';
        ajax(o);
    }
};

export default vonji;

function ajaxPromise(o) {
    "use strict";

    let $ = require('jquery');

    let apiHome = 'http://localhost:1618/';
    let frontHome = 'http://localhost:8080/';
/*
    return new Promise(function (resolve, reject) {
        resolve([{
            FirstName: "test",
            LastName: "test",
            Description: "test",
            VReputation: 44,
            Tags: []
        }]);
    });
*/

    return Vue.http.get('/someUrl', [data], [options]).then((response) => {
        
    }, (error) => {
        if (o.error)
            o.error(error);
        else
            console.error(new Error(error));
    });

    return $.ajax({
        method: o.method,
        url: apiHome + o.url,
        contentType: 'application/json; charset=utf-8',
        dataType: o.method === 'GET' ? 'json' : null,
        data: o.data
    })
    .done(function (data) {
        let result = data;

        if (o.success) {
            result = o.success(data);
        }
        if (o.reload && o.redirect) {
            console.error('Can not reload and redirect after ajax request');
            return;
        }
        if (o.reload) {
            window.location.reload(true);
        }
        if (o.redirect) {
            window.location.href = frontHome + o.redirect;//TODO
        }

        return result;
    })
    .fail(function (data) {
        if (o.error) {
            return new Error(o.error(data));
        }
        else {
            return new Error(data);
        }
    });
}

let ajax = function (o) {
    "use strict";

	let $ = require('jquery');

    let apiHome = 'http://localhost:1618/';
    let frontHome = 'http://localhost:8080/';

    $.ajax({
        method: o.method,
        url: apiHome + o.url,
        contentType: 'application/json; charset=utf-8',
        dataType: o.method === 'GET' ? 'json' : null,
        data: o.data,
        success: function (data, textStatus, jqXHR) {
            if (o.success) {
                o.success(data, textStatus, jqXHR);
            }
            if (o.reload && o.redirect) {
                console.error('Can not reload and redirect after ajax request');
                return;
            }
            if (o.reload) {
                window.location.reload(true);
            }
            if (o.redirect) {
                window.location.href = frontHome + o.redirect;
            }
        },
        error: o.error || function (jqXHR, textStatus, error) {
            console.error(error);
        }
    });
};
