<template>
	<div class="form-inline">
		<tags-viewer :parent="request" :edit-mode="true"></tags-viewer>
		<form @submit.prevent="save" class="form-group">
			<label for="user-request-edit-value">vCoins</label>
			<input type="number" v-model="response.Value" :min="min" :value="response.Value" id="user-request-edit-value" class="form-control">
			<button type="submit" class="btn btn-default">Sauvegarder</button>
		</form>
	</div>
</template>

<script type="text/ecmascript-6">
	import TagsViewer from '../requests/TagsViewer.vue';

	export default {
		props: {
			request: {
				type: Object,
				required: true
			}
		},
		data() {
			return {
				response: this.request.Responses.find(e => e.Accepted),
				min: this.request.Responses.find(e => e.Accepted).Value
			}
		},
		methods: {
			save() {
				this.response.Value = Number(this.response.Value);
				this.$dispatch('save', this.request, this.response);
			}
		},
		components: {
			TagsViewer
		}
	}
</script>

<style>

</style>