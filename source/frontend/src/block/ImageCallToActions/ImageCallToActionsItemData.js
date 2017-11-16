import VueTypes from 'vue-types';
import PropImage from '../../data/prop-type/media/PropImage';
import PropLink from '../../data/prop-type/action/PropLink';

/**
 * @param {description} heading The heading for the call to action
 * @param {description} paragraph The paragraph for the call to action
 * @param {description} background normal: 1920x640, small: 750x435
 * @param {description} backgroundBlurred normal: 1920x640, small: 750x435
 * @param {description} link The link for the call to action
 */
export default {
	heading: VueTypes.string.isRequired,
	paragraph: VueTypes.string.isRequired,
	background: VueTypes.shape(PropImage).isRequired,
	backgroundBlurred: VueTypes.shape(PropImage).isRequired,
	link: VueTypes.shape(PropLink).isRequired,
};
