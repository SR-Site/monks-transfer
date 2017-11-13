import VueTypes from 'vue-types';
import GlossaryBItemData from './GlossaryBItemData';

/**
 * @param {description} marginTop This defines the amount of spacing at the top of the block
 * @param {description} overlap This defines if a block overlaps the next block on the layout
 * @param {description} windowed This defines if a block has extra padding left and right
 * @param {description} scrollId This unique id is used for scrolling to blocks
 * @param {placeholder} scrollId unique-block-id
 * @param {description} showMoreLabel The call to action label for the show more button
 * @param {description} landingCategory The default active category of the tabs
 * @param {description} searchPlaceholder The search placeholder value
 * @param {description} items The array of glossary items displayed in the hero block
 */
export default {
	marginTop: VueTypes.number.isRequired,
	overlap: VueTypes.bool.isRequired,
	windowed: VueTypes.bool.isRequired,
	scrollId: VueTypes.string,
	showMoreLabel: VueTypes.string.isRequired,
	landingCategory: VueTypes.string.isRequired,
	searchPlaceholder: VueTypes.string.isRequired,
	items: VueTypes.arrayOf(
		VueTypes.shape(GlossaryBItemData),
	),
};
