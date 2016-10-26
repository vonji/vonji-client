<template lang="html">
	<div :class="'v-usercard' + primary ? 'v-uc-primary' : ''">
		<div class="v-uc-heading">
			<slot></slot>
		</div>
		<div class="v-uc-body">
			<div class="v-uc-left">
				<router-link :to="'/users/profile/view/' + user.ID">
					<img :src="user.Avatar" width="60" height="60">
				</router-link>
			</div>
			<div class="v-uc-right">
				<div><router-link :to="'/users/profile/view/' + user.ID">{{ user.DisplayedName }}</router-link></div>
				<div>{{ user.VCoins }} vCoins</div>
				<div>{{ user.VActions }} vActions</div>
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
