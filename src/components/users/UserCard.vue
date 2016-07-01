<template lang="html">
	<div class="v-usercard {{ primary ? 'v-uc-primary' : ''}}">
		<div class="v-uc-heading">
			<slot></slot>
		</div>
		<div class="v-uc-body">
			<div class="v-uc-left">
				<img src="https://placekitten.com/32/32"></img>
			</div>
			<div class="v-uc-right">
				<div><a href="">{{ user.FirstName + " " + user.LastName }}</a></div>
				<div>{{ user.VReputation }} * 34 * 78 * 23</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		primary: Boolean,
		user: {
			type: Object,
			default: () => ({}),
		},
	},
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
