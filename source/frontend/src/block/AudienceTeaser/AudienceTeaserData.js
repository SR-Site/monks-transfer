import VueTypes from 'vue-types';
import PropImage from '../../data/prop-type/media/PropImage';
import PropVideo from '../../data/prop-type/media/PropVideo';

/**
 * @param {description} marginTop This defines the amount of spacing at the top of the block
 * @param {description} overlap This defines if a block overlaps the next block on the layout
 * @param {description} windowed This defines if a block has extra padding left and right
 * @param {description} scrollId This unique id is used for scrolling to blocks
 * @param {placeholder} scrollId unique-block-id
 * @param {description} image The heading of the category
 * @param {description} video The paragraph of the category
 * @param {description} heading The heading of the audience teaser block
 * @param {description} subHeading The sub heading of the teaser
 * @param {description} paragraph The paragraph of the teaser
 * @param {description} reaches The list of reaches, should be strings
 * @param {description} target The path to the detail page
 * @param {description} imageStyle The style of the image cover or contain
 * @param {description} logo The logo fo the teaser
 */
export default {
	marginTop: VueTypes.number.isRequired,
	overlap: VueTypes.bool.isRequired,
	windowed: VueTypes.bool.isRequired,
	scrollId: VueTypes.string,
	image: VueTypes.shape(PropImage).isRequired,
	video: VueTypes.shape(PropVideo),
	heading: VueTypes.string.isRequired,
	subHeading: VueTypes.string,
	paragraph: VueTypes.string,
	reaches: VueTypes.array,
	target: VueTypes.string,
	imageStyle: VueTypes.string.isRequired,
	logo: VueTypes.shape(PropImage),
};
