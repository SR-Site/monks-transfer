import VueTypes from 'vue-types';
import PropAudienceTeaser from '../../../data/prop-type/article/PropAudienceTeaser';

/**
 * @param {description} heading The heading of the category
 * @param {description} paragraph The paragraph of the category
 * @param {description} items The items wrapped in the category
 */
export default {
	heading: VueTypes.string.isRequired,
	paragraph: VueTypes.string.isRequired,
	items: VueTypes.arrayOf(VueTypes.shape(PropAudienceTeaser)).isRequired,
};
