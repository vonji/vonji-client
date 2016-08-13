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
usersApi.getTags = id => {
	return requestsApi.get().then(response => {
		//Get all tags of request that the user answered, then filter duplicate
		return response.json().filter(r => r.Responses.filter(e => e.UserID == id).length !== 0).map(e => e.Tags).reduce((a, b) => a.concat(b), []).filter((tagId, _, self) => !self.some(e => e.ID === tagId));
	});
};
usersApi.getRequests = id => Vue.http.get('requests/where/all/' + encodeURIComponent(JSON.stringify({ UserID: Number(id) }))).then(response => response.json());

export { usersApi };

let tagsApi = Vue.resource('tags{/id}');
tagsApi.getRequests = tagId => {
	return requestsApi.get().then(response => {
		return response.json().filter(r => r.Tags.filter(tag => tag.ID === tagId).length !== 0);
	});
};

export { tagsApi };