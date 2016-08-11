<template>
	<!-- components does not works inside table -->
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
</template>

<script type="text/babel">
	import moment from 'moment';
	import { usersApi } from '../../utils/resources';


	export default {
		data() {
			return {
				user: {},
				transactions: []
			};
		},
		route: {
			data({ to: { params: { id } } }) {
				return {
					user: usersApi.get({ id }).then(response => response.json()),
					transactions: usersApi.getHistoric(id)
				};
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

<style lang="scss">
	h2 {
		text-align: center;
	}
</style>