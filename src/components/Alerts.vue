<template>
	<div> <!-- single root level so the component is not a fragment -->
		<div
			v-for="alert in alerts"
			@click="alertDismiss($index)"
			class="alert alert-{{alert.type}}"
		>
			{{alert.message}}
		</div>
	</div>
</template>

<script type="text/babel">
import { alertDismiss } from '../vuex/actions'

export default {
	date() {
		return {
		}
	},
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
