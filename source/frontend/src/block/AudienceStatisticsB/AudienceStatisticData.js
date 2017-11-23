import VueTypes from 'vue-types';

/**
 * @param {description} label The label of the statistic
 * @param {description} value The value of the statistic
 */
export default {
	label: VueTypes.string.isRequired,
	value: VueTypes.number.isRequired,
};
