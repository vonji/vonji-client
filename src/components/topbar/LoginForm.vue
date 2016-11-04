<template>
	<div class="navbar-form">
		<form @submit.prevent="submit" role="form" autocomplete="on" class="form-inline">
			<div class="form-group">
				<input v-model="email" type="email" class="form-control" placeholder="Login"/>
			</div>
			<div class="form-group">
				<input v-model="password" type="password" class="form-control" placeholder="Password"/>
			</div>
			<button type="submit" :class="'btn' + isDisabled ? 'btn-default' : 'btn-primary'" :disabled="isDisabled">
				Connexion
			</button>
			<router-link to="/users/add" class="btn btn-primary">S'inscrire</router-link>
		</form>
	</div>
</template>

<script>
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
		methods: {
			submit() {
				this.$store.dispatch('login', { email: this.email, passoword: this.password });
			}
		}
	}
</script>

<style scoped>
	form {
		margin-bottom: 0!important;
	}
</style>
