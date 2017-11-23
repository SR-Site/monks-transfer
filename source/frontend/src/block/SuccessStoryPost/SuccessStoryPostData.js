import VueTypes from 'vue-types';

/**
 * @param {description} marginTop This defines the amount of spacing at the top of the block
 * @param {description} overlap This defines if a block overlaps the next block on the layout
 * @param {description} windowed This defines if a block has extra padding left and right
 * @param {description} scrollId This unique id is used for scrolling to blocks
 * @param {placeholder} scrollId unique-block-id
 * @param {description} heading The heading of the success story post
 * @param {description} subHeading The sub heading of the success story post
 * @param {description} paragraph The first paragraph of the success story post
 * @param {description} company The name of the company the story applies to
 * @param {description} company.label The label of the company detail
 * @param {description} company.value The name of the company
 * @param {description} industry The industry the story applies to
 * @param {description} industry.label The label of the industry
 * @param {description} industry.value The name of the industry
 * @param {description} market The market the story applies to
 * @param {description} market.label The label of the market
 * @param {description} market.value The name of the market
 */
export default {
	marginTop: VueTypes.number.isRequired,
	overlap: VueTypes.bool.isRequired,
	windowed: VueTypes.bool.isRequired,
	scrollId: VueTypes.string,
	heading: VueTypes.string.isRequired,
	subHeading: VueTypes.string.isRequired,
	paragraph: VueTypes.string.isRequired,
	company: VueTypes.shape({
		label: VueTypes.string.isRequired,
		value: VueTypes.string.isRequired,
	}).isRequired,
	industry: VueTypes.shape({
		label: VueTypes.string.isRequired,
		value: VueTypes.string.isRequired,
	}).isRequired,
	market: VueTypes.shape({
		label: VueTypes.string.isRequired,
		value: VueTypes.string.isRequired,
	}).isRequired,
};
