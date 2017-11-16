import VueTypes from 'vue-types';
import PropImage from '../../data/prop-type/media/PropImage';
import PropVideo from '../../data/prop-type/media/PropVideo';
import PropLink from '../../data/prop-type/action/PropLink';

/**
 * @param {description} marginTop This defines the amount of spacing at the top of the block
 * @param {description} overlap This defines if a block overlaps the next block on the layout
 * @param {description} windowed This defines if a block has extra padding left and right
 * @param {description} scrollId This unique id is used for scrolling to blocks
 * @param {placeholder} scrollId unique-block-id
 * @param {description} backgroundVideo The background video for the block
 * @param {description} background normal: 1920x768, small: 750x1334
 * @param {description} link The link for the block
 * @param {description} heading The heading for the block
 * @param {description} subHeading The sub heading for the block
 * @param {description} paragraph The paragraph for the block
 * @param {description} backgroundColor The background color for the block
 */
export default {
	marginTop: VueTypes.number.isRequired,
	overlap: VueTypes.bool.isRequired,
	windowed: VueTypes.bool.isRequired,
	scrollId: VueTypes.string,
	backgroundVideo: VueTypes.shape(PropVideo),
	background: VueTypes.shape(PropImage).isRequired,
	link: VueTypes.shape(PropLink),
	heading: VueTypes.string.isRequired,
	subHeading: VueTypes.string,
	paragraph: VueTypes.string.isRequired,
	backgroundColor: VueTypes.string.isRequired,
};
