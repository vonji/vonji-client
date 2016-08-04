<template>
	<div>
		{{ comment.Content }} - <a v-link="'/users/profile/' + comment.User.ID">{{ comment.User.DisplayedName }}</a> {{ comment.UpdatedAt | fromNow }}
	</div>
</template>

<script type="text/babel">
	export default {
		props: ['comment'],
		data() {
			return {}
		}
	}
</script>