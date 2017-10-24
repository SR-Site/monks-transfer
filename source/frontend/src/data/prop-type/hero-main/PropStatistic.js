import VueTypes from 'vue-types';

export default {
	heading: VueTypes.string.isRequired,
	stats: VueTypes.arrayOf(
		VueTypes.shape({
			heading: VueTypes.string.isRequired,
			description: VueTypes.string.isRequired,
			value: VueTypes.number.isRequired,
		}),
	),
};
