<template>
	<div class="form">
		<div class="form-group">
			<label for="#{{ request.ID }}-request-title">Request title</label>
			<input
				type="text" id="{{ request.ID }}-request-title"
				v-model="request.Title"
				class="form-control"
				placeholder="Title of your request..."
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
			></textarea>
		</div>
		<button @click="save" class="btn btn-primary btn-block btn-lg">Save</button>
	</div>
</template>

<script type="text/babel">
	export default {
		props: {
			request: {
				type: Object,
				default: () => ({})
			}
		},
		methods: {
			save() {
				this.$dispatch('on-save', this.request);
			}
		}
	}
</script>

<style>
	textarea {
		resize: vertical;
	}
</style>
