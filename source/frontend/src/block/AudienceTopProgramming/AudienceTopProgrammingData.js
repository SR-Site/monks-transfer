import VueTypes from 'vue-types';
import AudienceTopProgrammingSlideData from './AudienceTopProgrammingSlide/AudienceTopProgrammingSlideData';

/**
 * @param {description} marginTop This defines the amount of spacing at the top of the block
 * @param {description} overlap This defines if a block overlaps the next block on the layout
 * @param {description} windowed This defines if a block has extra padding left and right
 * @param {description} scrollId This unique id is used for scrolling to blocks
 * @param {placeholder} scrollId unique-block-id
 * @param {description} alignment The alignment of the heading
 * @param {description} slides The array of slides displayed in the hero block
 */
export default {
	marginTop: VueTypes.number.isRequired,
	overlap: VueTypes.bool.isRequired,
	windowed: VueTypes.bool.isRequired,
	scrollId: VueTypes.string,
	alignment: VueTypes.oneOf(
		[0, 1, 2],
	).isRequired,
	heading: VueTypes.string.isRequired,
	paragraph: VueTypes.string.isRequired,
	slides: VueTypes.arrayOf(
		VueTypes.shape(AudienceTopProgrammingSlideData),
	),
};
