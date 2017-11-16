import VueTypes from 'vue-types';
import PropImage from '../../data/prop-type/media/PropImage';

/**
 * @param {description} heading The heading used on the block
 * @param {description} paragraph The paragraph used on the block
 * @param {description} background normal: 1920x1080, small: 1280x720
 * @param {description} secondaryParagraph The secondary paragraph used on the block
 */
export default {
	heading: VueTypes.string.isRequired,
	paragraph: VueTypes.string.isRequired,
	background: VueTypes.shape(PropImage),
	secondaryParagraph: VueTypes.string.isRequired,
};
