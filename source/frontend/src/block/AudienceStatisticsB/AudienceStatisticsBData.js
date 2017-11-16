import VueTypes from 'vue-types';
import PropImage from '../../data/prop-type/media/PropImage';
import AudienceStatisticData from './AudienceStatisticData';

/**
 * @param {description} marginTop This defines the amount of spacing at the top of the block
 * @param {description} overlap This defines if a block overlaps the next block on the layout
 * @param {description} windowed This defines if a block has extra padding left and right
 * @param {description} scrollId This unique id is used for scrolling to blocks
 * @param {placeholder} scrollId unique-block-id
 * @param {description} heading The heading of the block
 * @param {description} paragraph The paragraph of the block
 * @param {description} cta The cta label of the block
 * @param {description} background normal: 1920x960, small: 640x1040
 * @param {description} statistics The statistics of the block
 */
export default {
	marginTop: VueTypes.number.isRequired,
	overlap: VueTypes.bool.isRequired,
	windowed: VueTypes.bool.isRequired,
	scrollId: VueTypes.string,
	heading: VueTypes.string.isRequired,
	paragraph: VueTypes.string.isRequired,
	cta: VueTypes.string.isRequired,
	background: VueTypes.shape(PropImage).isRequired,
	statistics: VueTypes.arrayOf(
		VueTypes.shape(AudienceStatisticData)
	).isRequired,
};
