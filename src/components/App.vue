<template>
	<div>
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
	</div>
</template>

<script type="text/ecmascript-6">
	import store from './../vuex/store';

	import Topbar from './topbar/Topbar.vue'
	import Alerts from './Alerts.vue'
	import Ad from './ads/Ad.vue';

	import * as actions from '../vuex/actions'

	import { achievementsApi, usersApi } from '../utils/resources';

	export default {
		name: 'App',
		store: store,
		components: {
			Topbar,
			Alerts,
			Ad
		},
		actions,
	}
</script>
