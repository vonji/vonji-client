<template>
	<div>
		<h1>Bienvue sur Vonji</h1>
		<br>
		<div>{{ user.DisplayedName }}, nous créditons votre compte de 200 vCoins avec lesquels vous pourez échanger des services avec les autres utilisateurs de la plateforme.</div>
		<br>
		<a v-link="'/users/profile/edit/' + user.ID">Completer mon profil ></a>
	</div>
</template>

<script>
	import { usersApi } from '../../utils/resources';

	export default {
		data() {
			return {
				user: {}
			}
		},
		route: {
			data() {
				return {
					user: usersApi.get({ id: localStorage.userID }).then(user => user.json())
				}
			}
		},
	}
</script>