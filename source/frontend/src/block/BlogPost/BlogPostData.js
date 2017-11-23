import VueTypes from 'vue-types';
import PropImage from '../../data/prop-type/media/PropImage';
import PropLink from '../../data/prop-type/action/PropLink';
import PropAuthor from '../../data/prop-type/article/PropAuthor';

/**
 * @param {description} marginTop This defines the amount of spacing at the top of the block
 * @param {description} overlap This defines if a block overlaps the next block on the layout
 * @param {description} windowed This defines if a block has extra padding left and right
 * @param {description} scrollId This unique id is used for scrolling to blocks
 * @param {placeholder} scrollId unique-block-id
 * @param {description} social The array of social links
 * @param {description} author The author of the article
 * @param {description} image normal: 1280x270, small: 1280x720
 * @param {description} tags The tags linked to the article
 * @param {description} views The views of the article
 * @param {description} time The reading time of the article
 * @param {description} date The publish date of the article
 * @param {description} heading The heading of the article
 * @param {description} subHeading The sub heading of the article
 * @param {description} paragraph The paragraph of the article
 * @param {description} theme The theme of the article
 * @param {description} target The target link of the article
 */
export default {
	marginTop: VueTypes.number.isRequired,
	overlap: VueTypes.bool.isRequired,
	windowed: VueTypes.bool.isRequired,
	scrollId: VueTypes.string,
	social: VueTypes.arrayOf(VueTypes.shape(PropLink)),
	author: VueTypes.shape(PropAuthor),
	image: VueTypes.shape(PropImage),
	tags: VueTypes.arrayOf(VueTypes.shape(PropLink)),
	views: VueTypes.number.isRequired,
	time: VueTypes.number.isRequired,
	date: VueTypes.string.isRequired,
	heading: VueTypes.string.isRequired,
	subHeading: VueTypes.string.isRequired,
	paragraph: VueTypes.string.isRequired,
	theme: VueTypes.number.isRequired,
	target: VueTypes.string.isRequired,
};
