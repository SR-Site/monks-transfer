import VueTypes from 'vue-types';
import PropLink from '../../data/prop-type/action/PropLink';
import HowToAdvertiseStepData from './HowToAdvertiseStepData';

/**
 * @param {description} marginTop This defines the amount of spacing at the top of the block
 * @param {description} overlap This defines if a block overlaps the next block on the layout
 * @param {description} windowed This defines if a block has extra padding left and right
 * @param {description} scrollId This unique id is used for scrolling to blocks
 * @param {placeholder} scrollId unique-block-id
 * @param {description} steps The array of steps displayed on the block
 */

export default {
	marginTop: VueTypes.number.isRequired,
	overlap: VueTypes.bool.isRequired,
	windowed: VueTypes.bool.isRequired,
	scrollId: VueTypes.string,
	link: VueTypes.shape(PropLink),
	heading: VueTypes.string.isRequired,
	steps: VueTypes.arrayOf(
		VueTypes.shape(HowToAdvertiseStepData)
	)
};
