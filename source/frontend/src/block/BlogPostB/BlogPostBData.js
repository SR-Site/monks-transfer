import VueTypes from 'vue-types';

/**
 * @param {description} marginTop This defines the amount of spacing at the top of the block
 * @param {description} overlap This defines if a block overlaps the next block on the layout
 * @param {description} windowed This defines if a block has extra padding left and right
 * @param {description} scrollId This unique id is used for scrolling to blocks
 * @param {placeholder} scrollId unique-block-id
 * @param {description} heading The heading of the block
 * @param {description} items The items displayed in the post
 * @param {description} items.heading The heading for the item
 * @param {description} items.paragraph The paragraph for the item
 */
export default {
	marginTop: VueTypes.number.isRequired,
	overlap: VueTypes.bool.isRequired,
	windowed: VueTypes.bool.isRequired,
	scrollId: VueTypes.string,
	heading: VueTypes.string.isRequired,
	items: VueTypes.arrayOf(
		VueTypes.shape({
			heading: VueTypes.string.isRequired,
			paragraph: VueTypes.string.isRequired,
		}),
	).isRequired,
};
