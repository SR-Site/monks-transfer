import VueTypes from 'vue-types';
import PropLink from '../../data/prop-type/action/PropLink';
import PropImage from '../../data/prop-type/media/PropImage';

/**
 * @param {description} marginTop This defines the amount of spacing at the top of the block
 * @param {description} overlap This defines if a block overlaps the next block on the layout
 * @param {description} windowed This defines if a block has extra padding left and right
 * @param {description} scrollId This unique id is used for scrolling to blocks
 * @param {placeholder} scrollId unique-block-id
 * @param {description} heading The heading of the block
 * @param {description} paragraph The paragraph of the block
 * @param {description} primaryLink The primary link of the block
 * @param {description} secondaryLink The secondary link of the block
 * @param {description} backgroundImage The background image of the block
 * @param {description} image The image image of the block
 */
export default {
	marginTop: VueTypes.number.isRequired,
	overlap: VueTypes.bool.isRequired,
	windowed: VueTypes.bool.isRequired,
	scrollId: VueTypes.string,
	alignment: VueTypes.oneOf(
		[0,1,2],
	).isRequired,
	heading: VueTypes.string.isRequired,
	paragraph: VueTypes.string.isRequired,
	primaryLink: VueTypes.shape(PropLink),
	secondaryLink: VueTypes.shape(PropLink),
	backgroundImage: VueTypes.shape(PropImage),
	image: VueTypes.shape(PropImage),
};
