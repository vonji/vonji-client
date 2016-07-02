import Vue from 'vue';
import Resource from 'vue-resource'
import moment from 'moment';

Vue.filter('fromNow', input => {
	return moment(input).fromNow();
})

Vue.use(Resource);

const root = 'http://localhost:1618/';

export const responsesApi = Vue.resource(`${root}responses{/id}`);
export const requestsApi = Vue.resource(`${root}requests{/id}`);
export const usersApi = Vue.resource(`${root}users{/email}`);
