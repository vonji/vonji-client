<template>
	<div class="row">
		<nav>
			<ul class="nav nav-tabs">
				<li role="presentation"><a v-link="'/users/profile/view/' + user.ID">Profil</a></li>
				<li role="presentation"><a v-link="'/users/profile/edit/' + user.ID">Modifier</a></li>
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