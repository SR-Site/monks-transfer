import VueTypes from 'vue-types';

/**
 * @param {description} marginTop This defines the amount of spacing at the top of the block
 * @param {description} overlap This defines if a block overlaps the next block on the layout
 * @param {description} windowed This defines if a block has extra padding left and right
 * @param {description} scrollId This unique id is used for scrolling to blocks
 * @param {placeholder} scrollId unique-block-id
 * @param {description} html The content of the free text block
 * @param {description} small A flag to make the content even smaller and align it with the blog post wrapper
 * @param {description} alignment The alignment of the content
 */
export default {
	marginTop: VueTypes.number.isRequired,
	overlap: VueTypes.bool.isRequired,
	windowed: VueTypes.bool.isRequired,
	scrollId: VueTypes.string,
	html: VueTypes.string.isRequired,
	small: VueTypes.bool,
	alignment: VueTypes.oneOf(
		[0, 1, 2],
	).isRequired,
};
