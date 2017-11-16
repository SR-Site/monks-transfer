import VueTypes from 'vue-types';
import PropLink from '../../../data/prop-type/action/PropLink';
import PropImage from '../../../data/prop-type/media/PropImage';

/**
 * @param {description} label The label of the statistic
 * @param {description} value The value of the statistic
 * @param {description} link The link to the audience profile
 * @param {description} background normal: 720x560, small: 640x640
 */
export default {
	label: VueTypes.string.isRequired,
	value: VueTypes.string.isRequired,
	link: VueTypes.shape(PropLink).isRequired,
	background: VueTypes.shape(PropImage).isRequired,
};
