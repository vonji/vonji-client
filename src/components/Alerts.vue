<template>
	<div>
		<div v-for="(alert, index) in alerts" @click="alertDismiss(index)" :class="'alert alert-' + alert.type">
			{{ alert.message }}
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import { mapMutations } from 'vuex'
	import * as M from '../vuex/mutationTypes';

	export default {
		computed: {
			alerts() { return this.$store.state.alerts; }
		},
		methods: {
			...mapMutations([M.ALERT_DISMISS])
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
