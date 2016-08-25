import Vue from 'vue';
import Resource from 'vue-resource'
import moment from 'moment';

Vue.filter('fromNow', (input, param) =>
	moment(input).fromNow(param)
);

Vue.filter('format', (input, format) =>
	moment(input).format(format)
);

Vue.filter('byCreation', (objects) =>
	objects.slice().sort((a, b) => {
		if (moment(a.CreatedAt).isSame(b.CreatedAt, 'second'))
			return 0;
		return moment(a.CreatedAt).isBefore(b.CreatedAt, 'second') ? 1 : -1;
	})
);

Vue.filter('byUpdate', (objects) =>
	objects.slice().sort((a, b) => {
		if (moment(a.UpdatedAt).isSame(b.UpdatedAt, 'second'))
			return 0;
		return moment(a.UpdatedAt).isBefore(b.UpdatedAt, 'second') ? 1 : -1;
	})
);

Vue.use(Resource);

Vue.http.options.root = 'http://localhost:1618';

export const responsesApi = Vue.resource('responses{/id}');
export const requestsApi = Vue.resource('requests{/id}');
export const commentsApi = Vue.resource('comments{/id}');
export const tagsApi = Vue.resource('tags{/id}');
export const transactionsApi = Vue.resource('transactions{/id}');
export const achievementsApi = Vue.resource('achievements{/id}');

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
		let res = [];
		response.json().filter(r => r.Responses.filter(e => e.UserID == id).length !== 0)
			.map(e => e.Tags)
			.reduce((a, b) => a.concat(b), [])
			.forEach((tag) => {
				if (!res.some(e => e.ID == tag.ID))
					res.push(tag);
			});
		return res;
	});
};
usersApi.getRequests = id => Vue.http.get('requests/where/all/' + encodeURIComponent(JSON.stringify({ UserID: Number(id) }))).then(response => response.json());

export { usersApi };