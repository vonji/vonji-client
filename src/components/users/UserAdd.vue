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
					<label for="signup-input-password">Mot de passe</label>
					<input type="password" placeholder="Password" required v-model="user.Password" id="signup-input-password" class="form-control">
				</div>
				<div class="form-group">
					<label for="signup-input-name">Nom affiché</label>
					<input type="text" placeholder="Displayed name" required v-model="user.DisplayedName" id="signup-input-name" class="form-control">
				</div>
				<div class="form-group">
					<label for="signup-input-description">Description</label>
					<input type="text" placeholder="Description" v-model="user.Description" id="signup-input-description" class="form-control">
				</div>
				<button type="submit" class="btn btn-primary">S'inscrire</button>
			</form>
		</div>
		<div class="col-md-3"></div>
	</div>
</template>

<script type="text/ecmascript-6">
	import { usersApi } from '../../utils/resources';
	import * as M from '../../vuex/mutationTypes';

	export default {
		data() {
			return {
				user: {
					VActions: 1,
					VCoins: 200
				}
			};
		},
		methods: {
			submit() {
				this.user.Achievements = [this.$store.state.achievementList[0]];//todo wtf?
				usersApi.save(this.user)
					.then((result) => { localStorage.userID = result.body.ID; return result.body; })
					.then(user => { this.$store.dispatch('login', { email: user.Email, password: user.Password }); return user })
					.then(user => { this.$store.dispatch('userUpdate', user); return user })
					.then(user => { this.$store.commit(M.ALERT, { type: 'info', message: 'Achievement get: ' + user.Achievements[0].Name + '! Vous avez etes credité de 200 vCoins' }); return user })
					.then(() => this.$router.push('/'));
			}

		}
	}
</script>
