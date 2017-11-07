import VueTypes from 'vue-types';
import PropImage from '../../../data/prop-type/media/PropImage';

/**
 * @param {description} target The link to the success story
 * @param {description} heading The heading of the success story teaser
 * @param {description} image The image linked to the success story
 */
export default {
	target: VueTypes.string.isRequired,
	heading: VueTypes.string.isRequired,
	image: VueTypes.shape(PropImage),
};
