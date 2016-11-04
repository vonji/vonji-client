<template>
	<div>
		<div v-for="request in nearRequests" class="row">
			<div class="col-md-5">
				<h4>{{ request.Title }}</h4>
			</div>
			<div class="col-md-5">
				<i class="request-near-stats">{{ request.Views }} vues</i><br>
				<i class="request-near-stats">{{ request.Responses.length }} réponses</i><br>
				<i class="request-near-stats">{{ comments(request) }} commentaires</i><br>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import { mapGetters } from 'vuex';

	export default {
		props: {
			requests: {
				required: true,
				type: Array
			}
		},
		computed: {
			nearRequests() {
				return this.requests.filter(e => e.Location === this.currentUser.Location);
			},
			...mapGetters(['currentUser'])
		},
		methods: {
			comments(request) {
				let res = request.Comments.length;

				request.Responses.forEach((e) => { res += e.Comments.length });

				return res;
			}
		}
	}
</script>

<style>
	.request-near-stats {


	}
</style>