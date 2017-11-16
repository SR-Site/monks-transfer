import VueTypes from 'vue-types';

/**
 * @param {description} marginTop This defines the amount of spacing at the top of the block
 * @param {description} overlap This defines if a block overlaps the next block on the layout
 * @param {description} windowed This defines if a block has extra padding left and right
 * @param {description} scrollId This unique id is used for scrolling to blocks
 * @param {placeholder} scrollId unique-block-id
 * @param {description} facebook The flag if facebook share should be enabled
 * @param {description} twitter The flag if twitter share should be enabled
 * @param {description} linkedIn The flag if linkedIn share should be enabled
 */
export default {
	marginTop: VueTypes.number.isRequired,
	overlap: VueTypes.bool.isRequired,
	windowed: VueTypes.bool.isRequired,
	scrollId: VueTypes.string,
	facebook: VueTypes.bool.isRequired,
	twitter: VueTypes.bool.isRequired,
	linkedIn: VueTypes.bool.isRequired,
};
