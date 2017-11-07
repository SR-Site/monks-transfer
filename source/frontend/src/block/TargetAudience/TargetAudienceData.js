import VueTypes from 'vue-types';
import TargetAudienceDeviceData from './TargetAudienceDeviceData';
import PropImage from '../../data/prop-type/media/PropImage';

/**
 * @param {description} marginTop This defines the amount of spacing at the top of the block
 * @param {description} overlap This defines if a block overlaps the next block on the layout
 * @param {description} windowed This defines if a block has extra padding left and right
 * @param {description} scrollId This unique id is used for scrolling to blocks
 * @param {placeholder} scrollId unique-block-id
 * @param {description} backgroundImage The background image of the block
 * @param {description} devices The array of devices displayed in the block
 */
export default {
	marginTop: VueTypes.number.isRequired,
	overlap: VueTypes.bool.isRequired,
	windowed: VueTypes.bool.isRequired,
	scrollId: VueTypes.string,
	heading: VueTypes.string.isRequired,
	backgroundImage: VueTypes.shape(PropImage),
	devices: VueTypes.arrayOf(TargetAudienceDeviceData),
};
