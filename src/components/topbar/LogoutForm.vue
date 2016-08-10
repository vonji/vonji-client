<template>
	<div class="navbar-form">
		<button @click="logout()" class="btn btn-default">Logout</button>
	</div>
</template>

<script>
import * as actions from '../../vuex/actions';

export default {
	data() {
		return {};
	},
	vuex: {
		actions
	}
}
</script>
