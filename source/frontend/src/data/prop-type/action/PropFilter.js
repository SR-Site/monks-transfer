import VueTypes from 'vue-types';
import PropFilterOption from './PropFilterOption';

/**
 * @param {description} label The label of the filter
 * @param {description} type The type of the filter, used for categorizing
 * @param {description} options The options for the filter
 */
export default {
	label: VueTypes.string.isRequired,
	type: VueTypes.string.isRequired,
	options: VueTypes.arrayOf(VueTypes.shape(PropFilterOption).isRequired).isRequired,
};
