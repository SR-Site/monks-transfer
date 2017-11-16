import VueTypes from 'vue-types';
import PropLink from '../../../data/prop-type/action/PropLink';
import PropImage from '../../../data/prop-type/media/PropImage';

/**
 * @param {description} background normal: 750x750, small: 750x750
 * @param {description} heading The heading for the nav item
 * @param {description} paragraph The paragraph for the nav item
 * @param {description} link The link for the nav item
 */
export default {
	background: VueTypes.shape(PropImage).isRequired,
	heading: VueTypes.string.isRequired,
	paragraph: VueTypes.string.isRequired,
	link: VueTypes.shape(PropLink),
};
