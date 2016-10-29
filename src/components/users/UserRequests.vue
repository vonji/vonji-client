<template>
	<table class="table table-condensed table-striped">
		<tbody>
		<tr v-for="request in sortedRequests">
			<td>{{ request.CreatedAt | fromNow }}</td>
			<td><router-link :to="'/requests/view/' + request.ID">{{ request.Title }}</router-link></td>
			<td v-if="request.Status === 'accepted'" is="request-grade-box" @grade="gradeResponse" :data="getAcceptedResponse(request)"></td>
			<td>{{ request.Views }} vues {{ request.Responses.length}} réponses</td>
			<td>
				<a @click.prevent="editRequest(request)" href="#"><span class="glyphicon glyphicon-pencil"></span></a>
				<a v-if="false" @click.prevent="deleteRequest(request)" href="#"><span class="glyphicon glyphicon-trash"></span></a>
			</td>
		</tr>
		</tbody>
	</table>
</template>

<script type="text/ecmascript-6">
	import RequestGradeBox from '../requests/RequestGradeBox.vue';
	import UserRequestEdit from './UserRequestEdit.vue';

	export default {
		props: {
			requests: {
				type: Array,
				required: true
			}
		},
		computed: {
			sortedRequests() {
				return this.sortByCreation(this.requests);
			}
		},
		methods: {
			gradeResponse(grade, response) {
				this.$emit('grade', response, grade);
			},
			editRequest(request) {
				this.$emit('edit', request);
			},
			deleteRequest(request) {
				this.$emit('delete', request);
			},
			getAcceptedResponse(request) {
				let res = request.Responses.filter(res => res.Accepted);
				return !res || res[0];
			}
		},
		components: {
			RequestGradeBox,
			UserRequestEdit
		}
	}
</script>