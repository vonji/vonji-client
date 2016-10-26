<template lang="html">
	<bs-navbar brand-name="Vonji" link="/">
		<ul class="nav navbar-nav">
			<li><router-link to="/requests">Requêtes</router-link></li>
			<li><router-link to="/tags/list">Compétences</router-link></li>
			<li><router-link to="/users/list">Membres</router-link></li>
			<li><router-link to="/achievements">Badges</router-link></li>
			<li v-if="isLogged"><router-link to="/requests/add">Nouvelle requête</router-link></li>
			<li><a href="#"><span is="notification"></span></a></li>
		</ul>
		<login-form v-if="isGuest" class="nav navbar-nav navbar-right"></login-form>
		<ul v-else class="nav navbar-nav navbar-right">
			<li><img :src="currentUser.Avatar" alt="user-avatar" width="40" height="40" class="hidden-xs topbar-avatar img-rounded"></li>
			<li><router-link :to="'/users/profile/view/' + currentUser.ID">{{ currentUser.DisplayedName }} ({{ currentUser.VActions }} vActions)</router-link></li>
			<li><logout-form></logout-form></li>
		</ul>
	</bs-navbar>
</template>

<script type="text/ecmascript-6">
	import LoginForm from './LoginForm.vue';
	import LogoutForm from './LogoutForm.vue';
	import BsNavbar from '../bootstrap/BsNavbar.vue';
	import Notification from './Notification.vue';

	import { usersApi } from '../../utils/resources';
	import { isLogged, isGuest, currentUser } from '../../vuex/getters'

	export default {
		components: {
			BsNavbar,
			LoginForm,
			LogoutForm,
			Notification,
		},
		vuex: {
			getters: {
				isGuest,
				isLogged,
				currentUser
			}
		}
	}
</script>

<style>
	.topbar-avatar {
		margin-top: 5px;
	}
</style>