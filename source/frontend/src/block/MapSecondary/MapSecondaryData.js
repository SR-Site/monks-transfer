import VueTypes from 'vue-types';
import PropLink from '../../data/prop-type/action/PropLink';
import PropImage from '../../data/prop-type/media/PropImage';
import PropImageSequence from '../../data/prop-type/media/PropImageSequence';

/**
 * @param {description} marginTop This defines the amount of spacing at the top of the block
 * @param {description} overlap This defines if a block overlaps the next block on the layout
 * @param {description} windowed This defines if a block has extra padding left and right
 * @param {description} scrollId This unique id is used for scrolling to blocks
 * @param {placeholder} scrollId unique-block-id
 * @param {description} heading The heading linked to the map
 * @param {description} subHeading The sub heading linked to the map
 * @param {description} paragraph The paragraph linked to the map
 * @param {description} link The link linked to the map
 * @param {description} sequenceBackground The sequence background image linked to the map
 * @param {description} imageSequence The image sequence linked to the map
 */
export default {
	marginTop: VueTypes.number.isRequired,
	overlap: VueTypes.bool.isRequired,
	windowed: VueTypes.bool.isRequired,
	scrollId: VueTypes.string,
	heading: VueTypes.string.isRequired,
	subHeading: VueTypes.string.isRequired,
	paragraph: VueTypes.string.isRequired,
	link: VueTypes.shape(PropLink),
	sequenceBackground: VueTypes.shape(PropImage),
	imageSequence: VueTypes.shape(PropImageSequence),
};
