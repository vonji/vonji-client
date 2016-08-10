<template>
	<div>
		<div class="row">
			<div class="row profileMain">
				<div class="col-md-4">
					<img :src="user.Avatar" alt="avatar" id="avatar" width="150" height="150">
					<br>
					<span id="vcoin">{{ user.VCoins }} vCoins</span>
					<br>
					<span id="vaction">{{ user.VAction }} vActions</span>
				</div>
				<div class="col-md-6 form-group">
					<label for="displayedNameInput">Displayed name</label>
					<input type="text" v-model="user.DisplayedName" id="displayedNameInput" class="form-control" placeholder="Displayed name">

					<label for="locationInput">Location </label>
					<input type="text" v-model="user.Location" id="locationInput" class="form-control" placeholder="Location" >

					<label for="mottoInput">Motto</label>
					<input type="text" v-model="user.Motto"  id="mottoInput" class="form-control"placeholder="Motto" width="144">

					<br>

					<label class="radio-inline">
						<input type="radio" name="gender" v-model="user.Gender" value="man"> Man
					</label>
					<label class="radio-inline">
						<input type="radio" name="gender" v-model="user.Gender" value="woman"> Woman
					</label>
					<label class="radio-inline">
						<input type="radio" name="gender" v-model="user.Gender" value="other"> Other
					</label>
					<!-- TODO <input type="text" id="genderInput" v-model="user.Gender" placeholder="Specify"> Other -->
				</div>
			</div>
			<div class="row profileMain">
				<label for="descriptionInput">About me</label>
				<textarea name="description" v-model="user.Description" id="descriptionInput" class="form-control"></textarea>
			</div>
			<div class="row profileSocial">
				<h4>Socials links</h4>

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
				<h3>Private data</h3>

				<label for="realNameInput">Real name</label>
				<input type="text" v-model="user.RealName" id="realNameInput" class="form-control">

				<label for="emailInput">Email</label>
				<input type="email" v-model="user.Email" id="emailInput" class="form-control">

				<label for="phoneInput">Phone number</label>
				<input type="tel" v-model="user.Phone" id="phoneInput" class="form-control">

				<label for="birthdayInput">Birthday</label>
				<input type="date" v-model="user.Birthday" id="birthdayInput" class="form-control"> <!-- TODO js fall back -->
			</div>
			<div class="row">
				<button type="submit" class="btn btn-default" @click.prevent="save">Save</button>
			</div>
		</div>
	</div>
</template>

<script type="text/babel">

	import { usersApi } from '../../utils/resources';
	import { alert } from '../../vuex/actions';

	export default {
		data() {
			return {
				user: {}
			};
		},
		route: {
			data({ to: { params: { id } } }) {
				return usersApi.get({ id }).then(user => ({ user: user.json() }));
			}
		},
		vuex: {
			actions: {
				save({ dispatch }) {
					usersApi.update(this.user)
						.then(() => alert({ dispatch }, 'info', 'Profile updated'))
						.catch(response => {
							alert({ dispatch }, 'danger', 'Could not save profile');
							console.error(response);
						});
				}
			}
		}
	}
</script>

<style lang="scss">
	#avatar {
		border: 1px solid darkgrey;
	}

	input, textarea {
		margin-bottom: 15px!important;
	}

	.profileMain {
		margin-bottom: 20px;
	}

	#vaction, #vcoin {
		font-weight: bold;
	}

	hr {
		margin-top: 40px!important;
		margin-bottom: 40px!important;
	}
</style>