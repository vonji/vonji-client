<template>
	<div class="row">
		<div class="col-md-12">
			<div class="row">
				<div class="col-md-12">
					<bs-page-header title="Users"></bs-page-header>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12">
					<ul class="nav nav-tabs">
						<li class="active"><a>Réputation</a></li>
						<li><a>New users</a></li>
						<li><a>Voters</a></li>
						<li><a>Editors</a></li>
						<li><a>Moderators</a></li>
					</ul>
				</div>
			</div>
			<div class="row v-user-view">
				<div style="margin-bottom:1em;" class="col-md-3" v-for="user in sortedUsers">
					<div class="media">
						<div class="media-left">
							<a v-link="'/users/profile/' + user.ID">
								<img class="media-object" :src="user.Avatar" width="60" height="60" alt="Avatar">
							</a>
						</div>
						<div class="media-body">
							<div class="v-user-heading">
								<div class="v-user-name"><a v-link="'/users/profile/' + user.ID">{{ user.DisplayedName }}</a></div>
								<div class="v-user-reput">
									{{ user.VAction }} VActions
									<!-- TODO cestmoche {{ user.VCoins }} VCoins -->
								</div>
							</div>
							<p>{{ user.Description }}</p>
							<div></div>
							<div>
								<div v-for="tag in user.Tags" class="label label-default">{{ tag.Name }}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/babel">
	import {
		usersApi,
	} from '../../utils/resources';
	import BsPageHeader from '../bootstrap/BsPageHeader.vue';

	export default {
		data() {
			return {
				users: []
			};
		},
		computed: {
			sortedUsers: function () {
				return this.users.sort((a, b) => {
					if (a.VReputation > b.VReputation)
						return -1;
					if (a.VReputation === b.VReputation)
						return 0;
					return 1;
				})
			}
		},
		components: {
			BsPageHeader
		},
		route: {
			data() {
				return {
					users: usersApi.get().then(users => users.json()),
				};
			},
		},
	}
</script>

<style lang="scss">
	.v-user-box {
		margin-top: 1em;
	}

	.v-user-view {
		margin-top: 1.2em;
	}

	.v-user-heading {
		display: flex;
		flex-direction: row;
		align-items: baseline;
	}

	.v-user-name {
		font-size: 1.3em;
		font-weight: strong;
		flex-grow: 4;
	}

	.v-user-reput {
		text-align: right;
		flex-grow: 1;
	}
</style>
