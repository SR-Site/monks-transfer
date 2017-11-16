import VueTypes from 'vue-types';
import PropImage from '../../data/prop-type/media/PropImage';

/**
 * @param {description} image The image of the content item
 * @param {description} heading The heading of the content item
 * @param {description} paragraph The paragraph of the content item
 */
export default {
	image: VueTypes.shape(PropImage),
	heading: VueTypes.string.isRequired,
	paragraph: VueTypes.string.isRequired
};
