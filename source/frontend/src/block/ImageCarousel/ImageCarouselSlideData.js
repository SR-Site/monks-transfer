import VueTypes from 'vue-types';
import PropImage from '../../data/prop-type/media/PropImage';
import PropVideo from '../../data/prop-type/media/PropVideo';

/**
 * @param {description} heading The heading of the slide
 * @param {description} theme The theme of the slide
 * @param {description} image The image of the slide
 * @param {description} video The video of the slide
 */
export default {
	heading: VueTypes.string.isRequired,
	theme: VueTypes.number.isRequired,
	image: VueTypes.shape(PropImage).isRequired,
	video: VueTypes.shape(PropVideo),
};
