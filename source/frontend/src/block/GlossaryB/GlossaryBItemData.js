import VueTypes from 'vue-types';

/**
 * @param {description} value The value of the glossary item
 * @param {description} label The label of the glossary item
 * @param {description} category The category of the glossary item
 */
export default {
	value: VueTypes.string.isRequired,
	label: VueTypes.string.isRequired,
	category: VueTypes.string.isRequired,
};
