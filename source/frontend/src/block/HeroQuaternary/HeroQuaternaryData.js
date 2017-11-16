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
 * @param {description} background normal: 1440x520, small: 750x1050
 * @param {description} backgroundVideo The background video for the block
 * @param {description} link The link attached to the hero
 * @param {description} heading The heading displayed on the hero
 * @param {description} subHeading The sub heading displayed on the hero
 * @param {description} paragraph The paragraph displayed on the hero
 */
export default {
	marginTop: VueTypes.number.isRequired,
	overlap: VueTypes.bool.isRequired,
	windowed: VueTypes.bool.isRequired,
	scrollId: VueTypes.string,
	background: VueTypes.shape(PropImage).isRequired,
	backgroundVideo: VueTypes.shape(PropVideo),
	image: VueTypes.shape(PropImage),
	link: VueTypes.shape(PropLink),
	heading: VueTypes.string.isRequired,
	subHeading: VueTypes.string.isRequired,
	paragraph: VueTypes.string.isRequired,
};
