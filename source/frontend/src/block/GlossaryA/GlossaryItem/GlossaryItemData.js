import VueTypes from 'vue-types';

/**
 * @param {description} label The label of the glossary item
 * @param {description} value The value of the glossary item
 */
export default {
	label: VueTypes.string.isRequired,
	value: VueTypes.string.isRequired,
};
