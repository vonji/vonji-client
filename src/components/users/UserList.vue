<template>
	<div class="row">
		<div class="col-md-12">
			<div class="row">
				<div class="col-md-12">
					<bs-page-header :title="users.length + ' users'"></bs-page-header>
				</div>
			</div>
			<div class="row user-list-filters">
				<a class="user-list-filter" @click.prevent="this.since = 'day'">today</a> | <a class="user-list-filter" @click.prevent="this.since = 'week'">week</a> | <a class="user-list-filter" @click.prevent="this.since = 'month'">month</a> | <a class="user-list-filter" @click.prevent="this.since = false">all</a>
			</div>
			<div class="row v-user-view">
				<div style="margin-bottom:1em;" class="col-md-3" v-for="user in users | filter | byCreation">
					<div class="media">
						<div class="media-left">
							<a v-link="'/users/profile/view/' + user.ID">
								<img class="media-object" :src="user.Avatar" width="60" height="60" alt="Avatar">
							</a>
						</div>
						<div class="media-body">
							<div class="v-user-heading">
								<div class="v-user-name"><a v-link="'/users/profile/view/' + user.ID">{{ user.DisplayedName }}</a></div>
								<div class="v-user-reput">
									{{ user.VAction }} VActions
									<!-- TODO cestmoche {{ user.VCoins }} VCoins -->
								</div>
							</div>
							<p>{{ user.Motto }}</p>
							<div class="v-user-date">member since {{ user.CreatedAt | fromNow true }}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/babel">
	import BsPageHeader from '../bootstrap/BsPageHeader.vue';
	import { usersApi } from '../../utils/resources';
	import moment from 'moment';

	export default {
		data() {
			return {
				users: [],
				since: false
			};
		},
		route: {
			data() {
				return {
					users: usersApi.get().then(users => users.json()),
				};
			},
		},
		components: {
			BsPageHeader
		},
		filters: {
			filter(users) {
				return !this.since ? users : users.filter(e =>
					moment(e.CreatedAt).isAfter(moment().subtract(1, this.since))
				);
			}
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
</style>
