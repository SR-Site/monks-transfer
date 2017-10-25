import VueTypes from 'vue-types';

export default {
	label: VueTypes.string.isRequired,
	title: VueTypes.string.isRequired,
	target: VueTypes.string,
	type: VueTypes.any.isRequired,
};
