import VueTypes from 'vue-types';

export default {
	name: 'SiteMenuPage',
	computed: {
		status() {
			// console.log(this.active, this.history, this.links);
			if (this.active === this.data.section) {
				return 'center';
			}

			if (this.history.indexOf(this.data.section) > -1) {
				return 'left';
			}

			return 'right';
		},
	},
	props: {
		history: VueTypes.arrayOf(VueTypes.string).isRequired,
		active: VueTypes.string.isRequired,
		// Links can also contain another array of links with a section and links, so we can recursively
		// render out the menu items
		data: VueTypes.any,
	},
	methods: {
		selectSection(section) {
			this.$emit('selectSection', section);
		},
		back() {
			this.$emit('back');
		}
	},
};
