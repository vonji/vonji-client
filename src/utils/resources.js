import Vue from 'vue';
import Resource from 'vue-resource'
import moment from 'moment';

Vue.filter('fromNow', input =>
	moment(input).fromNow()
);

Vue.filter('format', (input, format) =>
	moment(input).format(format)
);

Vue.use(Resource);

Vue.http.options.root = 'http://localhost:1618';

export const responsesApi = Vue.resource('responses{/id}');
export const requestsApi = Vue.resource('requests{/id}');
export const commentsApi = Vue.resource('comments{/id}');
export const tagsApi = Vue.resource('tags{/id}');
let usersApi = Vue.resource('users{/id}');
usersApi.getByEmail = email => Vue.http.get('users/where/' + encodeURI(JSON.stringify({ Email: email })));
export { usersApi };
