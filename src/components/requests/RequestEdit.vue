<template lang="html">
	<div class="row">
		<div class="col-md-8 col-md-offset-2">
			<request-edit-partial @save="onSave" :request="request"></request-edit-partial>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import { requestsApi } from '../../utils/resources';
	import RequestEditPartial from './RequestEditPartial.vue';

	export default {
		data() {
			return {
				request: {}
			};
		},
		methods: {
			fetchData() {
				return requestsApi.get({ id: this.$route.params.id })
					.then(fetchedRequest => ({ request: fetchedRequest.body }))
					.catch(console.error);
			},
			onSave(request) {
				requestsApi.update({ id: this.request.ID }, request).then(() => { this.$router.push('/requests/view/' + this.request.ID) });
			}
		},
		components: {
			RequestEditPartial
		}
	}
</script>
