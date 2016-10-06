<template>
	<div>
		<li class="dropdown">
			<a href="#" @click="markRead" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
				<span class="glyphicon glyphicon-inbox"></span>
				<span v-if="unread > 0">({{ unread }})</span>
			</a>
			<ul class="dropdown-menu notification-box">
				<li v-for="notification in notifications">
					<div class="notification-header">{{ notification.CreatedAt | fromNow }}</div>
					<a href="#">
						{{ notification.Title }}
						<br>
						{{ notification.Message }}
					</a>
				</li>
			</ul>
		</li>
	</div>
</template>

<script type="text/ecmascript-6">
	import { notificationsApi } from '../../utils/resources';
	import { currentUser } from '../../vuex/getters';
	import { notificationsUpdate } from '../../vuex/actions';
	import moment from 'moment';

	export default {
		computed: {
			unread() {
				let n = this.notifications;
				if (!n.length)//TODO FIX when the page load n is an empty object
					return 0;
				return n.filter(e => !e.Read).length;
			},
			notifications() {
				return this.$store.state.notifications
					.filter(e => e.UserID === currentUser(this.$store.state).ID)
					.sort((a, b) => {
						if (moment(a.CreatedAt).isSame(b.CreatedAt, 'second'))
							return 0;
						return moment(a.CreatedAt).isBefore(b.CreatedAt, 'second') ? 1 : -1;
					});
			}
		},
		vuex: {
			actions: {
				markRead({ dispatch }) {
					let n = this.notifications;

					n.forEach(notification => {
						if (!notification.Read) {
							notification.Read = true;
							notificationsApi.update({ id: notification.ID }, notification);
						}
					});
					notificationsUpdate({ dispatch }, n.map(e => { e.Read = true; return e; }))
				}
			},
			getters: {
				currentUser
			}
		}
	}
</script>

<style>
	.notification-box {
		max-height: 200px;
		overflow-y: scroll;
	}
	.notification-header {
		background-color: #e4e6e8;
	}
</style>