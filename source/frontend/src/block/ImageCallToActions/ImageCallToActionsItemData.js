import VueTypes from 'vue-types';
import PropImage from '../../data/prop-type/media/PropImage';
import PropLink from '../../data/prop-type/action/PropLink';

/**
 * @param {description} heading The heading for the call to action
 * @param {description} paragraph The paragraph for the call to action
 * @param {description} background the background for the call to action
 * @param {description} backgroundBlurred The blurred background image for the call to action
 * @param {description} link The link for the call to action
 */
export default {
	heading: VueTypes.string.isRequired,
	paragraph: VueTypes.string.isRequired,
	background: VueTypes.shape(PropImage).isRequired,
	backgroundBlurred: VueTypes.shape(PropImage).isRequired,
	link: VueTypes.shape(PropLink).isRequired,
};
