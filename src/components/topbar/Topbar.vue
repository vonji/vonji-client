<template lang="html">
	<bs-navbar brand-name="Vonji" link="'/'">
		<ul class="nav navbar-nav">
			<li><a v-link="'/requests'">Requests</a></li>
			<li><a v-link="'/tags/list'">Tags</a></li>
			<li><a v-link="'/users/list'">Users</a></li>
			<li v-if="isLogged"><a v-link="'/requests/add'">New request</a></li>
		</ul>
		<login-form v-if="isGuest" class="nav navbar-nav navbar-right"></login-form>
		<ul v-else class="nav navbar-nav navbar-right">
			<li><a v-link="'/users/profile/view/' + user.ID">{{ user.DisplayedName }}</a></li>
			<li><logout-form></logout-form></li>
		</ul>
	</bs-navbar>
</template>

<script type="text/babel">
import LoginForm from './LoginForm.vue';
import LogoutForm from './LogoutForm.vue';
import BsNavbar from '../bootstrap/BsNavbar.vue';

import { usersApi } from '../../utils/resources';
import { isLogged, isGuest } from '../../vuex/getters'

export default {
	data() {
		return {
			user: {}
		};
	},
	ready() {
		return usersApi.get({ id: localStorage.userID }).then(response => this.user = response.json());
	},
	components: {
		BsNavbar,
		LoginForm,
		LogoutForm
	},
	vuex: {
		getters: {
			isGuest,
			isLogged
		}
	}
}
</script>