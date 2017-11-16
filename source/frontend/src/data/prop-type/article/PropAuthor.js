import VueTypes from 'vue-types';
import PropImage from '../media/PropImage';

/**
 * @param {description} name The name of the author
 * @param {description} role The role of the author
 * @param {description} image normal: 240x240, small: 240x240
 */
export default {
	name: VueTypes.string.isRequired,
	role: VueTypes.string.isRequired,
	image: VueTypes.shape(PropImage),
};
