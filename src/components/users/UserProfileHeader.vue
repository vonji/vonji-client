<template>
	<div class="row">
		<nav>
			<ul class="nav nav-tabs">
				<li role="presentation"><router-link :to="'/users/profile/view/' + user.ID">Profil</router-link></li>
				<li role="presentation"><router-link :to="'/users/profile/edit/' + user.ID">Modifier</router-link></li>
			</ul>
		</nav>
	</div>
</template>

<script>
	export default {
		props: {
			user: {
				type: Object,
				required: true
			}
		}
	}
</script>