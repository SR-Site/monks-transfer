import VueTypes from 'vue-types';

/**
 * @param {description} value The value for the item
 * @param {description} label The label for the item
 * @param {description} paragraph The paragraph for the item
 */
export default {
	value: VueTypes.string.isRequired,
	label: VueTypes.string.isRequired,
	paragraph: VueTypes.string.isRequired,
};
