import VueTypes from 'vue-types';
import PropFilter from '../../data/prop-type/action/PropFilter';

/**
 * @param {description} marginTop This defines the amount of spacing at the top of the block
 * @param {description} overlap This defines if a block overlaps the next block on the layout
 * @param {description} windowed This defines if a block has extra padding left and right
 * @param {description} scrollId This unique id is used for scrolling to blocks
 * @param {placeholder} scrollId unique-block-id
 * @param {description} filters The array of filters attached to the filter content
 * @param {description} closeLabel The label displayed to close the filters
 * @param {description} filterLabel The label displayed to indicate the filters
 * @param {description} endpoint The endpoint used for fetching data from the backend
 */
export default {
	marginTop: VueTypes.number.isRequired,
	overlap: VueTypes.bool.isRequired,
	windowed: VueTypes.bool.isRequired,
	scrollId: VueTypes.string,
	closeLabel: VueTypes.string.isRequired,
	filterLabel: VueTypes.string.isRequired,
	endpoint: VueTypes.string.isRequired,
	filters: VueTypes.arrayOf(VueTypes.shape(PropFilter).isRequired),
};
