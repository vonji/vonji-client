<template lang="html">
	<div class="row">
		<div class="col-md-8 col-md-offset-2">
			<request-edit-partial :request="request"></request-edit-partial>
		</div>
	</div>
</template>

<script type="text/babel">
	import { requestsApi } from '../../utils/resources';
	import RequestEditPartial from './RequestEditPartial.vue';

	export default {
		data() {
			return {
				request: {}
			};
		},
		events: {
			'on-save': function (request) {
				requestsApi.update({ id: this.request.ID }, request)
					.then(() => {
						this.$router.push('/requests/view/' + this.request.ID);
					});
			}
		},
		route: {
			data({ to: { params: { id } } }) {
				return requestsApi.get({ id })
					.then(fetchedRequest => ({ request: fetchedRequest.body }))
					.catch(console.error);
			}
		},
		components: {
			RequestEditPartial
		}
	}
</script>
