<template>
	<div class="row">
		<div class="col-md-4">
			<div class="form-inline form-group">
				<div class="input-group">
					<span class="input-group-addon"><span class="glyphicon glyphicon-search"></span></span>
					<input type="search" v-model="searchInput" class="form-control">
				</div>
			</div>
		</div>
	</div>
	<div class="row">
		<h2>{{ tags.length }} skills</h2>
	</div>
	<div class="row">
		<div v-for="tag in tags | filter" class="col-md-1">
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
				usages: [],
				searchInput: ''
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
		},
		filters: {
			filter(tags) {
				return tags.filter(e => e.Name.indexOf(this.searchInput) !== -1);
			}
		}
	}
</script>