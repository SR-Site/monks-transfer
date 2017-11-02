import VueTypes from 'vue-types';

export default {
	label: VueTypes.string.isRequired,
	type: VueTypes.number.isRequired,
	options: VueTypes.arrayOf(
		VueTypes.shape(
			{
				value: VueTypes.string.isRequired,
				label: VueTypes.string.isRequired,
			},
		).isRequired,
	).isRequired,
};
