import VueTypes from 'vue-types';
import MultipleImagesMediaData from './MultipleImagesMedia/MultipleImagesMediaData';
import MultipleImagesSkillsData from './MultipleImagesSkills/MultipleImagesSkillsData';
import MultipleImagesCallToActionData from './MultipleImagesCallToAction/MultipleImagesCallToActionData';

/**
 * @param {description} marginTop This defines the amount of spacing at the top of the block
 * @param {description} overlap This defines if a block overlaps the next block on the layout
 * @param {description} windowed This defines if a block has extra padding left and right
 * @param {description} scrollId This unique id is used for scrolling to blocks
 * @param {placeholder} scrollId unique-block-id
 * @param {description} primaryItem The primary item for the block
 * @param {description} secondaryItem The secondary item for the block
 * @param {description} tertiaryItem The tertiary item for the block
 * @param {description} quaternaryItem The quaternary item for the block
 * @param {description} quinaryItem The quinary item for the block
 */
export default {
	marginTop: VueTypes.number.isRequired,
	overlap: VueTypes.bool.isRequired,
	windowed: VueTypes.bool.isRequired,
	scrollId: VueTypes.string,
	primaryItem: VueTypes.shape(MultipleImagesMediaData).isRequired,
	secondaryItem: VueTypes.shape(MultipleImagesMediaData).isRequired,
	tertiaryItem: VueTypes.shape(MultipleImagesSkillsData).isRequired,
	quaternaryItem: VueTypes.shape(MultipleImagesMediaData).isRequired,
	quinaryItem: VueTypes.shape(MultipleImagesCallToActionData).isRequired,
};
