<template>
	<bs-search-bar :input.sync="searchInput" placehold="Recherchez une compétence">
		<slot slot="search">{{ tags | search | length }} compétences sur {{ tags.length }}</slot>
		<slot>{{ tags.length }} compétences</slot>
	</bs-search-bar>
	<div class="row">
		<h2></h2>
	</div>
	<div class="row">
		<template v-for="tag in tags | search | sortByName">
			<div class="tag-container col-md-2">
				<a v-link="'/tags/edit/' + tag.ID"><span class="glyphicon glyphicon-pencil"></span></a><span class="tag">{{ tag.Name }}</span><span class="tag-meta">x {{ requests | withTag tag | length }}</span>
				<div class="tag-description">{{ tag.Description }}</div>
				<div class="tag-meta">{{ requests | withTag tag | notCompleted | length }} requêtes en attentes</div>
				<div class="tag-meta">{{ requests | withTag tag | since 1 'year' | completed | length }} requêtes complétées cette année</div>
			</div>
		</template>
	</div>
</template>

<script type="text/ecmascript-6">
	import BsSearchBar from '../bootstrap/BsSearchBar.vue';
	import { tagsApi, requestsApi } from "../../utils/resources";

	export default {
		data() {
			return {
				tags: [],
				requests: [],
				searchInput: ''
			}
		},
		route: {
			data() {
				return {
					tags: tagsApi.get().then(response => response.body),
					requests: requestsApi.get().then(response => response.body)
				}
			}
		},
		filters: {
			search(tags) {
				return this.fuzzySearch(tags, ['Name'], this.searchInput).slice();
			},
			sortByName(tags) {
				return tags.sort((a, b) => a.Name.localeCompare(b.Name));
			},
			completed(requests) {
				return requests.filter(req => req.Status === 'graded');
			},
			notCompleted(requests) {
				return requests.filter(req => req.Status !== 'graded');
			},
			withTag(requests, tag) {
				return requests.filter(r => r.Tags.some(t => t.ID == tag.ID));
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