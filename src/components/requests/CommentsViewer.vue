<template>
	<div>
		<div class="row" v-for="comment in content.Comments">
			<comment :comment="comment"></comment>
		</div>
		<div class="row" v-if="isLogged">
			<form @submit.prevent="submitComment" class="form-inline">
				<input type="text" title="commentInput" v-model="commentInput" class="form-control">
				<button type="submit" class="btn btn-default">Commenter</button>
			</form>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import { mapGetters } from 'vuex';
	import { commentsApi } from '../../utils/resources';
	import Comment from './Comment.vue'

	export default {
		props: {
			content: {
				type: Object,
				required: true
			}
		},
		data() {
			return {
				commentInput: ''
			}
		},
		components: {
			Comment
		},
		computed: {
			...mapGetters(['isLogged'])
		},
		methods: {
			type() {//TODO to computed
				return this.content.Responses !== undefined ? 'request' : 'response';//TODO better
			},
			submitComment() {
				commentsApi.save({
					requestID: this.type() === 'request' ? this.content.ID : 0,
					responseID: this.type() === 'response' ? this.content.ID : 0,
					Content: this.commentInput,
					UserID: Number(localStorage.userID)
				})
				.then(response => {
					this.commentInput = '';
					this.content.Comments = this.content.Comments || [];
					this.content.Comments.push(response.body)
				});
			}
		}
	}
</script>