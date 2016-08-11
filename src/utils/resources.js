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
export const transactionsApi = Vue.resource('transactions{/id}');

let usersApi = Vue.resource('users{/id}');
usersApi.getByEmail = email => Vue.http.get('users/where/' + encodeURI(JSON.stringify({ Email: email })));
usersApi.getHistoric = id => {
	return Vue.http.get('transactions/where/all/' + encodeURI(JSON.stringify({ FromID: Number(id) })))
		.then((response) => {
			return Vue.http.get('transactions/where/all/' + encodeURI(JSON.stringify({ ToID: Number(id) })))
				.then((response2) => response.json().concat(response2.json()));
		});
};

export { usersApi };

let tagsApi = Vue.resource('tags{/id}');
tagsApi.getRequests = tagId => Vue.http.get('requests/all/where' + encodeURI(JSON.stringify({ tags: [{ ID: tagId }] })));

export { tagsApi };