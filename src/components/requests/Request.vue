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
					<div>
						<div class="row">
							<div class="col-md-2">
								<button v-if="false" class="btn btn-danger btn-sm" @click="deleteRequest(request.ID)">Supprimer
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
						<div class="row">
							Durée: {{ request.Duration / 3600 }} heures<br><!-- todo -->
							{{ request.Frequency }} fois par {{ request.FrequencyUnit }}<br>
							Entre le {{ request.PeriodStart }} et le {{ request.PeriodEnd }}<br>
						</div>
					</div>
					<div>
						<h4>{{ request.Responses.length }} réponses</h4>
					</div>
					<div v-for="response in sortedResponses">
						<hr/>
						<div class="row">
							<div class="col-md-2">
								<div v-if="isLogged">
									<div class="btn-group-vertical">
										<button type="button"
												class="btn btn-sm btn-{{ response.Accepted ? 'success' : 'default' }}"
												@click="toggleResponseAcceptance(response)">
											Accepter
										</button>
										<button v-if="false" type="button" class="btn btn-sm btn-danger" @click="deleteResponse(response.ID)">
											Supprimer
										</button>
									</div>
								</div>
								<div v-else>
									<button v-if="response.Accepted" type="button"
											class="btn btn-sm btn-{{ response.Accepted ? 'success' : 'default' }}">
										Acceptée
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
						<div>
							<h4>Votre proposition</h4>
						</div>
						<div>
							<hr/>
							<form @submit.prevent="submitResponse">
								<div class="form-group">
									<label for="new-answer-description">Décrivez ce que vous pouvez faire</label>
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
									<label for="new-answer-vcoin">Combien de vCoins voulez-vous en échange de ce service ?</label>
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
				<div class="col-md-3">
					<ul class="list-unstyled">
						<li><strong>demandé</strong> {{ request.CreatedAt | fromNow }}</li>
						<li><strong>vues</strong> {{ request.Views }} fois</li>
						<li><strong>active</strong> {{ request.UpdatedAt | fromNow }}</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import moment from 'moment';
	import BsPageHeader from '../bootstrap/BsPageHeader.vue';
	import ContentViewer from './ContentViewer.vue';
	import { requestsApi, responsesApi, transactionsApi, notificationsApi, usersApi } from '../../utils/resources';
	import { achievementList, isLogged, currentUser } from '../../vuex/getters';
	import { achievementAward, userUpdate } from '../../vuex/actions';

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
				return {
					request: requestsApi.get({ id }).then(response => response.body)
				};
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
					.then(newRequest => this.request = newRequest.body);
			},
			responseContentChanged(id, content) {
				const oldResponse = this.request.Responses.find(r => r.ID === id);
				responsesApi.update({ id }, _.assign({}, oldResponse, {
					Content: content
				}))
					.then(() => responsesApi.get({ id }))
					.then(newResponse => oldResponse.Content = newResponse.body.Content);
			},
			toggleResponseAcceptance(response) {
				response.Accepted = !response.Accepted;
				responsesApi.update(response)
					.then(() => {
						if (this.sortedResponses[0].ID !== response.ID) {
							this.sortedResponses[0].Accepted = false;
							responsesApi.update(this.sortedResponses[0]);
						}
					})
					.then(() => {
						this.request.Status = response.Accepted ? 'accepted' : 'pending';
						requestsApi.update(this.request);
					})
					.then(() => {
						if (response.Accepted) {
							transactionsApi.save({
								FromID: this.request.UserID,
								ToID: response.UserID,
								Amount: 15,
								Type: 'VACTION',
								Reason: 'Vous avez accepté une réponse',
								Source: '/requests/view/' + this.request.ID
							})
							.then(() => {
								usersApi.get({ id: this.request.UserID }).then(res => { this.request.User = res.body; });
								usersApi.get({ id: response.UserID }).then(res => { response.User = res.body });
							});
						}
					})
					.then(() => {
						if (response.Accepted) {
							notificationsApi.save({
								UserID: response.UserID,
								Title: 'Votre réponse à été acceptée',
								Message: this.request.Title,
							});
						}
					})
					.catch(error => {
						console.error(error);
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
					.then(httpResponse => responsesApi.get({ id: httpResponse.body.ID }))
					.then(fetchedResource => {
						this.request.Responses.push(fetchedResource.body);
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
