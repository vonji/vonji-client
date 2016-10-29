<template>
	<div>
		<bs-search-bar v-model="searchInput" placeholder="Recherchez une requête">
			<div slot="search">{{ searchResults.length }} résultats sur {{ filteredRequests.length }}</div>
			<div>{{ filteredRequests.length }} requêtes</div>
		</bs-search-bar>
		<div class="row">
			<div class="col-md-9">
				<loading v-if="requests.length == 0"></loading>
				<div v-for="request in searchResults">
					<div class="row request-row">
						<div class="col-sm-5">
							<div class="row request-title">
								<router-link :to="'/requests/view/' + request.ID" class="request-title">{{ request.Title }}</router-link>
							</div>
							<div class="row">
								<span v-for="tag in request.Tags" class="tag">{{ tag.Name }}</span>
							</div>
						</div>
						<div class="col-sm-4 request-date">
							postée {{ request.UpdatedAt | fromNow }} par <router-link :to="'/users/profile/view/' + request.User.ID"> {{ request.User.DisplayedName }} </router-link>
						</div>
						<div class="col-sm-3">
							<user-card :user="request.User" :primary="true"></user-card>
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-3 hidden-xs">
				<request-near :requests="requests"></request-near>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import BsSearchBar from '../bootstrap/BsSearchBar.vue';
	import Loading from '../Loading.vue';
	import RequestNear from './RequestNear.vue';
	import UserCard from '../users/UserCard.vue';
	import { requestsApi } from '../../utils/resources';
	import { currentUser } from '../../vuex/getters';

	export default {
		data() {
			return {
				requests: [],
				searchInput: ""
			};
		},
		methods: {
			fetchData() {
				requestsApi.get().then(response => { this.requests = response.body });
			},
		},
		computed: {
			filteredRequests() {
				return this.requests
					.filter(req => req.Status === 'pending')
					.filter(req => req.UserID !== currentUser(this.$store.state).ID);
			},
			searchResults() {
				let reqs = this.fuzzySearch(this.filteredRequests, ['Title', 'Tags.Name'], this.searchInput);
				return this.sortByUpdate(reqs);
			}
		},
		getters: {
			currentUser
		},
		components: {
			BsSearchBar,
			Loading,
			RequestNear,
			UserCard
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
