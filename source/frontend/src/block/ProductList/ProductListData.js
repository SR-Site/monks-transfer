import VueTypes from 'vue-types';
import ProductTeaserData from './ProductTeaser/ProductTeaserData';

/**
 * @param {description} marginTop This defines the amount of spacing at the top of the block
 * @param {description} overlap This defines if a block overlaps the next block on the layout
 * @param {description} windowed This defines if a block has extra padding left and right
 * @param {description} scrollId This unique id is used for scrolling to blocks
 * @param {placeholder} scrollId unique-block-id
 * @param {description} alignment The alignment of the heading on the block
 * @param {description} heading The heading of the block
 * @param {description} paragraph The paragraph of the block
 * @param {description} products The array of products displayed in the block
 */
export default {
	marginTop: VueTypes.number.isRequired,
	overlap: VueTypes.bool.isRequired,
	windowed: VueTypes.bool.isRequired,
	scrollId: VueTypes.string,
	alignment: VueTypes.oneOf([0, 1, 2]).isRequired,
	heading: VueTypes.string,
	paragraph: VueTypes.string,
	products: VueTypes.arrayOf(VueTypes.shape(ProductTeaserData)),
};
