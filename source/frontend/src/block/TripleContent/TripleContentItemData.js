import VueTypes from 'vue-types';

/**
 * @param {description} heading The heading of the content item
 * @param {description} paragraph The paragraph of the content item
 */
export default {
	heading: VueTypes.string.isRequired,
	paragraph: VueTypes.string.isRequired
};
