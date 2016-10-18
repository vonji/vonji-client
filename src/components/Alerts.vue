<template>
	<div>
		<div v-for="alert in alerts" @click="alertDismiss($index)" :class="'alert alert-' + alert.type">
			{{ alert.message }}
		</div>
	</div>
</template>

<script type="text/babel">
	import { alertDismiss } from '../vuex/actions'

	export default {
		vuex: {
			getters: {
				alerts: (state) => state.alerts
			},
			actions: {
				alertDismiss
			}
		}
	}
</script>

<style>
	.alert {
		position: fixed;
		right: 5px;
		min-width: 20%;
		text-align: center;
	}
</style>
