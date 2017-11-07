import VueTypes from 'vue-types';

/**
 * @param {description} marginTop This defines the amount of spacing at the top of the block
 * @param {description} overlap This defines if a block overlaps the next block on the layout
 * @param {description} windowed This defines if a block has extra padding left and right
 * @param {description} scrollId This unique id is used for scrolling to blocks
 * @param {placeholder} scrollId unique-block-id
 * @param {description} items The array of items displayed in the block
 */
export default {
	value: VueTypes.string.isRequired,
	label: VueTypes.string.isRequired,
	paragraph: VueTypes.string.isRequired,
};
