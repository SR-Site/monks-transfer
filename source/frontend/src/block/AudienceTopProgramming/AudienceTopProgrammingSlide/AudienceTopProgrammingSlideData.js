import VueTypes from 'vue-types';
import PropImage from '../../../data/prop-type/media/PropImage';
import PropVideo from '../../../data/prop-type/media/PropVideo';

/**
 * @param {description} heading The heading for the slide
 * @param {description} paragraph The paragraph for the slide
 * @param {description} network The network for the slide
 * @param {description} background 1040x580, small: 750x750
 * @param {description} playVideoLabel The play video label for the slide
 * @param {description} video The video linked to the slide
 */
export default {
	heading: VueTypes.string.isRequired,
	paragraph: VueTypes.string.isRequired,
	network: VueTypes.string.isRequired,
	background: VueTypes.shape(PropImage).isRequired,
	playVideoLabel: VueTypes.string,
	video: VueTypes.shape(PropVideo),
};
