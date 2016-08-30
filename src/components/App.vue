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
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import store from './../vuex/store';

	import Topbar from './topbar/Topbar.vue'
	import Alerts from './Alerts.vue'

	import * as actions from '../vuex/actions'

	import { usersApi } from '../utils/resources';

	export default {
		name: 'App',
		store: store,
		components: {
			Topbar,
			Alerts
		},
		actions,
		ready() {
			if (localStorage.userID) {
				usersApi.get({ id: localStorage.userID }).then(response => {
					actions.userUpdate(this.$store, response.json());
				});
			}
		}
	}
</script>
