import VueTypes from 'vue-types';
import PropLink from '../../data/prop-type/action/PropLink';
import PropImage from '../../data/prop-type/media/PropImage';
import PropAuthor from '../../data/prop-type/article/PropAuthor';

/**
 * @param {description} marginTop This defines the amount of spacing at the top of the block
 * @param {description} overlap This defines if a block overlaps the next block on the layout
 * @param {description} windowed This defines if a block has extra padding left and right
 * @param {description} scrollId This unique id is used for scrolling to blocks
 * @param {placeholder} scrollId unique-block-id
 * @param {description} heading This is the heading for the block
 * @param {description} subHeading This is the sub heading for the block
 * @param {description} paragraph This is the sub heading for the block
 * @param {description} target This is the target for the article
 * @param {placeholder} target link/to/article
 * @param {description} image This is the image linked to the article
 * @param {description} tags The tags linked to this article
 * @param {description} theme The theme for this article
 * @param {description} author The author of the article
 * @param {description} link The link attached to the article
 * @param {description} social The list of social links attached to the article
 * @param {description} views The view count of the article
 * @param {description} time The reading duration of the article
 * @param {description} date The publish date of the article
 * @param {placeholder} date 27/05/1990
 */
export default {
	marginTop: VueTypes.number.isRequired,
	overlap: VueTypes.bool.isRequired,
	windowed: VueTypes.bool.isRequired,
	scrollId: VueTypes.string,
	heading: VueTypes.string.isRequired,
	subHeading: VueTypes.string,
	paragraph: VueTypes.string.isRequired,
	target: VueTypes.string.isRequired,
	image: VueTypes.shape(PropImage),
	tags: VueTypes.arrayOf(
		VueTypes.shape(PropLink)
	),
	theme: VueTypes.number.isRequired,
	author: VueTypes.shape(PropAuthor),
	link: VueTypes.shape(PropLink),
	social: VueTypes.arrayOf(
		VueTypes.shape(PropLink)
	),
	views: VueTypes.number.isRequired,
	time: VueTypes.number.isRequired,
	date: VueTypes.string.isRequired,
};
