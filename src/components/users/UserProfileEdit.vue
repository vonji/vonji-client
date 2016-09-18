<template>
	<div>
		<user-profile-header :user="user"></user-profile-header>
		<div class="row profile">
			<div class="row profile-main">
				<div class="col-md-4">
					<avatar-box :user="user"></avatar-box>
				</div>
				<div class="col-md-6 form-group">
					<label for="displayedNameInput">Nom affiché</label>
					<input type="text" v-model="user.DisplayedName" id="displayedNameInput" class="form-control" placeholder="Displayed name">

					<label for="locationInput">Ville</label>
					<input type="text" v-model="user.Location" id="locationInput" class="form-control" placeholder="Location" >

					<label for="mottoInput">Motto</label>
					<input type="text" v-model="user.Motto"  id="mottoInput" class="form-control"placeholder="Motto" width="144">

					<br>

					<label class="radio-inline">
						<input type="radio" name="gender" v-model="user.Gender" value="man"> Homme
					</label>
					<label class="radio-inline">
						<input type="radio" name="gender" v-model="user.Gender" value="woman"> Femme
					</label>
					<label class="radio-inline">
						<input type="radio" name="gender" v-model="user.Gender" value="other"> Autre
					</label>
					<!-- TODO <input type="text" id="genderInput" v-model="user.Gender" placeholder="Specify"> Other -->
				</div>
			</div>
			<div class="row profile-main">
				<label for="descriptionInput">A propos de moi</label>
				<textarea name="description" v-model="user.Description" id="descriptionInput" class="form-control"></textarea>
			</div>
			<div class="row profileSocial">
				<h4>Réseaux sociaux</h4>

				<div class="col-md-3">
					<label for="facebookLinkInput">Facebook</label>
					<input type="url" v-model="user.FacebookLink" id="facebookLinkInput" class="form-control">
				</div>
				<div class="col-md-3">
					<label for="twitterLinkInput">Twitter</label>
					<input type="url" v-model="user.TwitterLink" id="twitterLinkInput" class="form-control">
				</div>
				<div class="col-md-3">
					<label for="linkedInLinkInput">LinkedIn</label>
					<input type="url" v-model="user.LinkedInLink" id="linkedInLinkInput" class="form-control">
				</div>
			</div>
			<hr>
			<div class="row profilePrivate">
				<h3>Données privées</h3>

				<label for="realNameInput">Nom</label>
				<input type="text" v-model="user.RealName" id="realNameInput" class="form-control">

				<label for="emailInput">Email</label>
				<input type="email" v-model="user.Email" id="emailInput" class="form-control">

				<label for="phoneInput">Numéro de téléphone</label>
				<input type="tel" v-model="user.Phone" id="phoneInput" class="form-control">

				<label for="birthdayInput">Anniversaire</label>
				<input type="date" v-model="user.Birthday" id="birthdayInput" class="form-control"> <!-- TODO js fall back -->
			</div>
			<div class="row">
				<button type="submit" class="btn btn-default" @click.prevent="save">Sauvegarder</button>
			</div>
		</div>
	</div>
</template>

<script type="text/babel">
	import AvatarBox from './AvatarBox.vue';
	import UserProfileHeader from './UserProfileHeader.vue';
	import { usersApi } from '../../utils/resources';
	import { achievementAward, alert } from '../../vuex/actions';
	import { achievementList } from "../../vuex/getters";

	export default {
		data() {
			return {
				user: {}
			};
		},
		route: {
			data({ to: { params: { id } } }) {
				return usersApi.get({ id }).then(user => ({ user: user.body }));
			}
		},
		vuex: {
			actions: {
				save({ dispatch }) {
					usersApi.update(this.user)
						.then(() => {
							let user = this.user;
							if (user.FacebookLink && user.TwitterLink && user.LinkedInLink)
								achievementAward({ dispatch }, this.achievementList[2], user);
							if (!user.RealName.empty() && !user.Description.empty() && !user.Motto.empty() && !user.FacebookLink.empty() && !user.TwitterLink.empty() && !user.LinkedInLink.empty() && !user.Phone.empty() && !user.Birthday.empty() && !user.Location.empty() && !user.Gender.empty()) {
								achievementAward({ dispatch }, this.achievementList[3], user);
							}
						})
						.then(() => alert({ dispatch }, 'info', 'Profile updated'))
						.catch(response => {
							alert({ dispatch }, 'danger', 'Could not save profile');
							console.error(response);
						});
				}
			},
			getters: {
				achievementList
			}
		},
		components: {
			AvatarBox,
			UserProfileHeader
		}
	}
</script>

<style lang="scss">
	.profile {
		input, textarea {
			margin-bottom: 15px;
		}
		.profile-main {
			margin-bottom: 20px;
		}
		hr {
			margin-top: 40px;
			margin-bottom: 40px;
		}
	}
</style>