import VueTypes from 'vue-types';
import PropImage from '../../data/prop-type/media/PropImage';
import PropVideo from '../../data/prop-type/media/PropVideo';

/**
 * @param {description} marginTop This defines the amount of spacing at the top of the block
 * @param {description} overlap This defines if a block overlaps the next block on the layout
 * @param {description} windowed This defines if a block has extra padding left and right
 * @param {description} scrollId This unique id is used for scrolling to blocks
 * @param {placeholder} scrollId unique-block-id
 * @param {description} background The background image for the block
 * @param {description} backgroundVideo The background video for the block
 */
export default {
	marginTop: VueTypes.number.isRequired,
	overlap: VueTypes.bool.isRequired,
	windowed: VueTypes.bool.isRequired,
	scrollId: VueTypes.string,
	background: VueTypes.shape(PropImage).isRequired,
	backgroundVideo: VueTypes.shape(PropVideo),
};
