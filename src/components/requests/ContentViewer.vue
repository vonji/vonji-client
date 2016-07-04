<template lang="html">
	<div id="v-content-{{ content.ID }}" class="v-content-viewer">
		<form v-if="isWriteMode">
			<div class="form-group">
				<textarea
					v-model="newContent"
					class="form-control"
					style="width:100%;"
				></textarea>
			</div>
			<div class="btn-group">
				<button @click="save" class="btn btn-primary">Save</button>
				<button @click="cancel" class="btn btn-default">Cancel</button>
			</div>
		</form>
		<div class="v-content-body" v-else @click="edit">
			{{ content.Content }}
		</div>
		<div v-if="content.Tags" class="v-content-tags">
			<span v-for="tag in content.Tags" class="label label-primary">{{ tag }}</span>
		</div>
		<div class="v-content-footer">
			<div class="row">
				<div class="col-md-4">
					<a>share</a>
					<a href="#" @click.prevent="edit">improve this content</a>
				</div>
				<div class="col-md-8">
					<div class="v-content-usercards">
						<user-card :user="content.LastEditor" v-if="content.LastEditor">
							<a>edited Mar 21 at 21:35</a>
						</user-card>
						<user-card :user="content.User" :primary="true">
							<a>posted Mar 21 at 21:35</a>
						</user-card>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import UserCard from '../users/UserCard.vue';
	export default {
		data() {
			return {
				mode: 'read',
				newContent: ''
			};
		},
		methods: {
			edit() {
				this.newContent = this.content.Content;
				this.mode = 'write';
			},
			cancel() {
				this.newContent = '';
				this.mode = 'read';
			},
			save() {
				this.$dispatch('on-content-edit', this.content.ID, this.newContent);//should be on save?
				this.mode = 'read';
			}
		},
		computed: {
			isWriteMode() {
				return this.mode === 'write';
			}
		},
		props: {
			content: {
				type: Object,
				required: true
			},
			editLink: {
				type: String,
				required: true
			}
		},
		components: {
			UserCard
		}
	}
</script>

<style lang="scss">
	.v-content-viewer {
		margin-bottom: 1em;
	}
	.v-content-usercards {
		display: flex;
		justify-content: flex-end;
		.v-usercard {
			& + .v-usercard {
				margin-left: 3em;
			}
		}
	}
	.v-content-tags {
		padding-top: 1em;
		.label {
			margin-right: 1em;
		}
	}
	.v-content-footer {
		padding-top: 1em;
		a {
			color: gray;
			font-size: 0.85em;
			display: inline-flex;
			margin-right: 1em;
		}
	}
</style>
