<template>
	<div class="col-md-4">
		<img :src="user.Avatar" alt="avatar" class="avatarBoxImage" width="150" height="150">
		<br>
		<span class="avatarBoxStats">{{ user.VCoins }} vCoins</span>
		<br>
		<span class="avatarBoxStats">{{ user.VAction }} vActions</span>
	</div>
</template>

<script type="text/babel">
	export default {
		props: {
			user: {
				type: Object,
				required: true
			}
		}
	}
</script>

<style lang="scss">
	.avatarBoxImage {
		border: 1px solid darkgrey;
	}
	.avatarBoxStats {
		font-weight: bold;
	}
</style>