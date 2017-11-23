import VueTypes from 'vue-types';
import PropLink from '../../data/prop-type/action/PropLink';
import PropImage from '../../data/prop-type/media/PropImage';
import PropVideo from '../../data/prop-type/media/PropVideo';

/**
 * @param {description} marginTop This defines the amount of spacing at the top of the block
 * @param {description} overlap This defines if a block overlaps the next block on the layout
 * @param {description} windowed This defines if a block has extra padding left and right
 * @param {description} scrollId This unique id is used for scrolling to blocks
 * @param {placeholder} scrollId unique-block-id
 * @param {description} heading The heading of the the block
 * @param {description} paragraph The paragraph of the the block
 * @param {description} link The link attached to the block
 * @param {description} poster normal: 1920x720, small: 1280x720
 * @param {description} video The video for the block
 */
export default {
	marginTop: VueTypes.number.isRequired,
	overlap: VueTypes.bool.isRequired,
	windowed: VueTypes.bool.isRequired,
	scrollId: VueTypes.string,
	alignment: VueTypes.oneOf([0, 1, 2]).isRequired,
	heading: VueTypes.string.isRequired,
	paragraph: VueTypes.string.isRequired,
	link: VueTypes.shape(PropLink),
	poster: VueTypes.shape(PropImage),
	video: VueTypes.shape(PropVideo),
};
