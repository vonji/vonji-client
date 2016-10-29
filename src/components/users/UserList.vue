<template>
	<div>
		<bs-search-bar v-model="searchInput" placehold="Recherchez un membre">
			<div slot="search">{{ filteredUsers.length }} membres sur {{ users.length }}</div>
			<div>{{ filteredUsers.length }} membres sur {{ users.length }}</div>
		</bs-search-bar>
		<loading v-if="users.length == 0"></loading>
		<div class="row user-list-filters">
			<a class="user-list-filter" @click.prevent="this.timeFilter = 'day'">aujourd'hui</a> | <a class="user-list-filter" @click.prevent="this.timeFilter = 'week'">semaine</a> | <a class="user-list-filter" @click.prevent="this.timeFilter = 'month'">mois</a> | <a class="user-list-filter" @click.prevent="this.timeFilter = 'posix'">tout les temps</a>
		</div>
		<div class="row v-user-view">
			<div style="margin-bottom:1em;" class="col-md-3" v-for="user in filteredUsers">
				<div class="user-list-user media">
					<div class="media-left">
						<router-link to="/users/profile/view/' + user.ID">
							<img class="media-object" :src="user.Avatar ? user.Avatar : 'http://placehold.it/60x60'" width="60" height="60" alt="Avatar">
						</router-link>
					</div>
					<div class="media-body">
						<div class="v-user-heading">
							<div class="v-user-name"><router-link :to="'/users/profile/view/' + user.ID">{{ user.DisplayedName }}</router-link></div>
							<div class="v-user-reput">
								{{ user.VActions }} vActions
								<br>
								{{ user.VCoins }} vCoins
							</div>
						</div>
						<p>{{ user.Motto }}</p>
						<div class="v-user-date">membre depuis {{ user.CreatedAt | fromNow(true) }}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import BsSearchBar from '../bootstrap/BsSearchBar.vue';
	import Loading from '../Loading.vue';
	import { usersApi } from '../../utils/resources';
	import moment from 'moment';

	export default {
		data() {
			return {
				users: [],
				timeFilter: 'posix',
				searchInput: ''
			};
		},
		methods: {
			fetchData() {
				usersApi.get().then(response => { this.users = response.body });
			}
		},
		computed: {
			filteredUsers() {
				let filteredUsers = this.fuzzySearch(this.users, ['DisplayedName', 'Tags.Name'], this.searchInput);
				filteredUsers = this.since(filteredUsers, 1, this.timeFilter);
				return this.sortByCreation(filteredUsers);
			}
		},
		components: {
			BsSearchBar,
			Loading
		}
	}
</script>

<style lang="scss">
	.v-user-view {
		margin-top: 1.2em;
	}
	.v-user-heading {
		display: flex;
		flex-direction: row;
		align-items: baseline;
	}
	.v-user-name {
		font-size: 16px;
	}
	.v-user-reput {
		text-align: right;
		flex-grow: 1;
	}
	.v-user-date {
		font-size: 10px;
	}

	.user-list-filters {
		padding-top: 10px;
		padding-bottom: 10px;
		font-size: 14px;
	}
	.user-list-filter {
		cursor: pointer;
	}
	.user-list-user {
		min-height: 100px;
	}
</style>
