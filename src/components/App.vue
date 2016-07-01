<template>
	<div class="container alert-container" style="z-index: 10">
		<alerts></alerts>
	</div>
	<div>
		<topbar></topbar>
		<div class="container">
			<router-view></router-view>
		</div>
	</div>
</template>

<script type="text/babel">
	import store from './../vuex/store';

	import Topbar from './topbar/Topbar.vue'
	import Alerts from './Alerts.vue'

	import * as actions from '../vuex/actions'

	export default {
		name: 'App',
		store: store,
		components: {
			Topbar,
			Alerts
		},
		actions//
	}
</script>
<style type="scss">
	.alert-container {
		position: fixed;
		top: 0;
	}
</style>