<template>
	<div>
		<div class="row" v-for="comment in content.Comments">
			<comment :comment="comment"></comment>
		</div>
		<div class="row" v-if="isLogged">
			<form @submit.prevent="submitComment">
				<input type="text" title="commentInput" v-model="commentInput">
				<button type="submit" class="btn btn-sm btn-default">Comment</button>
			</form>
		</div>
	</div>
</template>

<script type="text/babel">
	import { commentsApi } from '../../utils/resources';
	import { isLogged } from '../../vuex/getters';
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
		vuex: {
			getters: {
				isLogged
			}
		},
		methods: {
			type() {
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
					this.content.Comments.push(JSON.parse(response.body))
				});
			}
		}
	}
</script>