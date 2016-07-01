<template>
	<div class="row">
		<div class="row">
			<div class="col-md-12">
				<bs-page-header :title="request.Title"></bs-page-header>
			</div>
		</div>
		<div class="row">
			<div class="col-md-9">
				<div class="row">
					<div class="col-md-12">
						<content-viewer
							:content="request"
							:edit-link="`/requests/edit/${request.ID}`"
						></content-viewer>
					</div>
					<div class="col-md-12">
						<h4>{{ request.Responses.length }} Réponses</h4>
					</div>
					<div v-for="response in request.Responses" class="col-md-12">
						<hr />
						<content-viewer
							:content="response"
							:edit-link="`/responses/edit/${response.ID}`"
						></content-viewer>
					</div>
				</div>
			</div>
			<div class="col-md-3">
				<ul class="list-unstyled">
					<li><strong>asked</strong> {{ request.CreatedAt | fromNow }}</li>
					<li><strong>viewed</strong> {{ request.Views }} times</li>
					<li><strong>active</strong> {{ request.UpdatedAt | fromNow }}</li>
				</ul>
			</div>
		</div>
	</div>
</div>

</template>

<script>
import Resources from '../../utils/resources';
import BsPageHeader from '../bootstrap/BsPageHeader.vue';
import ContentViewer from './ContentViewer.vue';
export default {
	data() {
		return {
			request: {
				Responses: [],
			},
		};
	},
	route: {
		data({ to: { params: { id } } }) {
			return Resources.request.get({ id: id })
				.then(request => ({ request }));
		},
	},
	components: {
		BsPageHeader,
		ContentViewer,
	},
}
</script>

<style lang="scss">
dt {
	width: auto;
}

.v-response {
	margin-bottom: 2em;
	border-top: 1px solid #eeeeee;
}
</style>
