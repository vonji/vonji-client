<template>
	<div class="navbar-form">
		<form @submit.prevent="submit" role="form" autocomplete="on" class="form-inline">
			<div class="form-group">
				<input v-model="email" type="email" class="form-control" placeholder="Login"/>
			</div>
			<div class="form-group">
				<input v-model="password" type="password" class="form-control" placeholder="Password"/>
			</div>
			<button type="submit" class="btn {{ isDisabled ? 'btn-default' : 'btn-primary' }}" disabled="{{ isDisabled }}">
				Connexion
			</button>
			<a class="btn btn-primary" v-link="'/users/add'">S'inscrire</a>
		</form>
	</div>
</template>

<script>
	import { login } from '../../vuex/actions';

	export default {
		data() {
			return {
				email: '',
				password: ''
			};
		},
		computed: {
			isDisabled() {
				return this.email === '' || this.password === '';
			}
		},
		vuex: {
			actions: {
				submit({ dispatch }, e) {
					login({ dispatch }, this.email, this.password);
				}
			}
		}
	}
</script>

<style scoped>
	form {
		margin-bottom: 0!important;
	}
</style>
