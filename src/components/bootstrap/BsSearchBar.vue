<template>
	<form @submit.prevent="foo()" class="form-group {{ inline ? 'form-inline' : '' }}">
		<div class="input-group">
			<span class="input-group-btn"><button type="submit" class="btn btn-default"><span class="glyphicon glyphicon-search" style="line-height: inherit"></span></button></span>
			<input type="search" v-model="model" class="form-control" placeholder="{{placeholder}}">
		</div>
	</form>
</template>

<script type="text/babel">
	export default {
		props: {
			model: {
				type: String,
				required: true
			},
			placeholder: {
				type: String,
				default: ""
			},
			inline: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			foo() {
				this.$dispatch('submit', this.model)
			}
		}
	}
</script>