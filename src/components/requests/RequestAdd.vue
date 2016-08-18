<template>
	<div class="row">
		<div class="col-md-8 col-md-offset-2">
			<request-edit-partial></request-edit-partial>
		</div>
	</div>
</template>

<script type="text/babel">
	import RequestEditPartial from './RequestEditPartial.vue';
	import TagsViewer from './TagsViewer.vue';
	import { requestsApi } from '../../utils/resources';

	export default {
		components: {
			RequestEditPartial,
			TagsViewer
		},
		events: {
			'on-save': function (request) {
				request.UserID = Number(localStorage.userID);
				requestsApi.save(request)
					.then((obj) => obj)//???
					.then(() => this.$router.go('/requests'))
					.catch(console.error);
			}
		}
	}
</script>