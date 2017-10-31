import VueTypes from 'vue-types';
import PropImage from '../media/PropImage';

/**
 * @param {description} name The name of the author
 * @param {description} role The role of the author
 * @param {description} image The image of the author
 */
export default {
	name: VueTypes.string.isRequired,
	role: VueTypes.string.isRequired,
	image: VueTypes.shape(PropImage),
};
