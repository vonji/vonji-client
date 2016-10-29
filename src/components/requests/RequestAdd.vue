<template>
	<div class="row">
		<div class="col-md-8 col-md-offset-2">
			<request-edit-partial @save="onSave"></request-edit-partial>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import RequestEditPartial from './RequestEditPartial.vue';
	import TagsViewer from './TagsViewer.vue';
	import { requestsApi } from '../../utils/resources';

	export default {
		components: {
			RequestEditPartial,
			TagsViewer
		},
		methods: {
			onSave(request) {
				request.UserID = Number(localStorage.userID);
				requestsApi.save(request).then(response => this.$router.push('/requests/view/' + response.body.ID));
			}
		}
	}
</script>