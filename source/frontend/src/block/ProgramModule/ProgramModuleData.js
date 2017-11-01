import VueTypes from 'vue-types';
import PropImage from '../../data/prop-type/media/PropImage';
import PropVideo from '../../data/prop-type/media/PropVideo';
import PropLink from '../../data/prop-type/action/PropLink';
import PropStatistic from '../../data/prop-type/hero-main/PropStatistic';

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
	items: VueTypes.arrayOf(
		VueTypes.shape(
			{
				target: VueTypes.string.isRequired,
				heading: VueTypes.string.isRequired,
				paragraph: VueTypes.string.isRequired,
				stats: VueTypes.shape(
					{
						percentage: VueTypes.number.isRequired,
						demographic: VueTypes.string.isRequired,
					},
				).isRequired,
				image: VueTypes.shape(PropImage).isRequired,
				video: VueTypes.shape(PropVideo),
				tags: VueTypes.arrayOf(
					VueTypes.shape(PropLink),
				),
			},
		),
	).isRequired,
};
