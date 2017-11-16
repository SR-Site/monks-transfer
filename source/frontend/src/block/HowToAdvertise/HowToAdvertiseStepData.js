import VueTypes from 'vue-types';

/**
 * @param {description} heading The heading of the advertisement step
 * @param {description} paragraph The paragraph of the advertisement step
 * @param {description} icon The name of the icon (triangle-advertise-icon-1,
 * triangle-advertise-icon-2,triangle-advertise-icon-3,triangle-advertise-icon-4)
 */
export default {
	heading: VueTypes.string.isRequired,
	paragraph: VueTypes.string.isRequired,
	icon: VueTypes.string.isRequired,
};
