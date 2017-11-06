import VueTypes from 'vue-types';
import PropAuthor from '../../data/prop-type/article/PropAuthor';

/**
 * @param {description} marginTop This defines the amount of spacing at the top of the block
 * @param {description} overlap This defines if a block overlaps the next block on the layout
 * @param {description} windowed This defines if a block has extra padding left and right
 * @param {description} scrollId This unique id is used for scrolling to blocks
 * @param {placeholder} scrollId unique-block-id
 * @param {description} quote The desired quote
 * @param {description} author The author of the quote
 */
export default {
	marginTop: VueTypes.number.isRequired,
	overlap: VueTypes.bool.isRequired,
	windowed: VueTypes.bool.isRequired,
	scrollId: VueTypes.string,
	quote: VueTypes.string.isRequired,
	author: VueTypes.shape(PropAuthor),
};
