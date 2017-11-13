import VueTypes from 'vue-types';
import PropImage from '../../data/prop-type/media/PropImage';

/**
 * @param {description} marginTop This defines the amount of spacing at the top of the block
 * @param {description} overlap This defines if a block overlaps the next block on the layout
 * @param {description} windowed This defines if a block has extra padding left and right
 * @param {description} scrollId This unique id is used for scrolling to blocks
 * @param {placeholder} scrollId unique-block-id
 * @param {description} network The network value for the show
 * @param {description} network.label The category label
 * @param {description} network.image The network logo
 * @param {description} airTime.label The category label
 * @param {description} airTime.image The air time value
 * @param {description} ageRestriction.label The category label
 * @param {description} ageRestriction.image The age restriction label
 */
export default {
	marginTop: VueTypes.number.isRequired,
	overlap: VueTypes.bool.isRequired,
	windowed: VueTypes.bool.isRequired,
	scrollId: VueTypes.string,
	heading: VueTypes.string.isRequired,
	paragraph: VueTypes.string.isRequired,
	network: VueTypes.shape(
		{
			label: VueTypes.string.isRequired,
			image: VueTypes.shape(PropImage).isRequired,
		},
	).isRequired,
	airTime: VueTypes.shape(
		{
			label: VueTypes.string.isRequired,
			value: VueTypes.string.isRequired,
		},
	).isRequired,
	ageRestriction: VueTypes.shape(
		{
			label: VueTypes.string.isRequired,
			image: VueTypes.shape(PropImage).isRequired,
		},
	).isRequired,
};
