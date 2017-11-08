import VueTypes from 'vue-types';
import PropImage from '../../data/prop-type/media/PropImage';

/**
 * @param {description} heading The heading used on the block
 * @param {description} paragraph The paragraph used on the block
 * @param {description} background The background image used on the block
 * @param {description} secondaryParagraph The secondary paragraph used on the block
 */
export default {
	heading: VueTypes.string.isRequired,
	paragraph: VueTypes.string.isRequired,
	background: VueTypes.shape(PropImage),
	secondaryParagraph: VueTypes.string.isRequired,
};
