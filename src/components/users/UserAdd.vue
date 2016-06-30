<template>
	<div class="row">
		<div class="col-md-3"></div>
		<div class="col-md-6">
			<form id="user-registration-form">
				<!--
				TODO
				<input name="email" type="email" v-model="email" placeholder="email">
				<input name="password" type="password" placeholder="password">
				-->
				<input type="text" placeholder="Prenom" v-model="user.FirstName">
				<input type="text" placeholder="Nom" v-model="user.LastName">
				<input type="text" placeholder="Description" v-model="user.Description">
				<button type="submit">Submit</button>
			</form>
		</div>
		<div class="col-md-3"></div>
	</div>
</template>

<script>
	import Resources from '../../utils/resources';

	let $ = require('jquery');

	export default {
		data() {
			return {
				user: {}
			};
		}
	}

	$(function() {
		$('#user-registration-form').submit(function(e) {
	        e.preventDefault();
	        Resources.user.post({
	            data: JSON.stringify(this.user),
				redirect: '/users'
	        });
	    });
	});
</script>
