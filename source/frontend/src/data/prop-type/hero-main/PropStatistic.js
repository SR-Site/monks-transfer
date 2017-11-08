import VueTypes from 'vue-types';

/**
 * @param {description} heading The heading of the statistic
 * @param {description} description The description of the statistic
 * @param {description} value The value of the statistic
 */
export default {
	heading: VueTypes.string.isRequired,
	description: VueTypes.string.isRequired,
	value: VueTypes.number.isRequired,
};
