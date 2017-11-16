import VueTypes from 'vue-types';
import PropImage from '../../../data/prop-type/media/PropImage';

/**
 * @param {description} target the path to the product
 * @param {description} heading the heading of the teaser block
 * @param {description} paragraph the paragraph of the teaser block
 * @param {description} image normal: 1280x720, small: 1280x720
 */
export default {
	target: VueTypes.string.isRequired,
	heading: VueTypes.string.isRequired,
	paragraph: VueTypes.string.isRequired,
	image: VueTypes.shape(PropImage),
};
