import VueTypes from 'vue-types';

export default {
	name: 'Logo',
	props: {
		theme: VueTypes.number.isRequired,
	},
	computed: {
		mappedTheme() {
			return this.Theme[this.theme].toLowerCase();
		},
	},
};
