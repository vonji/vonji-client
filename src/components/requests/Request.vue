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
						<div class="row">
							<div class="col-md-1">
								<button class="btn btn-danger btn-sm" @click="deleteRequest(request.ID)">Delete</button>
							</div>
							<div class="col-md-11">
								<content-viewer
									:content="request"
									:edit-link="`/requests/edit/${request.ID}`"
								></content-viewer>
							</div>
						</div>
					</div>
					<div class="col-md-12">
						<h4>{{ request.Responses.length }} Réponses</h4>
					</div>
					<div v-for="response in request.Responses" class="col-md-12">
						<hr />
						<div class="row">
							<div class="col-md-1">
								<div class="btn-group-vertical">
									<button type="button" class="btn btn-sm btn-{{ response.Accepted ? 'success' : 'default' }}" @click="toggleResponseAcceptance(response)">
										Accept
									</button>
									<button type="button" class="btn btn-sm btn-danger" @click="deleteResponse(response.ID)">
										Delete
									</button>
								</div>
							</div>
							<div class="col-md-11">
								<content-viewer
									:content="response"
									:edit-link="`/responses/edit/${response.ID}`"
								></content-viewer>
							</div>
						</div>
					</div>
					<div class="col-md-12">
						<h4>Your proposal</h4>
					</div>
					<div class="col-md-12">
						<hr />
						<form v-on:submit.prevent="submitResponse">
							<div class="form-group">
								<label for="#new-answer-description">Give a description of what you can do</label>
								<textarea
									id="new-answer-description"
									class="form-control"
									v-model="newResponse.Content"
									name="newResponse"
									rows="8"
								></textarea>
							</div>
							<div class="form-group">
								<label for="#new-answer-vcoin">How many vCoin do you charge for this?</label>
								<input
									id="new-answer-vcoin"
									v-model="newResponse.Value"
									class="form-control"
									type="number"
									min="0"
								/>
							</div>
							<div class="form-group">
								<button class="btn btn-primary">Répondre</button>
							</div>
						</form>
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
import BsPageHeader from '../bootstrap/BsPageHeader.vue';
import ContentViewer from './ContentViewer.vue';
import _ from 'lodash';
import {
	requestsApi,
	responsesApi,
} from '../../utils/resources';

export default {
	data() {
		return {
			request: {
				Responses: [],
			},
			newResponse: {},
		};
	},
	route: {
		data({ to: { params: { id } } }) {
			return requestsApi.get({ id }).then(request => ({ request: request.json() }));
		},
	},
	methods: {
		toggleResponseAcceptance(targetResponse) {
			// I create a new copy of the given response and I merge it
			// with an object which has a different value for the key Accepted.
			const modifiedResponse = _.assign({}, targetResponse, {
				Accepted: !targetResponse.Accepted,
			});
			// I don't want to modify the value of the acceptance if the server says no.
			responsesApi.update({ id: targetResponse.ID }, modifiedResponse)
			// When the server do the modification I replace the old response by the new.
			.then(res => {
				this.request.Responses = this.request.Responses.map(currentResponse => {
					if (currentResponse.ID === targetResponse.ID) {
						return modifiedResponse;
					}
					return currentResponse;
				})
			});
		},
		submitResponse() {
			// Here I don't need to parse the JSON because VueResource does it for me.
			responsesApi.save({
				RequestID: this.request.ID,
				UserID: parseInt(localStorage.userID),
				Content: this.newResponse.Content,
				Value: parseInt(this.newResponse.Value),
			})
			// I Changed the server so it send me back the ID of the just created resource.
			// This response is a VueResource response and it allows me to call .json() which
			// turns the body directly into its JSON equivalent. Then I send a HTTP GET with the
			// new response's ID and I return the result which is a Promise which allow me to
			// chain 'then' calls see how Promise works for more info.
			.then(httpResponse => responsesApi.get({ id: httpResponse.text() }))
			// Then when I fetched back my new resource I push it into the data array.
			// Doing this allows me to refresh the responses list without reloading the page.
			.then(fetchedResource => {
				this.request.Responses.push(fetchedResource.json());
				// I reset the form, you don't want to answer twice the same thing.
				this.newResponse = {};
			})
			// Or else I display an error.
			.catch(err => {
				console.error(err);
			});
		},
		deleteRequest(id) {
			requestsApi.delete({ id })
			.then(() => this.$router.go('/requests'));
		},
		deleteResponse(id) {
			responsesApi.delete({ id })
			.then(() => this.request.Responses = this.request.Responses.filter(r => r.ID !== id));
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

textarea {
	resize: horizontal;
}

.v-response {
	margin-bottom: 2em;
	border-top: 1px solid #eeeeee;
}
</style>
