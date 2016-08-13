<template>
	<div>
		<div class="row">
			<div class="col-md-4">
				<img :src="user.Avatar" alt="avatar" id="avatar" width="150" height="150">
				<br>
				<span id="vcoin">{{ user.VCoins }} vCoins</span>
				<br>
				<span id="vaction">{{ user.VAction }} vActions</span>
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
				<div class="row">
					<h2>Tags</h2>
					<div v-for="tag in tags" class="tag">{{ tag.Name }}</div>
				</div>
			</div>
			<div class="col-md-6">
				<div class="row">
					<h2>Challenges</h2>
				</div>
			</div>
		</div>
		<div class="row">
			<h2>Requests</h2>
			<table class="table table-condensed table-striped">
				<tbody>
				<tr v-for="request in requests">
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
					<tr v-for="transaction in transactions | vActions | byDate">
						<td>{{ transaction.CreatedAt | fromNow }}</td>
						<td>{{ transaction.Amount > 0 ? '+' : '-' }}{{ transaction.Amount }}</td>
						<td>{{ transaction.Reason }}</td>
						<td><a v-link="transaction.Source">SOURCE</a></td>
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
					<tr v-for="transaction in transactions | vCoins | byDate">
						<td>{{ transaction.CreatedAt | fromNow }}</td>
						<td>{{ transaction.Amount > 0 ? '+' : '-' }}{{ transaction.Amount }}</td>
						<td>{{ transaction.Reason }}</td>
						<td><a v-link="transaction.Source">SOURCE</a></td>
					</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script type="text/babel">
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
			}
		},
		filters: {
			vActions(transactions) {
				return transactions.filter(e => e.Type === 'VACTION')
			},
			vCoins(transactions) {
				return transactions.filter(e => e.Type === 'VCOIN')
			},
			byDate(transactions) {
				return transactions.sort((a, b) => moment(a.UpdatedAt).isBefore(b.UpdatedAt, 'second') ? 1 : -1);
			}
		}
	}
</script>