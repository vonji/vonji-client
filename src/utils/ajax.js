//TODO User Vue-Resource everywhere

let vonji = {
    get: function (o) {
        "use strict";

        o.method = 'GET';
        return ajax(o);
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
                window.location.href = frontHome + o.redirect;//TODO
            }
        },
        error: o.error || function (jqXHR, textStatus, error) {
            console.error(error);
        }
    });
};
