import VueTypes from 'vue-types';

/**
 * @param {description} label The label linked to the step
 * @param {description} heading The heading linked to the step
 * @param {description} paragraph The paragraph linked to the step
 */
export default {
	label: VueTypes.string.isRequired,
	heading: VueTypes.string.isRequired,
	paragraph: VueTypes.string.isRequired,
}
