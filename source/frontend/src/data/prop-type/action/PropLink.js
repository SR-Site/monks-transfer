import VueTypes from 'vue-types';

/**
 * @param {description} label The label for the link
 * @param {description} title The title for the link
 * @param {description} target The target for the link
 * @param {placeholder} target path/to/target
 * @param {description} type The type of the link
 */
export default {
	label: VueTypes.string.isRequired,
	title: VueTypes.string.isRequired,
	target: VueTypes.string,
	type: VueTypes.oneOf([0, 1, 2, 3, 4, 5]),
};
