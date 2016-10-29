<template>
	<div class="row">
		<div class="col-md-5">
			<bs-search-input v-bind:value="value" v-on:input="onInput" :placeholder="placeholder"></bs-search-input>
		</div>
		<div class="col-md-5 search-bar-results">
			<div v-if="value">
				<h4><slot name="search"></slot></h4>
			</div>
			<div v-else>
				<h4><slot></slot></h4>
			</div>
		</div>
	</div>
</template>

<script type="text/babel">
	import BsSearchInput from './BsSearchInput.vue';

	export default {
		props: {
			value: {
				type: String,
				required: true
			},
			placeholder: {
				type: String,
				required: false,
				default: ''
			}
		},
		methods: {
			onInput(value) {
				this.$emit('input', value)
			}
		},
		components: {
			BsSearchInput
		}
	}
</script>

<style lang="scss">
	.search-bar-results {
		text-align: center;
		margin-bottom: 15px;
	}
</style>