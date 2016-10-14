<template>
	<div class="col-md-4">
		<img :src="user.Avatar" alt="avatar" class="avatar-box-image" width="150" height="150">
		<br>
		<span class="avatar-box-stats">{{ user.VCoins }} vCoins</span>
		<br>
		<span class="avatar-box-stats">{{ user.VActions }} vActions</span>
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
	.avatar-box-image {
		border: 1px solid darkgrey;
	}
	.avatar-box-stats {
		font-weight: bold;
	}
</style>