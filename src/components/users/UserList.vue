<template>
	<div class="row">
	    <div class="col-sm-6"><h1>Users</h1></div>
	    <div class="col-sm-6">réputation | nouveaux | moderateurs | administrateurs </div>
	</div>

	<hr/>

	<div id="search"><div><span class="glyphicon glyphicon-search"></span></div><input id="search-bar" type="text" placeholder="Saissez un nom de membre, un lieu ou une compétence"></div>

	<div class="user-list row">
	    <div class="col-md-4 col-sm-5 col-xs-6 user" v-for="user in users">
	        <div class="row">
	            <div class="col-md-4" id="avatar"><img src="https://placehold.it/50x50" alt="avatar"></div>
	            <div class="col-md-8">
	                <div class="row">
	                    <div class="col-sm-6">{{user.FirstName}} {{user.LastName}}</div>
	                    <div class="col-sm-2">{{user.Location}}</div>
	                </div>
	                <div class="row">
	                    <div class="col-sm-6"><i>{{user.Description}}</i></div>
	                    <div class="col-sm-6">{{user.VReputation}} vR</div>
	                </div>
	                <div class="row hidden-xs">
	                    <div class="col-md-12">
	                        <div class="tag" v-for="tag in user.Tags">
	                            {{tag.Name}}
	                        </div>
	                    </div>
	                </div>
	            </div>
	        </div>
	    </div>
	</div>
</template>

<script type="text/babel">

	import Resources from '../../utils/resources'

	export default {
		data() {
			return {
				users: []
			};
		},
		route: {
			data() {
				return {
					users: Resources.user.get()
				}
			}
		}
	}
</script>

<style lang="css">
	.user-list {
		margin-top: 25px;
	}
	.user {
		display: inline-block;
		border: solid black 1px;
		border-radius: 15px;
		margin: 25px;
		padding: 10px;
		height: 160px;
	}
	.tag {
		display: inline-block;
		border: solid black 2px;
		box-shadow: 3px 3px black;
		padding-left: 2px;
		padding-right: 2px;
		margin: 2px;
	}
	#avatar {
		margin-right: 10px;
		width: 50px;
		height: 50px;
	}

	#search>div {
		display: inline-block;
		padding: 1px;
		border: solid 2px;
		border-right: none;
		border-color: darkgrey whitesmoke whitesmoke darkgrey;
		border-top-left-radius: 15px;
		border-bottom-left-radius: 15px;
	}
	#search>input {
		width: 400px;
		border-left: none;
		border-top-right-radius: 15px;
		border-bottom-right-radius: 15px;
	}
</style>