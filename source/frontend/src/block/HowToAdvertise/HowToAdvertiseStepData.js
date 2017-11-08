import VueTypes from 'vue-types';

/**
 * @param {description} heading The heading of the advertisement step
 * @param {description} paragraph The paragraph of the advertisement step
 * @param {description} icon The icon of the advertisement step
 */
export default {
	heading: VueTypes.string.isRequired,
	paragraph: VueTypes.string.isRequired,
	icon: VueTypes.string.isRequired,
}
