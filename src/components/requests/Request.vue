<template>
	<div class="row">
		<div class="col-md-12">
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
								<div class="col-md-2">
									<button class="btn btn-danger btn-sm" v-confirm :callback="deleteRequest" :params="request.ID">Delete</button>
								</div>
								<div class="col-md-10">
									<content-viewer
										:content="request"
										:edit-Link="`/requests/edit/${request.ID}`"
										@on-content-edit="requestContentChanged"
									></content-viewer>
								</div>
							</div>
						</div>
						<div class="col-md-12">
							<h4>{{ request.Responses.length }} Réponses</h4>
						</div>
						<div v-for="response in sortedResponses" class="col-md-12">
							<hr/>
							<div class="row">
								<div class="col-md-2">
									<div class="btn-group-vertical">
										<button type="button"
												class="btn btn-sm btn-{{ response.Accepted ? 'success' : 'default' }}"
												@click="toggleResponseAcceptance(response)">
											Accept
										</button>
										<button type="button" class="btn btn-sm btn-danger"
												@click="deleteResponse(response.ID)">
											Delete
										</button>
									</div>
								</div>
								<div class="col-md-10">
									<content-viewer
										:content="response"
										:edit-link="`/responses/edit/${response.ID}`"
										@on-content-edit="responseContentChanged"
									></content-viewer>
								</div>
							</div>
						</div>
						<div class="col-md-12">
							<h4>Your proposal</h4>
						</div>
						<div class="col-md-12">
							<hr/>
							<form @submit.prevent="submitResponse">
								<div class="form-group">
									<label for="#new-answer-description">Give a description of what you can do</label>
									<textarea
										id="new-answer-description"
										class="form-control"
										v-model="newResponse.Content"
										name="newResponse"
										rows="8"
										required
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
										required
									/>
								</div>
								<div class="form-group">
									<button type="submit" class="btn btn-primary">Répondre</button>
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

<script type="text/babel">
	import _ from 'lodash';
	import moment from 'moment';
	import BsPageHeader from '../bootstrap/BsPageHeader.vue';
	import ContentViewer from './ContentViewer.vue';
	import { requestsApi, responsesApi } from '../../utils/resources';

	export default {
		data() {
			return {
				request: {
					Responses: []
				},
				newResponse: {}
			};
		},
		route: {
			data({ to: { params: { id } } }) {
				return requestsApi.get({ id }).then(request => ({ request: request.json() }));
			}
		},
		computed: {
			sortedResponses() {
				return this.request.Responses.sort((a, b) => {
					if (a.Accepted)
						return -1;
					if (b.Accepted)
						return 1;
					if (moment(a.UpdatedAt).isSame(b.UpdatedAt, 'second'))
						return 0;
					return moment(a.UpdatedAt).isBefore(b.UpdatedAt, 'second') ? -1 : 1;
				});
			}
		},
		methods: {
			requestContentChanged(id, content) {
				requestsApi.update({ id }, _.assign({}, this.request, {
						Content: content
					}))
					.then(() => requestsApi.get({ id }))
					.then(newRequest => this.request = newRequest.json());
			},
			responseContentChanged(id, content) {
				const oldResponse = this.request.Responses.find(r => r.ID === id);
				responsesApi.update({ id }, _.assign({}, oldResponse, {
						Content: content
					}))
					.then(() => responsesApi.get({ id }))
					.then(newResponse => oldResponse.Content = newResponse.json().Content);
			},
			toggleResponseAcceptance(targetResponse) {
				const modifiedResponse = _.assign({}, targetResponse, {
					Accepted: !targetResponse.Accepted
				});
				responsesApi.update({ id: targetResponse.ID }, modifiedResponse)
					.then(() => {
						responsesApi.update({ id: this.sortedResponses[0].ID })
						.then(() => {
							let id = this.request.Responses.findIndex(e => e.ID == targetResponse.ID);
							this.request.Responses[id].Accepted = !this.request.Responses[id].Accepted;
							id = this.request.Responses.findIndex(e => e.Accepted && e.ID != targetResponse.ID);
							if (id < 0)
								return;
							this.request.Responses[id].Accepted = false;
						});
					})

			},
			submitResponse() {
				responsesApi.save({
						RequestID: this.request.ID,
						UserID: parseInt(localStorage.userID),
						Content: this.newResponse.Content,
						Value: parseInt(this.newResponse.Value)
					})
					.then(httpResponse => responsesApi.get({ id: httpResponse.json().ID }))
					.then(fetchedResource => {
						this.request.Responses.push(fetchedResource.json());
						this.newResponse = {};
					})
					.catch(err => {
						console.error(err);
					});
			},
			deleteRequest(id) {
				requestsApi.delete({ id }).then(() => this.$router.go('/requests'));
			},
			deleteResponse(id) {
				responsesApi.delete({ id }).then(() => this.request.Responses = this.request.Responses.filter(r => r.ID !== id));
			}
		},
		components: {
			BsPageHeader,
			ContentViewer
		}
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
