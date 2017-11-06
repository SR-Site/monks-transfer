import VueTypes from 'vue-types';
import PropImage from '../../data/prop-type/media/PropImage';

/**
 * @param {description} marginTop This defines the amount of spacing at the top of the block
 * @param {description} overlap This defines if a block overlaps the next block on the layout
 * @param {description} windowed This defines if a block has extra padding left and right
 * @param {description} scrollId This unique id is used for scrolling to blocks
 * @param {placeholder} scrollId unique-block-id
 * @param {description} heading The heading for the audio fragment
 * @param {description} name The name of the audio fragment
 * @param {description} description the description on the audio fragment
 * @param {description} image The image for the audio fragment
 * @param {description} file The audio file
 * @param {placeholder} file path/to/file.mp3
 */
export default {
	marginTop: VueTypes.number.isRequired,
	overlap: VueTypes.bool.isRequired,
	windowed: VueTypes.bool.isRequired,
	scrollId: VueTypes.string,
	heading: VueTypes.string.isRequired,
	name: VueTypes.string.isRequired,
	description: VueTypes.string.isRequired,
	image: VueTypes.shape(PropImage).isRequired,
	file: VueTypes.string.isRequired,
};
