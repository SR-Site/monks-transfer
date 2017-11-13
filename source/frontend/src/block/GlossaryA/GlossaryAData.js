import VueTypes from 'vue-types';
import GlossaryItemData from './GlossaryItem/GlossaryItemData';
import PropLink from '../../data/prop-type/action/PropLink';

/**
 * @param {description} marginTop This defines the amount of spacing at the top of the block
 * @param {description} overlap This defines if a block overlaps the next block on the layout
 * @param {description} windowed This defines if a block has extra padding left and right
 * @param {description} scrollId This unique id is used for scrolling to blocks
 * @param {placeholder} scrollId unique-block-id
 * @param {description} heading The heading of the block
 * @param {description} paragraph The paragraph of the block
 * @param {description} link
 * @param {description} slides The array of slides displayed in the block
 */
export default {
	marginTop: VueTypes.number.isRequired,
	overlap: VueTypes.bool.isRequired,
	windowed: VueTypes.bool.isRequired,
	scrollId: VueTypes.string,
	heading: VueTypes.string.isRequired,
	paragraph: VueTypes.string.isRequired,
	link: VueTypes.shape(PropLink),
	items: VueTypes.arrayOf(
		VueTypes.shape(GlossaryItemData),
	),
};
