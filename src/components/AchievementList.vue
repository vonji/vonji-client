<template>
	<div>
		<div v-for="achievement in achievements" class="row achievement-row">
			<div class="col-md-2"><span v-if="has(achievement)" class="glyphicon glyphicon-ok"></span></div>
			<div class="col-md-3"><button class="btn" style="cursor: default">{{ achievement.Name }}</button></div>
			<div class="col-md-4">{{ achievement.Description }}</div>
			<div class="col-md-2">{{ achievement.Award }} vAct</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">

	import { achievementsApi, usersApi } from '../utils/resources';

	export default {
		data() {
			return {
				user: {},
				achievements: {}
			}
		},
		route: {
			data() {
				return {
					user: usersApi.get({ id: localStorage.userID }).then(response => response.body),
					achievements: achievementsApi.get().then(response => response.body)
				}
			}
		},
		methods: {
			has(achievement) {
				return this.user.Achievements.some(e => e.ID == achievement.ID);
			}
		}
	}
</script>

<style>
	.achievement-row {
		padding-top: 5px;
		padding-bottom: 5px;
		border-top: 1px solid #e4e6e8;
	}
</style>