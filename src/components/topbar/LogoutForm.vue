<template>
	<div class="navbar-form">
		<button @click="logout()" class="btn btn-default">Se deconnecter</button>
	</div>
</template>

<script>
	import { mapMutations } from 'vuex';
	import * as M from '../../vuex/mutationTypes';

	export default {
		methods: {
			...mapMutations([M.LOGOUT])
		}
	}
</script>
