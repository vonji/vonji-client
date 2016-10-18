<template>
	<div>
		<a :href="ad.Url"><img :src="ad.ImageUrl" :alt="ad.AltText"></a>
	</div>
</template>

<script type="text/ecmascript-6">
	import { adsApi } from '../../utils/resources';
	import { currentUser } from '../../vuex/getters';

	export default {
		data() {
			return {
				ads: [],
				ad: {},
			};
		},
		ready() {
			adsApi.get().then(response => {

				// current user might not be loaded yet
				let fixMe = () => {
					let user = currentUser(this.$store.state);
					if (user.Location === undefined) {
						window.setTimeout(fixMe, 250);
						return ;
					}
					this.ads = response.body.filter(e => e.Region === currentUser(this.$store.state).Location);
					this.ad = this.ads[this.rand(this.ads.length)];
					window.setInterval(() => {
						this.ad = this.ads[this.rand(this.ads.length)];
					}, 30000);
				};

				fixMe();
			});
		},
		vuex: {
			getters: {
				currentUser
			}
		},
		methods: {
			rand(max) {
				return Math.floor(Math.random() * max);
			}
		}
	}
</script>