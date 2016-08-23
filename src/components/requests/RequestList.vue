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
		<div class="row" v-for="request in requests | filter">
			<div class="col-sm-6">
				<h3><a v-link="'requests/view/' + request.ID">{{ request.Title }}</a></h3>
			</div>
			<div class="col-sm-4">
				asked {{ request.UpdatedAt | fromNow }} by <a v-link="'/users/profile/view/' + request.User.ID"> {{ request.User.DisplayedName }} </a>
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
