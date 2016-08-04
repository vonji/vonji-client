<template>
	<div class="user-info">
		<slot></slot>
		<img :src="user.Avatar" alt="avatar" width="60" height="60">
		{{ user.DisplayedName }}
	</div>
</template>

<script>
	export default {
		data() {
			return {}
		},
		props: ['user', 'content-date']
	}
</script>

<style>
	.user-info {
		background-color: blanchedalmond;
		height: 100px;
	}
</style>