<template>
	<div>
		<topbar></topbar>
		<div class="container">
			<div class="row">
				<div class="col-md-12">
					<alerts></alerts>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12">
					<ad></ad>
				</div>
			</div>
			<router-view></router-view>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import Topbar from './topbar/Topbar.vue'
	import Alerts from './Alerts.vue'
	import Ad from './ads/Ad.vue';

	export default {
		name: 'App',
		data() {
			return {
				test: {}
			};
		},
		components: {
			Topbar,
			Alerts,
			Ad
		}
	}
</script>