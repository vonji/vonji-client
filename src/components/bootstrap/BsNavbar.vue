<template lang="html">
	<nav class="navbar navbar-default navbar-static-top">
		<div class="container-fluid">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-navbar-collapse" aria-expanded="false">
					<span class="sr-only">Toggle navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<router-link to="link" class="navbar-brand">{{ brandName }}</router-link>
			</div>

			<div class="collapse navbar-collapse" id="bs-navbar-collapse">
				<slot></slot>
			</div>
		</div>
	</nav>
</template>

<script type="text/javascript">
	export default {
		props: ['brand-name', 'link']
	}
</script>
