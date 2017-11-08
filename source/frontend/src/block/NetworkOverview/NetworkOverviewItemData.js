import VueTypes from 'vue-types';
import PropImage from '../../data/prop-type/media/PropImage';


/**
 * @param {description} image The image of the network
 */
export default {
	image: VueTypes.shape(PropImage).isRequired,
};
