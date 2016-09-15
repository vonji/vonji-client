<template>
	<div>
		<form @submit.prevent="save">
			<div class="form-group">
				<input type="text" v-model="tag.Name" class="form-control">
			</div>
			<div class="form-group">
				<textarea v-model="tag.Description" class="form-control"></textarea>
			</div>
			<button type="submit" class="btn btn-default">Save</button>
		</form>
	</div>
</template>

<script type="text/ecmascript-6">
	import { tagsApi } from '../../utils/resources';

	export default {
		data() {
			return  {
				tag: {}
			}
		},
		route: {
			data({ to: { params: { id } } }) {
				return {
					tag: tagsApi.get({ id: id }).then(response => response.body)
				}
			}
		},
		methods: {
			save() {
				tagsApi.update(this.tag).then(() => this.$router.go('/tags/list'));
			}
		}
	}
</script>