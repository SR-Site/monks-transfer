import VueTypes from 'vue-types';
import PropImage from '../../../data/prop-type/media/PropImage';
import PropVideo from '../../../data/prop-type/media/PropVideo';

/**
 * @param {description} heading The heading of the media item
 * @param {description} paragraph The paragraph of the media item
 * @param {description} image normal: 1280x720, small: 1280x720
 * @param {description} video The video fo the media item
 */
export default {
	heading: VueTypes.string.isRequired,
	paragraph: VueTypes.string.isRequired,
	image: VueTypes.shape(PropImage).isRequired,
	video: VueTypes.shape(PropVideo),
};
