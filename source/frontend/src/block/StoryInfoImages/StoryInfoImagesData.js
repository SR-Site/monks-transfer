import VueTypes from 'vue-types';
import StoryInfoImagesStoryData from './StoryInfoImagesStoryData';

/**
 * @param {description} marginTop This defines the amount of spacing at the top of the block
 * @param {description} overlap This defines if a block overlaps the next block on the layout
 * @param {description} windowed This defines if a block has extra padding left and right
 * @param {description} stories The array of stories used in this block
 * @param {description} stories.heading The heading for the story
 * @param {description} stories.paragraph The paragraph for the story
 * @param {description} stories.background The background image for the story
 * @param {description} stories.backgroundBlurred The blurred background image for the story
 * @param {description} stories.theme The theme for the story
 * @param {description} scrollId This unique id is used for scrolling to blocks
 * @param {placeholder} scrollId unique-block-id
 * @param {description} stories The stories displayed in the block
 */
export default {
	marginTop: VueTypes.number.isRequired,
	overlap: VueTypes.bool.isRequired,
	windowed: VueTypes.bool.isRequired,
	scrollId: VueTypes.string,
	stories: VueTypes.arrayOf(VueTypes.shape(StoryInfoImagesStoryData)),
};
