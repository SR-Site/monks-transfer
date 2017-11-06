import VueTypes from 'vue-types';

/**
 * @param {description} label The label of the filter option
 * @param {description} value The value of the filter option
 */
export default {
	value: VueTypes.string.isRequired,
	label: VueTypes.string.isRequired,
};
