<template>
	<div>
		<div v-for="achievement in achievementList" class="row achievement-row">
			<div class="col-md-2"><span v-if="has(achievement)" class="glyphicon glyphicon-ok"></span></div>
			<div class="col-md-3"><button class="btn" style="cursor: default">{{ achievement.Name }}</button></div>
			<div class="col-md-4">{{ achievement.Description }}</div>
			<div class="col-md-2">{{ achievement.Award }} vActions</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import { achievementList, currentUser } from '../vuex/getters';
	import { achievementsApi, usersApi } from '../utils/resources';

	export default {
		data() {
			return {
				achievements: {}
			}
		},
		methods: {
			has(achievement) {
				return currentUser(this.$store.state).Achievements.some(e => e.ID == achievement.ID);
			}
		},
		vuex: {
			getters: {
				achievementList,
				currentUser
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