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
				<div class="row">Member since {{ user.CreatedAt | fromNow }}</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-6">
				<h2>Tags</h2>
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
				<user-requests :requests="requests | pending" @edit="editRequest" @delete="deleteRequest"></user-requests>
			</div>
			<div class="col-md-6">
				<h2>Services à évaluer</h2>
				<user-request-edit v-if="selectedRequest" :request="selectedRequest" @save="saveRequest"></user-request-edit>
				<user-requests :requests="requests | accepted" @grade="gradeResponse" @edit="editRequest" @delete="deleteRequest"></user-requests>
			</div>
		</div>
		<div class="row">
			<div class="col-md-6">
				<h2>vActions</h2>
				<table class="table table-condensed table-striped">
					<tbody>
					<tr v-for="transaction in transactions | vActions | byCreation">
						<td>{{ transaction.CreatedAt | fromNow }}</td>
						<td>{{ transaction.Amount > 0 ? '+' : '-' }}{{ transaction.Amount }}</td>
						<td><a v-link="transaction.Source">{{ transaction.Reason }}</a></td>
					</tr>
					</tbody>
				</table>
			</div>
			<div class="col-md-6">
				<h2>vCoins</h2>
				<table class="table table-condensed table-striped">
					<tbody>
					<tr v-for="transaction in transactions | vCoins | byCreation">
						<td>{{ transaction.CreatedAt | fromNow }}</td>
						<td>{{ getTransactionAmount(transaction) }}</td>
						<td><a v-link="transaction.Source">{{ transaction.Reason }}</a></td>
					</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script type="text/babel">
	import moment from 'moment';
	import AvatarBox from './AvatarBox.vue';
	import UserProfileHeader from './UserProfileHeader.vue';
	import UserRequests from './UserRequests.vue';
	import UserRequestEdit from './UserRequestEdit.vue';
	import { usersApi, requestsApi, responsesApi, transactionsApi } from '../../utils/resources';
	import { achievementAward } from '../../vuex/actions';
	import { achievementList } from '../../vuex/getters';

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
		methods: {
			editRequest(request) {
				if (request.Status === 'pending') {
					this.$router.go('/requests/edit/' + request.ID);
					return;
				}
				this.selectedRequest = this.selectedRequest ? null : request;
			},
			saveRequest(request) {
				requestsApi.update(request)
					.then(() => {
						this.selectedRequest = null;
					})
				;
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
							this.user.Tags = this.user.Tags.concat(request.Tags);
							this.user.VCoins -= response.Value;
							usersApi.update(this.user);
						})
						.then(() => {
							response.User.VCoins += response.Value;
							usersApi.update(this.user);
						})
						.then(() => {
							transactionsApi.save({
								FromID: request.UserID,
								ToID: response.UserID,
								Type: 'VCOIN',
								Amount: response.Value,
								Reason: 'Request fullfiled',
								Source: '/requests/view/' + request.ID
							});
						})
						.then(() => {
							achievementAward({ dispatch }, this.achievementList[4], this.request.User)
						})
						.then(() => {
							this.request.Status = 'graded';
							requestsApi.update(request);
						})
						.catch(error => {
							console.log(error);
							response.Rating = 0;
						})
				},
				getters: {
					achievementList
				}
			}
		},
		filters: {
			vActions(transactions) {
				return transactions.filter(e => e.Type === 'VACTION')
			},
			vCoins(transactions) {
				return transactions.filter(e => e.Type === 'VCOIN')
			},
			pending(requests) {
				return requests.filter(req => !req.Responses.some(res => res.Accepted));
			},
			accepted(requests) {
				return requests.filter(req => req.Responses.some(res => res.Accepted && res.Rating === 0));
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