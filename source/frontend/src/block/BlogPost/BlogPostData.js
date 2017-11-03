import VueTypes from 'vue-types';
import PropImage from '../../data/prop-type/media/PropImage';
import PropLink from '../../data/prop-type/action/PropLink';
import PropAuthor from '../../data/prop-type/article/PropAuthor';

/**
 * @param {description} marginTop This defines the amount of spacing at the top of the block
 * @param {placeholder} marginTop 1
 * @param {description} overlap This defines if a block overlaps the next block on the layout
 * @param {placeholder} overlap true
 * @param {description} windowed This defines if a block has extra padding left and right
 * @param {placeholder} windowed true
 * @param {description} scrollId This unique id is used for scrolling to blocks
 * @param {placeholder} scrollId unique-block-id
 */
export default {
	marginTop: VueTypes.number.isRequired,
	overlap: VueTypes.bool.isRequired,
	windowed: VueTypes.bool.isRequired,
	scrollId: VueTypes.string,
	social: VueTypes.arrayOf(
		VueTypes.shape(PropLink),
	),
	author: VueTypes.shape(PropAuthor),
	image: VueTypes.shape(PropImage),
	tags: VueTypes.arrayOf(
		VueTypes.shape(PropLink),
	),
	views: VueTypes.number.isRequired,
	shares: VueTypes.number.isRequired,
	time: VueTypes.number.isRequired,
	date: VueTypes.string.isRequired,
	heading: VueTypes.string.isRequired,
	subHeading: VueTypes.string.isRequired,
	paragraph: VueTypes.string.isRequired,
	theme: VueTypes.number.isRequired,
	target: VueTypes.string.isRequired,
};
