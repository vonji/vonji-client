<template>
	<div class="row">
		<div class="col-md-3"></div>
		<div class="col-md-6">
			<form @submit.prevent="submit">
				<div class="form-group">
					<label for="signup-input-email">Email</label>
					<input type="email" placeholder="Email" required v-model="user.Email" id="signup-input-email" class="form-control">
				</div>
				<div class="form-group">
					<label for="signup-input-password">Password</label>
					<input type="password" placeholder="Password" required v-model="user.Password" id="signup-input-password" class="form-control">
				</div>
				<div class="form-group">
					<label for="signup-input-name">Displayed name</label>
					<input type="text" placeholder="Displayed name" required v-model="user.DisplayedName" id="signup-input-name" class="form-control">
				</div>
				<div class="form-group">
					<label for="signup-input-description">Description</label>
					<input type="text" placeholder="Description" v-model="user.Description" id="signup-input-description" class="form-control">
				</div>
				<button type="submit" class="btn btn-primary">Submit</button>
			</form>
		</div>
		<div class="col-md-3"></div>
	</div>
</template>

<script type="text/ecmascript-6">
	import { usersApi } from '../../utils/resources';
	import { login, userUpdate } from '../../vuex/actions';

	export default {
		data() {
			return {
				user: {
					VActions: 1,
					VCoins: 200
				}
			};
		},
		vuex: {
			actions: {
				submit({ dispatch }, e) {
					usersApi.save(this.user)
						.then((result) => {
							localStorage.userID = result.json().ID;
							return result.json();
						})
						.then(user => login({ dispatch }, user.Email, user.Password))
						.then(user => userUpdate({ dispatch }, user))
						.then(() => this.$router.go('/users/welcome'));
				}
			}
		}
	}
</script>
