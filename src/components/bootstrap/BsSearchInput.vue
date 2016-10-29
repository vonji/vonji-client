<template>
	<form @submit.prevent="onSubmit()" :class="inline ? 'form-inline' : ''">
		<div class="input-group">
			<span class="input-group-btn"><button type="submit" class="btn btn-default"><span class="glyphicon glyphicon-search" style="line-height: inherit"></span></button></span>
			<input type="search" v-bind:value="value" @input="onInput" class="form-control" :placeholder="placeholder">
		</div>
	</form>
</template>

<script type="text/babel">
	export default {
		props: {
			value: {
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
			onSubmit() {
				this.emit('submit', this.value)
			},
			onInput(event) {
				this.$emit('input', event.target.value)
			}
		}
	}
</script>

<style scoped>
	form {
		margin-bottom: 0px!important;
	}
</style>