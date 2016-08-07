<template>
	<form @submit.prevent="save">
		<div class="form-group">
			<label for="#{{ request.ID }}-request-title">Request title</label>
			<input
				type="text" id="{{ request.ID }}-request-title"
				v-model="request.Title"
				class="form-control"
				placeholder="Title of your request..."
				required
			/>
		</div>
		<div class="form-group">
			<label for="#{{ request.ID }}-request-content">Description of your task</label>
			<textarea
				id="{{ request.ID }}-request-content"
				rows="10"
				v-model="request.Content"
				class="form-control"
				placeholder="Describe your request..."
				required
			></textarea>
		</div>
		<tags-viewer :parent="request" :edit-mode="true"></tags-viewer>
		<button type="submit" class="btn btn-primary btn-block btn-lg">Save</button>
	</form>
</template>

<script type="text/babel">
	import TagsViewer from './TagsViewer.vue';

	export default {
		props: {
			request: {
				type: Object,
				default: () => ({
					Tags: []
				})
			}
		},
		methods: {
			save() {
				this.$dispatch('on-save', this.request);
			}
		},
		components: {
			TagsViewer
		}
	}
</script>

<style>
	textarea {
		resize: vertical;
	}
</style>
