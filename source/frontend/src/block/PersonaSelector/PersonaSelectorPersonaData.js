import VueTypes from 'vue-types';
import PropLink from '../../data/prop-type/action/PropLink';
import PropImage from '../../data/prop-type/media/PropImage';

/**
 * @param {description} heading The heading displayed on the persona
 * @param {description} paragraph The paragraph displayed on the persona
 * @param {description} personaType The type of the persona
 * @param {description} link The link displayed on the persona
 * @param {description} image normal: 1920x1056, small: 750x585
 */
export default {
	heading: VueTypes.string.isRequired,
	paragraph: VueTypes.string.isRequired,
	personaType: VueTypes.oneOf(
		[
			0,
			1,
			2,
			3,
		],
	).isRequired,
	link: VueTypes.shape(PropLink).isRequired,
	image: VueTypes.shape(PropImage).isRequired,
};
