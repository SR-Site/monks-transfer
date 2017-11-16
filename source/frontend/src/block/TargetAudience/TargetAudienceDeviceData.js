import VueTypes from 'vue-types';
import PropImage from '../../data/prop-type/media/PropImage';

/**
 * @param {description} image normal: 1280x720, small: 1280x720
 * @param {description} heading The label for the item
 * @param {description} paragraph The paragraph for the item
 */
export default {
	image: VueTypes.shape(PropImage),
	heading: VueTypes.string.isRequired,
	paragraph: VueTypes.string.isRequired,
};
