<template>
	<div class="row">
		<div v-for="tag in tags" class="col-md-1">
			<span class="tag">{{ tag.Name }}</span>x {{ usages[$index] }}
		</div>
	</div>
</template>

<script>
	import { tagsApi } from "../../utils/resources";

	export default {
		data() {
			return {
				tags: [],
				usages: []
			}
		},
		route: {
			data() {
				return tagsApi.get()
					.then(response => {
						let tags = response.json();
						tags.forEach((e, i) => {
							tagsApi.getRequests(e.ID).then(response => this.usages.push(response.json().length))
						});
						return { tags }
					});
			}
		}
	}
</script>