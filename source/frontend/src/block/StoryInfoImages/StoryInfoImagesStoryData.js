import VueTypes from 'vue-types';
import PropImage from '../../data/prop-type/media/PropImage';

/**
 * @param {description} heading The heading displayed on the story
 * @param {description} paragraph The paragraph displayed on the story
 * @param {description} background The background displayed on the story
 * @param {description} backgroundBlurred The blurred version of the background
 * @param {description} theme The theme of the story
 */
export default {
	heading: VueTypes.string.isRequired,
	paragraph: VueTypes.string.isRequired,
	background: VueTypes.shape(PropImage),
	backgroundBlurred: VueTypes.shape(PropImage),
	theme: VueTypes.number.isRequired,
};
