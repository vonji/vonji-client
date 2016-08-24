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
			</div>
		</div>
		<div>
			<h2>Requests</h2>
			<table class="table table-condensed table-striped">
				<tbody>
				<tr v-for="request in requests | byCreation">
					<td>{{ request.CreatedAt | fromNow }}</td>
					<td>{{ request.Title }}</td>
					<td>{{ request.Views }} views {{ request.Responses.length}} responses</td>
					<td>
						<a v-link="'/requests/edit/' + request.ID">edit</a>
						<a v-if="canDelete(request)" @click.prevent="deleteRequest(request.ID)" href="#">delete</a>
					</td>
				</tr>
				</tbody>
			</table>
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
	import moment from 'moment';
	import { usersApi } from '../../utils/resources'; import { requestsApi } from "../../utils/resources";

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
			canDelete(request) {
				return request.Responses.length === 0;
			},
			deleteRequest(id) {
				requestsApi.delete({ id })
					.then(() => this.requests = this.requests.filter(e => e.ID == id))
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
			}
		},
		components: {
			AvatarBox,
			UserProfileHeader
		}
	}
</script>