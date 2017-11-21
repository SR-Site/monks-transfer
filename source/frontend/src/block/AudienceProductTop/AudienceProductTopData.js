import VueTypes from 'vue-types';
import PropImage from '../../data/prop-type/media/PropImage';

/**
 * @param {description} marginTop This defines the amount of spacing at the top of the block
 * @param {description} overlap This defines if a block overlaps the next block on the layout
 * @param {description} windowed This defines if a block has extra padding left and right
 * @param {description} scrollId This unique id is used for scrolling to blocks
 * @param {placeholder} scrollId unique-block-id
 * @param {description} heading The heading of the block
 * @param {description} paragraph The paragraph of the block
 * @param {description} image normal: 960x1424, small: 750x750
 * @param {description} card The card displayed in the block
 * @param {description} card.heading The card heading
 * @param {description} card.paragraph The card paragraph
 */
export default {
	marginTop: VueTypes.number.isRequired,
	overlap: VueTypes.bool.isRequired,
	windowed: VueTypes.bool.isRequired,
	scrollId: VueTypes.string,
	heading: VueTypes.string.isRequired,
	paragraph: VueTypes.string.isRequired,
	image: VueTypes.shape(PropImage).isRequired,
	card: VueTypes.shape({
		heading: VueTypes.string.isRequired,
		paragraph: VueTypes.string.isRequired,
	}).isRequired,
};
