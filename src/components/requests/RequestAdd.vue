<template>
	<div class="row">
		<div class="col-md-8 col-md-offset-2">
			<request-edit-partial></request-edit-partial>
		</div>
	</div>
</template>

<script type="text/babel">
	import RequestEditPartial from './RequestEditPartial.vue';
	import { requestsApi } from '../../utils/resources';

	export default {
		components: {
			RequestEditPartial
		},
		events: {
			'on-save': function (request) {
				requestsApi.save({
						Title: request.Title,
						Content: request.Content,
						UserID: Number(localStorage.userID)
					})
					.then((obj) => obj)
					.then(() => this.$router.go('/requests'))
					.catch(console.error);
			}
		}
	}
</script>
