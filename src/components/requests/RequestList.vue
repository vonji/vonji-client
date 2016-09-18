<template>
	<div>
		<bs-search-bar :input.sync="searchInput" placeholder="Recherchez une requête">
			<slot slot="search">{{ requests | pending | search | length }} résultats sur {{ requests | pending | length }}</slot>
			<slot>{{ requests | pending | length }} requêtes</slot>
		</bs-search-bar>
		<loading v-if="requests.length == 0"></loading>
		<div v-for="request in requests | pending | search | byUpdate">
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
					postée {{ request.UpdatedAt | fromNow }} par <a v-link="'/users/profile/view/' + request.User.ID"> {{ request.User.DisplayedName }} </a>
				</div>
				<div class="col-sm-2">
					<a v-link="'/users/profile/view/' + request.User.ID"><img :src="request.User.Avatar" alt="user Avatar" width="40" height="40"></a>
				</div>
			</div>
		</div>
	</div>
</template>

<div class="row">
	<div class="col-md-12"><a v-link="'requests/add'">Nouvelle requête</a></div>
</div>

<script type="text/ecmascript-6">
	import { requestsApi } from '../../utils/resources';
	import BsSearchBar from '../bootstrap/BsSearchBar.vue';
	import Loading from '../Loading.vue';

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
					requests: requestsApi.Light()
				}
			}
		},
		components: {
			BsSearchBar,
			Loading
		},
		filters: {
			search(requests) {
				return this.fuzzySearch(requests, ['Title', 'Tags.Name'], this.searchInput);
			},
			pending(requests) {
				return requests.filter(req => req.Status === 'pending')
			}
		}
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
