import VueTypes from 'vue-types';
import PropImage from '../../data/prop-type/media/PropImage';

/**
 * @param {description} heading The heading displayed on the story
 * @param {description} paragraph The paragraph displayed on the story
 * @param {description} background normal: 1440x760, small: 1440x760
 * @param {description} backgroundBlurred normal: 1440x760, small: 1440x760
 * @param {description} theme The theme of the story
 */
export default {
	heading: VueTypes.string.isRequired,
	paragraph: VueTypes.string.isRequired,
	background: VueTypes.shape(PropImage),
	backgroundBlurred: VueTypes.shape(PropImage),
	theme: VueTypes.number.isRequired,
};
