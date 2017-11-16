import VueTypes from 'vue-types';
import PropImage from '../../data/prop-type/media/PropImage';

/**
 * @param {description} image normal: 240x240, small: 240x240
 */
export default {
	image: VueTypes.shape(PropImage).isRequired,
};
