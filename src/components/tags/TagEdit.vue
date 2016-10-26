<template>
	<div>
		<form @submit.prevent="save">
			<div class="form-group">
				<input type="text" v-model="tag.Name" class="form-control">
			</div>
			<div class="form-group">
				<textarea v-model="tag.Description" class="form-control"></textarea>
			</div>
			<button type="submit" class="btn btn-default">Sauvegarder</button>
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
		methods: {
			fetchData() {
				tagsApi.get({ id: this.$route.params.id }).then(response => { this.tag = response.body });
			},
			save() {
				tagsApi.update(this.tag).then(() => this.$router.push('/tags/list'));
			}
		}
	}
</script>