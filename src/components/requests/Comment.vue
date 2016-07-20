<template>
	<div>
		{{ comment.Content }} - {{ comment.User.FirstName }} {{ comment.User.LastName }} {{ comment.UpdatedAt | fromNow }}
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