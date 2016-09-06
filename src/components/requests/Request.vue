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
									<button v-if="isLogged" class="btn btn-danger btn-sm" @click="deleteRequest(request.ID)">Delete
									</button>
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
									<div v-if="isLogged">
										<div class="btn-group-vertical">
											<button type="button"
													class="btn btn-sm btn-{{ response.Accepted ? 'success' : 'default' }}"
													@click="toggleResponseAcceptance(response)">
												Accept
											</button>
											<button type="button" class="btn btn-sm btn-danger" @click="deleteResponse(response.ID)">
												Delete
											</button>
										</div>
										<div v-if="response.Accepted" class="rating-container">
											<form @submit.prevent="rate(response)" class="form-inline">
												<div class="form-group">
													<div class="input-group">
														<input type="number" v-model="response.Rating" min="1" max="5" value="3" class="form-control">
														<div class="input-group-addon rating-button-container"><button type="submit" class="btn rating-button">Rate</button></div>
													</div>
												</div>
											</form>
										</div>
									</div>
									<div v-else>
										<button v-if="response.Accepted" type="button"
												class="btn btn-sm btn-{{ response.Accepted ? 'success' : 'default' }}">
											Accepted
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
						<template v-if="isLogged">
							<div class="col-md-12">
								<h4>Your proposal</h4>
							</div>
							<div class="col-md-12">
								<hr/>
								<form @submit.prevent="submitResponse">
									<div class="form-group">
										<label for="new-answer-description">Give a description of what you can
											do</label>
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
										<label for="new-answer-vcoin">How many vCoin do you charge for this?</label>
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
						</template>
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

<script type="text/ecmascript-6">
	import _ from 'lodash';
	import moment from 'moment';
	import BsPageHeader from '../bootstrap/BsPageHeader.vue';
	import ContentViewer from './ContentViewer.vue';
	import { requestsApi, responsesApi, transactionsApi } from '../../utils/resources';
	import * as permissions from '../../utils/permissions';
	import { achievementList, isLogged } from '../../vuex/getters';
	import { achievementAward } from '../../vuex/actions';

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
						if (this.sortedResponses[0].ID !== targetResponse.ID) {
							responsesApi.update({ id: this.sortedResponses[0].ID }, this.sortedResponses[0]);
						}
					})
					.then(() => {
						transactionsApi.save({
								FromID: this.request.UserID,
								ToID: targetResponse.UserID,
								Amount: 15,
								Type: 'VACTION',
								Reason: 'Accepted response',
								Source: '/requests/view/' + this.request.ID
							})
						}
					)
					.then(() => {
						let id = this.request.Responses.findIndex(e => e.ID == targetResponse.ID);
						this.request.Responses[id].Accepted = !this.request.Responses[id].Accepted;
						id = this.request.Responses.findIndex(e => e.Accepted && e.ID != targetResponse.ID);
						if (id < 0)
							return;
						this.request.Responses[id].Accepted = false;
					})
				;

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
			},
		},
		vuex: {
			getters: {
				isLogged,
				achievementList
			},
			actions: {
				rate({ dispatch }, response) {
					response.Rating = Number(response.Rating);
					responsesApi.update({ id: response.ID }, response)
						.then(() => {
							const modifiedRequest = _.assign({}, this.request, {
								Archived: true
							});
							requestsApi.update({ id: this.request.ID }, modifiedRequest);
						})
						.then(() => {
							transactionsApi.save({
								FromID: this.request.UserID,
								ToID: response.UserID,
								Type: 'VCOIN',
								Amount: response.Value,
								Reason: 'Request fullfiled',
								Source: '/requests/view/' + this.request.ID
							});
						})
						.then(() => {
							achievementAward({ dispatch }, this.achievementList[4], this.request.User)
						})
						.then(() => {
							this.request.Archived = true;
						});
				}
			}
		},
		components: {
			BsPageHeader,
			ContentViewer,
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

	.rating-container {
		margin-top: 5px;
	}
	.rating-button {
		border: 0!important;
	}
	.rating-button-container {
		padding: 0!important;
	}
</style>
