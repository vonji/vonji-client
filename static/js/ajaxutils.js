var vonji = {
    get: function (o) {
        "use strict";

        $.ajax({
            url: 'http://localhost:1618/' + o.url,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: o.success,
            error: o.error || function (jqXHR, status, error) {
                console.error(error);
            }
        });
    },
    post: function (o) {
        "use strict";

        $.ajax({
            url: 'http://localhost:1618/' + o.url,
            contentType: 'application/json; charset=utf-8',
            method: 'POST',
            data: o.data,
            success: o.success,
            error: o.error || function (jqXHR, status, error) {
                console.error(error);
            }
        });
    },
    put: function (o) {
        "use strict";

        $.ajax({
            url: 'http://localhost:1618/' + o.url,
            contentType: 'application/json; charset=utf-8',
            method: 'PUT',
            data: o.data,
            success: o.success,
            error: o.error || function (jqXHR, status, error) {
                console.error(error);
            }
        });
    },
    delete: function (o) {
        "use strict";

        $.ajax({
            url: 'http://localhost:1618/' + o.url,
            contentType: 'application/json; charset=utf-8',
            method: 'DELETE',
            data: o.data,
            success: o.success,
            error: o.error || function (jqXHR, status, error) {
                console.error(error);
            }
        });
    }
};