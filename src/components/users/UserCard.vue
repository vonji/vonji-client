<template lang="html">
	<div class="v-usercard {{ primary ? 'v-uc-primary' : ''}}">
		<div class="v-uc-heading">
			<slot></slot>
		</div>
		<div class="v-uc-body">
			<div class="v-uc-left">
				<a v-link="'/users/profile/' + user.ID">
					<img :src="user.Avatar" width="60" height="60">
				</a>
			</div>
			<div class="v-uc-right">
				<div><a v-link="'users/profile/' + user.ID">{{ user.DisplayedName }}</a></div>
				<div>{{ user.VCoins }} vCoins</div>
				<div>{{ user.VAction }} vActions</div>
			</div>
		</div>
	</div>
</template>

<script type="text/babel">
	export default {
		props: {
			primary: Boolean,
			user: {
				type: Object,
				default: () => ({})
			}
		}
	}
</script>

<style lang="scss">
	.v-usercard {
		width: 14em;
		padding: 0.5em;
		&.v-uc-primary {
			background-color: lighten(desaturate(blue, 34), 46);
		}
		.v-uc-body {
			display:flex;
			margin-top: 0.3em;
			.v-uc-left {
				margin-right: 0.5em;
			}
		}
		font-size: 0.84em;
		display: flex;
		flex-direction: column;
	}
</style>
