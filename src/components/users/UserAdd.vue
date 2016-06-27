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
				<input name="FirstName" type="text" placeholder="Prenom">
				<input name="LastName" type="text" placeholder="Nom">
				<input name="Description" type="text" placeholder="Description">
				<button type="submit">Submit</button>
			</form>
		</div>
		<div class="col-md-3"></div>
	</div>
</template>

<script>
	import vonji from '../../utils/resources';

	let $ = require('jquery');

	export default {
		data() {
			return {};
		}
	}

	$(function() {
		$('#user-registration-form').submit(function(e) {
	        e.preventDefault();
	        vonji.post({
	            url: 'users',
	            data: JSON.stringify({//TODO USE FUCKING VUE
					FirstName: $('input[name=FirstName]').val(),
					LastName: $('input[name=LastName]').val(),
					Description: $('input[name=Description]').val()
				})
	        });
	    });
	});
</script>
