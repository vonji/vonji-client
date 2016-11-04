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
	import { mapGetters } from 'vuex';
	import { notificationsApi } from '../../utils/resources';
	import * as M from '../../vuex/mutationTypes';
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
					.filter(e => e.UserID === this.currentUser.ID)
					.sort((a, b) => {
						if (moment(a.CreatedAt).isSame(b.CreatedAt, 'second'))
							return 0;
						return moment(a.CreatedAt).isBefore(b.CreatedAt, 'second') ? 1 : -1;
					});
			},
			...mapGetters(['currentUser'])
		},
		methods: {
			markRead() {
				let n = this.notifications;

				n.forEach(notification => {
					if (!notification.Read) {
						notification.Read = true;
						notificationsApi.update({ id: notification.ID }, notification);
					}
				});
				this.$store.commit(M.NOTIFICATION_UPDATE, n.map(e => { e.Read = true; return e; }));
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