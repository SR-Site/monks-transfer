import VueTypes from 'vue-types';
import PropImageSequence from '../../data/prop-type/media/PropImageSequence';
import PropImage from '../../data/prop-type/media/PropImage';
import MapStepData from './MapStepData';

/**
 * @param {description} marginTop This defines the amount of spacing at the top of the block
 * @param {description} overlap This defines if a block overlaps the next block on the layout
 * @param {description} windowed This defines if a block has extra padding left and right
 * @param {description} scrollId This unique id is used for scrolling to blocks
 * @param {placeholder} scrollId unique-block-id
 * @param {description} imageSequence The image sequence linked to the map
 * @param {description} sequenceBackground The sequence background linked to the map
 * @param {description} steps The array of steps linked to the map
 */
export default {
	marginTop: VueTypes.number.isRequired,
	overlap: VueTypes.bool.isRequired,
	windowed: VueTypes.bool.isRequired,
	scrollId: VueTypes.string,
	imageSequence: VueTypes.shape(PropImageSequence).isRequired,
	sequenceBackground: VueTypes.shape(PropImage),
	steps: VueTypes.arrayOf(VueTypes.shape(MapStepData)),
};
