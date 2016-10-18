<template>
	<div><!-- TODO case insensitve match + don't match selected tags -->
		<div>
			<span v-for="(tag, index) in parent.Tags" class="tag">
				{{ tag.Name }} <button v-if="editMode" @click="removeTag(index)" class="btn btn-default tag-delete-button">x</button>
			</span>
			<form v-if="editMode" @submit.prevent="addTag" class="form-inline" id="tag-input-form">
				<input type="text" v-model="newTag" list="tagsList" class="form-control" placeholder="Compétences requises">
				<datalist id="tagsList">
					<option v-for="tag in tagsList">{{ tag.Name }}</option>
				</datalist>
				<button type="submit" class="btn btn-default">Ajouter</button>
			</form>
		</div>
	</div>
</template>

<script type="text/babel">
//todo editmode=>writemode
	import { tagsApi } from '../../utils/resources';

	export default {
		data() {
			return {
				newTag: "",
				tagsList: []
			};
		},
		props: {
			parent: {
				type: Object,
				required: true
			},
			editMode: {
				type: Boolean
			}
		},
		mounted() {
			//require('awesomplete');//TODO use this to get consistent completion behaviour
			if (this.editMode) {
				this.loadTagList();
			}
		},
		methods: {
			addTag() {
				this.parent.Tags.push({ Name: this.newTag });
				this.newTag = '';
			},
			removeTag(index) {
				this.parent.Tags.splice(index, index + 1);
			},
			loadTagList() {
				tagsApi.get().then(result => {
					this.$set('tagsList', result.body);
				});
			}
		},
		watch: {
			'editMode': function () {
				if (this.editMode && this.tagsList.length === 0) {
					this.loadTagList();
				}
			}
		}
	}
</script>

<style>
	.tag {
		padding: 3px;
		margin-right: 5px;
		background-color: #eeeefc;
		display: inline-block;
	}

	.tag-delete-button {
		border-radius: 50%!important;
		padding: 0px 5px!important;
	}

	#tag-input-form {
		display: inline-block;
	}
</style>