<template>
	<div class="row">
		<div class="col-md-3"></div>
		<div class="col-md-6">
			<form @submit.prevent="submit">
				<input type="email" placeholder="Email" required v-model="user.Email">
				<input type="password" placeholder="Password" required v-model="user.Password">
				<input type="text" placeholder="Displayed name" required v-model="user.DisplayedName">
				<input type="text" placeholder="Description" v-model="user.Description">
				<button type="submit">Submit</button>
			</form>
		</div>
		<div class="col-md-3"></div>
	</div>
</template>

<script type="text/babel">
	import {
		usersApi,
	} from '../../utils/resources';

	export default {
		data() {
			return {
				user: {}
			};
		},
		methods: {
			submit: function () {
				usersApi.save(this.user)
					.then(() => this.$router.go('/users/list'));
			}
		}
	}
</script>
