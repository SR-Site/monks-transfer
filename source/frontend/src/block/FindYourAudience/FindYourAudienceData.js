import VueTypes from 'vue-types';
import FindYourAudienceCategoryData from './FindYourAudienceCategory/FindYourAudienceCategoryData';

/**
 * @param {description} marginTop This defines the amount of spacing at the top of the block
 * @param {description} overlap This defines if a block overlaps the next block on the layout
 * @param {description} windowed This defines if a block has extra padding left and right
 * @param {description} scrollId This unique id is used for scrolling to blocks
 * @param {placeholder} scrollId unique-block-id
 * @param {description} topPicks The list of top picks
 * @param {description} series The list of series
 * @param {description} awardsAndSpecials The list of awards and specials
 * @param {description} sports the list of sports
 * @param {description} networks The list of networks
 */
export default {
	marginTop: VueTypes.number.isRequired,
	overlap: VueTypes.bool.isRequired,
	windowed: VueTypes.bool.isRequired,
	scrollId: VueTypes.string,
	topPicks: VueTypes.shape(FindYourAudienceCategoryData).isRequired,
	series: VueTypes.shape(FindYourAudienceCategoryData).isRequired,
	awardsAndSpecials: VueTypes.shape(FindYourAudienceCategoryData).isRequired,
	sports: VueTypes.shape(FindYourAudienceCategoryData).isRequired,
	networks: VueTypes.shape(FindYourAudienceCategoryData).isRequired,
};
