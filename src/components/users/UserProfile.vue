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
				<div v-for="tag in tags" class="tag">{{ tag.Name }}</div>
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
				<user-requests :requests="requests | pending" @delete="deleteRequest"></user-requests>
			</div>
			<div class="col-md-6">
				<h2>Services à évaluer</h2>
				<user-requests :requests="requests | accepted" @grade="gradeResponse"  @delete="deleteRequest"></user-requests>
			</div>
		</div>
		<div class="row">
			<div class="col-md-6">
				<h2>vActions</h2>
				<table class="table table-condensed table-striped">
					<thead>
					<tr>
						<th></th>
					</tr>
					</thead>
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
					<thead>
					<tr>
						<th></th>
					</tr>
					</thead>
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
	import AvatarBox from './AvatarBox.vue';
	import UserProfileHeader from './UserProfileHeader.vue';
	import UserRequests from './UserRequests.vue';
	import moment from 'moment';
	import { usersApi, requestsApi, responsesApi } from '../../utils/resources';

	export default {
		data() {
			return {
				user: {},
				tags: [],
				requests: [],
				transactions: []
			}
		},
		route: {
			data({ to: { params: { id } } }) {
				return {
					user: usersApi.get({ id }).then(user => user.json()),
					tags: usersApi.getTags(id),
					requests: usersApi.getRequests(id),
					transactions: usersApi.getHistoric(id)
				}
			}
		},
		methods: {
			gradeResponse(response, grade) {
				response.Rating = grade;
				responsesApi.update(response).catch(error => {
					console.log(error);
					response.Rating = 0;
				})
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
			UserRequests
		}
	}
</script>