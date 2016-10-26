<template>
	<div>
		<user-profile-header :user="user"></user-profile-header>
		<div class="row">
			<div class="col-md-4">
				<avatar-box :user="user"></avatar-box>
			</div>
			<div class="col-md-5">
				<div class="row">{{ user.DisplayedName }}</div>
				<div class="row">{{ user.Location }}</div>
				<div class="row">{{ user.Motto }}</div>
			</div>
			<div class="col-md-3">
				<div class="row">Membre depuis {{ user.CreatedAt | fromNow }}</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-6">
				<h2>Compétences</h2>
				<div v-for="tag in user.Tags" class="tag">{{ tag.Name }}</div>
			</div>
			<div class="col-md-6">
				<h2>Challenges</h2>
				<div v-for="achievement in user.Achievements">
					{{ achievement.Name }} ({{ achievement.Award }} vAction)
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-6">
				<h2>Services en attentes</h2>
				<user-requests :requests="pendingRequests" @edit="editRequest" @delete="deleteRequest"></user-requests>
			</div>
			<div class="col-md-6">
				<h2>Services à évaluer</h2>
				<user-request-edit v-if="selectedRequest" :request="selectedRequest" @save="saveRequest"></user-request-edit>
				<user-requests :requests="acceptedRequests" @grade="gradeResponse" @edit="editRequest" @delete="deleteRequest"></user-requests>
			</div>
		</div>
		<div class="row">
			<div class="col-md-6">
				<h2>vActions</h2>
				<table class="table table-condensed table-striped">
					<tbody>
					<tr v-for="transaction in vActionsTransactions">
						<td>{{ transaction.CreatedAt | fromNow }}</td>
						<td>{{ transaction.Amount > 0 ? '+' : '-' }}{{ transaction.Amount }}</td>
						<td><router-link :to="transaction.Source">{{ transaction.Reason }}</router-link></td>
					</tr>
					</tbody>
				</table>
			</div>
			<div class="col-md-6">
				<h2>vCoins</h2>
				<table class="table table-condensed table-striped">
					<tbody>
					<tr v-for="transaction in vCoinsTransactions">
						<td>{{ transaction.CreatedAt | fromNow }}</td>
						<td>{{ getTransactionAmount(transaction) }}</td>
						<td><router-link :to="transaction.Source">{{ transaction.Reason }}</router-link></td>
					</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import moment from 'moment';
	import AvatarBox from './AvatarBox.vue';
	import UserProfileHeader from './UserProfileHeader.vue';
	import UserRequests from './UserRequests.vue';
	import UserRequestEdit from './UserRequestEdit.vue';
	import { usersApi, requestsApi, responsesApi, transactionsApi } from '../../utils/resources';
	import { achievementAward } from '../../vuex/actions';
	import { achievementList, userUpdate } from '../../vuex/actions';

	export default {
		data() {
			return {
				user: {},
				requests: [],
				transactions: [],
				selectedRequest: null
			}
		},
		route: {
			data({ to: { params: { id } } }) {
				return {
					user: usersApi.get({ id }).then(response => response.body),
					requests: usersApi.getRequests(id),
					transactions: usersApi.getHistoric(id)
				}
			}
		},
		computed: {
			vActionsTransactions() {
				let t = this.transactions.filter(e => e.Type === 'VACTION');
				return this.sortByCreation(t);
			},
			vCoinsTransactions() {
				let t = this.transactions.filter(e => e.Type === 'COIN');
				return this.sortByCreation(t);
			},
			pendingRequests() {
				return this.requests.filter(req => req.Status === 'pending');
			},
			acceptedRequests() {
				return this.requests.filter(req => req.Status === 'accepted');
			}
		},
		methods: {
			editRequest(request) {
				if (request.Status === 'pending') {
					this.$router.push('/requests/edit/' + request.ID);
					return;
				}
				this.selectedRequest = this.selectedRequest ? null : request;
			},
			saveRequest(request) {
				requestsApi.update(request).then(() => { this.selectedRequest = null; });
			},
			deleteRequest(request) {
				requestsApi.delete({ id: request.ID }).then(() => {
					this.requests = this.requests.filter(e => e.ID == request.ID)
				});
			},
			getTransactionAmount(transaction) {
				let res = transaction.FromID === this.user.ID ? transaction.Amount * -1 : transaction.Amount;
				return res > 0 ? '+' + res : res;
			}
		},
		vuex: {
			actions: {
				gradeResponse({ dispatch }, response, grade) {
					let request = this.requests.find(e => e.ID == response.RequestID);
					response.Rating = grade;
					responsesApi.update(response)
						.then(() => {
							request.Status = 'graded';
							requestsApi.update(request);
						})
						.then(() => {
							this.user.Tags = this.user.Tags.concat(request.Tags);
							usersApi.update(this.user);
						})
						.then(() => {
							achievementAward({ dispatch }, this.$store.state.achievementList[4], this.user);//TODO use getter for achievementList
						})
						.then(() => {
							transactionsApi.save({
								FromID: request.UserID,
								ToID: response.UserID,
								Type: 'VCOIN',
								Amount: response.Value,
								Reason: 'Request fullfiled',
								Source: '/requests/view/' + request.ID
							})
							.then(() => {
								usersApi.get({ id: this.user.ID }).then(res => {
									this.user = res.body;
									userUpdate({ dispatch }, this.user);
								})
							});
						})
				},
				getters: {
					achievementList
				}
			}
		},
		components: {
			AvatarBox,
			UserProfileHeader,
			UserRequests,
			UserRequestEdit
		}
	}
</script>