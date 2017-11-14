import VueTypes from 'vue-types';
import SuccessStoryImpactStatisticData from './SuccessStoryImpactStatisticData';

/**
 * @param {description} marginTop This defines the amount of spacing at the top of the block
 * @param {description} overlap This defines if a block overlaps the next block on the layout
 * @param {description} windowed This defines if a block has extra padding left and right
 * @param {description} scrollId This unique id is used for scrolling to blocks
 * @param {placeholder} scrollId unique-block-id
 * @param {description} statistics The array of statistics displayed in the block
 */
export default {
	marginTop: VueTypes.number.isRequired,
	overlap: VueTypes.bool.isRequired,
	windowed: VueTypes.bool.isRequired,
	scrollId: VueTypes.string,
	statistics: VueTypes.arrayOf(
		VueTypes.shape(SuccessStoryImpactStatisticData),
	),
};
