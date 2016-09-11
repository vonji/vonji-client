<template>
	<table class="table table-condensed table-striped">
		<tbody>
		<tr v-for="request in requests | byCreation">
			<td>{{ request.CreatedAt | fromNow }}</td>
			<td>{{ request.Title }}</td>
			<td v-if="request | acceptedResponse" is="request-grade-box" @grade="gradeResponse" :data="request | acceptedResponse"></td>
			<td>{{ request.Views }} views {{ request.Responses.length}} responses</td>
			<td>
				<a @click.prevent="editRequest(request)" href="#"><span class="glyphicon glyphicon-pencil"></span></a>
				<a @click.prevent="deleteRequest(request)" href="#"><span class="glyphicon glyphicon-trash"></span></a>
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
				required: true,
			}
		},
		methods: {
			gradeResponse(grade, response) {
				this.$dispatch('grade', response, grade);
			},
			editRequest(request) {
				this.$dispatch('edit', request);
			},
			deleteRequest(request) {
				this.$dispatch('delete', request);
			}
		},
		filters: {
			acceptedResponse(request) {
				let res = request.Responses.filter(e => e.Accepted);
				return !res || res[0];
			}
		},
		components: {
			RequestGradeBox,
			UserRequestEdit
		}
	}
</script>