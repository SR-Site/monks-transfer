import VueTypes from 'vue-types';

/**
 * @param {description} marginTop This defines the amount of spacing at the top of the block
 * @param {description} overlap This defines if a block overlaps the next block on the layout
 * @param {description} windowed This defines if a block has extra padding left and right
 * @param {description} scrollId This unique id is used for scrolling to blocks
 * @param {placeholder} scrollId unique-block-id
 * @param {description} inf the info box
 * @param {description} info.heading The heading for the info box
 * @param {description} info.copy The copy for the info box
 * @param {description} contactButton the label for the contact button
 * @param {description} service.cta the cta label
 * @param {description} searchLabel The label for the search field
 * @param {description} searchPlaceholder The placeholder for the search field
 * @param {description} notFoundMessage The not found message when no results are found
 */
export default {
	marginTop: VueTypes.number.isRequired,
	overlap: VueTypes.bool.isRequired,
	windowed: VueTypes.bool.isRequired,
	scrollId: VueTypes.string,
	info: VueTypes.shape({
		heading: VueTypes.string.isRequired,
		copy: VueTypes.string.isRequired,
	}),
	contactButton: VueTypes.string.isRequired,
	searchLabel: VueTypes.string.isRequired,
	searchPlaceholder: VueTypes.string.isRequired,
	notFoundMessage: VueTypes.string.isRequired,
};
