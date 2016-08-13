<template>
	<div class="row">
		<nav>
			<ul class="nav nav-tabs">
				<li role="presentation"><a v-link="'/users/profile/view/' + user.ID">Profile</a></li>
				<li role="presentation"><a v-link="'/users/profile/edit/' + user.ID">Edit</a></li>
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