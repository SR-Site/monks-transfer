import VueTypes from 'vue-types';
import PropLink from '../../data/prop-type/action/PropLink';
import PropImage from '../../data/prop-type/media/PropImage';

/**
 * @param {description} marginTop This defines the amount of spacing at the top of the block
 * @param {description} overlap This defines if a block overlaps the next block on the layout
 * @param {description} windowed This defines if a block has extra padding left and right
 * @param {description} scrollId This unique id is used for scrolling to blocks
 * @param {placeholder} scrollId unique-block-id
 * @param {description} heading The heading of the the block
 * @param {description} paragraph The paragraph of the block
 * @param {description} fileDescription The description of the file including the size and type
 * @param {description} link The link to the download of the file
 * @param {description} image normal: 240x240, small: 240x240
 */
export default {
	marginTop: VueTypes.number.isRequired,
	overlap: VueTypes.bool.isRequired,
	windowed: VueTypes.bool.isRequired,
	scrollId: VueTypes.string,
	heading: VueTypes.string.isRequired,
	fileDescription: VueTypes.string.isRequired,
	link: VueTypes.shape(PropLink).isRequired,
	image: VueTypes.shape(PropImage).isRequired,
};
