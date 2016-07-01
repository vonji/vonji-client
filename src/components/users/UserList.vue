<template>
	<div class="row">
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
			<div class="col-md-3" v-for="user in users">
				<div class="media">
					<div class="media-left">
						<a href="#">
							<img class="media-object" src="https://placekitten.com/60/60" alt="Avatar">
						</a>
					</div>
					<div class="media-body">
						<div class="v-user-heading">
							<div class="v-user-name">{{ user.FirstName }} {{ user.LastName }}</div>
							<div class="v-user-reput">{{ user.VReputation || 0 }} VR</div>
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
</template>

<script type="text/babel">
	import Resources from '../../utils/resources';
	import BsPageHeader from '../bootstrap/BsPageHeader.vue';

	export default {
		data() {
			return {
				users: []
			};
		},
		components: {
			BsPageHeader
		},
		route: {
			data() {
				return {
					users: Resources.user.get()
				}
			}
		}
	}
</script>

<style>
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
