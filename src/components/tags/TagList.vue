<template>
	<div class="row">
		<div class="col-md-4">
			<bs-search-bar :model.sync="searchInput" placehold="Search tag" inline></bs-search-bar>
		</div>
	</div>
	<div class="row">
		<h2>{{ tags.length }} skills</h2>
	</div>
	<div class="row">
		<template v-for="tag in tags | filter | sortByName">
			<div class="tag-container col-md-2">
				<span class="tag">{{ tag.Name }}</span><span class="tag-meta">x {{ requests | withTag tag | length }}</span>
				<div class="tag-description">{{ tag.Description }}</div>
				<div class="tag-meta">{{ requests | withTag tag | notCompleted | length }} requests waiting for help</div>
				<div class="tag-meta">{{ requests | withTag tag | since 1 'year' | completed | length }} requests completed this year</div>
			</div>
		</template>
	</div>
</template>

<script>
	import BsSearchBar from '../bootstrap/BsSearchBar.vue';
	import { tagsApi, requestsApi } from "../../utils/resources";

	let moment = require('moment');

	export default {
		data() {
			return {
				tags: [],
				requests: [],
				searchInput: '',
				moment
			}
		},
		route: {
			data() {
				return {
					tags: tagsApi.get().then(response => response.json()),
					requests: requestsApi.get().then(response => response.json())
				}
			}
		},
		filters: {
			filter(tags) {
				return tags.filter(e => e.Name.indexOf(this.searchInput) !== -1);
			},
			sortByName(tags) {
				return tags.sort((a, b) => a.Name.localeCompare(b.Name) )
			},
			since(requests, n, unit) {
				return requests.filter(r => moment(r.CreatedAt).isAfter(moment().subtract(n, unit)));
			},
			completed(requests) {
				return requests.filter(req => req.Archived && req.Responses.some(res => res.Accepted));
			},
			notCompleted(requests) {
				return requests.filter(req => !req.Archived || req.Responses.some(res => !res.Accepted));
			},
			withTag(requests, tag) {
				return requests.filter(r => r.Tags.some(t => t.ID == tag.ID));
			},
			length(array) {
				return array.length;
			}
		},
		components: {
			BsSearchBar
		}
	}
</script>

<style lang="scss">
	.tag-container {
		margin-bottom: 5px;
	}
	.tag-meta {
		font-size: 10px;
	}
	.tag-description {
		color: gray;
		font-size: 12px;
	}
</style>