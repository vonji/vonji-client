<template>
	<div>
		<bs-search-bar v-model="searchInput" placehold="Recherchez une compétence">
			<div slot="search">{{ searchResults.length }} compétences sur {{ tags.length }}</div>
			<div>{{ tags.length }} compétences</div>
		</bs-search-bar>
		<div class="row">
			<h2></h2>
		</div>
		<div class="row">
			<template v-for="tag in searchResults">
				<div class="tag-container col-md-2">
					<router-link :to="'/tags/edit/' + tag.ID"><span class="tag-list-edit glyphicon glyphicon-pencil"></span></router-link><span class="tag">{{ tag.Name }}</span><span class="tag-meta">x {{ requests | withTag(tag) | length }}</span>
					<div class="tag-description">{{ tag.Description }}</div>
					<div class="tag-meta">{{ requests | withTag(tag) | notCompleted | length }} requêtes en attentes</div>
					<div class="tag-meta">{{ requests | withTag(tag) | since (1, 'year') | completed | length }} requêtes complétées cette année</div>
				</div>
			</template>
		</div>
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
		methods: {
			fetchData() {
				tagsApi.get().then(response => { this.tags = response.body });
				requestsApi.get().then(response => { this.requests = response.body });
			}
		},
		computed: {
			searchResults() {
				return this.fuzzySearch(this.tags, ['Name'], this.searchInput).slice()
						.sort((a, b) => a.Name.localeCompare(b.Name));
			}
		},
		filters: {
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
		min-height: 72px!important;
	}
	.tag-meta {
		font-size: 10px;
	}
	.tag-description {
		color: gray;
		font-size: 12px;
	}
	.tag-list-edit {
		margin-right: 5px;
	}
</style>