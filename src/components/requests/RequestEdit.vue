<template lang="html">
	<div class="row">
		<div class="col-md-8 col-md-offset-2">
			<request-edit-partial :request="request"></request-edit-partial>
		</div>
	</div>
</template>

<script type="text/babel">
	import Resources from '../../utils/resources';
	import RequestEditPartial from './RequestEditPartial.vue';

	export default {
		data() {
			return {
				request: {}
			};
		},
		events: {
			'on-save': function (request) {
				Resources.request.put({
					data: JSON.stringify(request),
					redirect: '/requests/view/' + request.ID
				});
			}
		},
		route: {
			data({ to: { params: { id } } }) {
				Resources.request.get({ id: id })
			}
		},
		components: {
			RequestEditPartial
		}
	}
</script>
