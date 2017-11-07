import VueTypes from 'vue-types';
import PropLink from '../../data/prop-type/action/PropLink';
import PropImage from '../../data/prop-type/media/PropImage';
import PropVideo from '../../data/prop-type/media/PropVideo';

/**
 * @param {description} marginTop This defines the amount of spacing at the top of the block
 * @param {placeholder} marginTop 1
 * @param {description} overlap This defines if a block overlaps the next block on the layout
 * @param {placeholder} overlap true
 * @param {description} windowed This defines if a block has extra padding left and right
 * @param {placeholder} windowed true
 * @param {description} scrollId This unique id is used for scrolling to blocks
 * @param {placeholder} scrollId unique-block-id
 * @param {description} heading The heading of the the block
 * @param {description} paragraph The paragraph of the the block
 * @param {description} link The link attached to the block
 * @param {description} poster The poster image for the block
 * @param {description} video The video for the block
 */
export default {
	marginTop: VueTypes.number.isRequired,
	overlap: VueTypes.bool.isRequired,
	windowed: VueTypes.bool.isRequired,
	scrollId: VueTypes.string,
	heading: VueTypes.string.isRequired,
	paragraph: VueTypes.string.isRequired,
	link: VueTypes.shape(PropLink),
	poster: VueTypes.shape(PropImage),
	video: VueTypes.shape(PropVideo),
};
