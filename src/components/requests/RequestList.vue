<template>
	<div>
		<div class="row request-list-header">
			<div class="col-md-5">
				<bs-search-bar :model.sync="searchInput" placeholder="Recherchez une requête"></bs-search-bar>
			</div>
			<div class="col-md-5">
				<div v-if="searchInput">
					{{ requests | filter | length }} résultats sur {{ requests.length }}
				</div>
			</div>
		</div>
		<div v-for="request in requests | filter">
			<div class="row request-row">
				<div class="col-sm-6">
					<div class="row request-title">
						<a v-link="'requests/view/' + request.ID" class="request-title">{{ request.Title }}</a>
					</div>
					<div class="row">
						<span v-for="tag in request.Tags" class="tag">{{ tag.Name }}</span>
					</div>
				</div>
				<div class="col-sm-4 request-date">
					asked {{ request.UpdatedAt | fromNow }} by <a v-link="'/users/profile/view/' + request.User.ID"> {{ request.User.DisplayedName }} </a>
				</div>
			</div>
		</div>
	</div>
</template>

<div class="row">
	<div class="col-md-12"><a v-link="'requests/add'">New request</a></div>
</div>

<script type="text/babel">
	import { requestsApi } from '../../utils/resources';
	import BsSearchBar from '../bootstrap/BsSearchBar.vue';

	export default {
		data() {
			return {
				requests: [],
				searchInput: ""
			};
		},
		route: {
			data() {
				return {
					requests: requestsApi.get().then(result => result.json())
				}
			}
		},
		components: {
			BsSearchBar
		},
		filters: {
			filter(requests) {
				return requests.filter(req => req.Title.indexOf(this.searchInput) !== -1 || req.Tags.some(tag => tag.Name.indexOf(this.searchInput) !== -1));
			},
			length(array) {
				return array.length;
			}
		},
	}
</script>

<style>
	.request-row {
		padding-top: 5px;
		padding-bottom: 15px;
		border-bottom: 1px solid #eff0f1;
	}
	.request-title {
		font-size: 15px;
		margin-top: 5px;
		margin-bottom: 5px;
	}
	.request-date {
		font-size: 12px;
	}
</style>
