<template>
	<div>
		{{ comment.Content }} - <router-link :to="'/users/profile/view/' + comment.User.ID">{{ comment.User.DisplayedName }}</router-link> {{ comment.UpdatedAt | fromNow }}
	</div>
</template>

<script type="text/babel">
	export default {
		props: ['comment']
	}
</script>