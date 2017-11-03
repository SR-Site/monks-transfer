import VueTypes from 'vue-types';
import BackendLinkType from '../../enum/link/BackendLinkType';

/**
 * @param {description} label The label for the link
 * @param {description} title The title for the link
 * @param {description} target The target for the link
 * @param {placeholder} target path/to/target
 * @param {description} type The type of the link
 */
export default {
	label: VueTypes.string.isRequired,
	title: VueTypes.string.isRequired,
	target: VueTypes.string,
	type: VueTypes.oneOf(
		[
			BackendLinkType.INTERNAL,
			BackendLinkType.EXTERNAL,
			BackendLinkType.SCROLL_TO_NEXT_BLOCK,
			BackendLinkType.CONTACT_US,
			BackendLinkType.EXTERNAL_BLANK,
			BackendLinkType.CONTACT_KERNEL,
		],
	),
};
