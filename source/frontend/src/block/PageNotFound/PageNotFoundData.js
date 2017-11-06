import VueTypes from 'vue-types';
import PropLink from '../../data/prop-type/action/PropLink';
import PropImage from '../../data/prop-type/media/PropImage';

/**
 * @param {description} marginTop This defines the amount of spacing at the top of the block
 * @param {description} overlap This defines if a block overlaps the next block on the layout
 * @param {description} windowed This defines if a block has extra padding left and right
 * @param {description} scrollId This unique id is used for scrolling to blocks
 * @param {placeholder} scrollId unique-block-id
 * @param {description} link The link of the not found block
 * @param {description} image The image on the not found block
 * @param {description} paragraph The paragraph on the not found block
 * @param {description} heading The heading on the not found block
 * @param {description} errorCode The error code displayed on the block
 */
export default {
	marginTop: VueTypes.number.isRequired,
	overlap: VueTypes.bool.isRequired,
	windowed: VueTypes.bool.isRequired,
	scrollId: VueTypes.string,
	link: VueTypes.shape(PropLink).isRequired,
	image: VueTypes.shape(PropImage).isRequired,
	paragraph: VueTypes.string.isRequired,
	heading: VueTypes.string.isRequired,
	errorCode: VueTypes.number.isRequired,
};
