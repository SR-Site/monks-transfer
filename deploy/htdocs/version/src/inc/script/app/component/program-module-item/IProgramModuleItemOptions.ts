import IDefaultComponentTransitionOptions from "../../util/component-transition/abstract-transition-component/IAbstractTransitionComponentOptions";
import IImage from "../../data/interface/media/IImage";
import ITag from "../../data/interface/action/ITag";
import IVideo from "../../data/interface/media/IVideo";

interface IProgramModuleItemOptions extends IDefaultComponentTransitionOptions
{
	/**
	 * @property
	 * @description The array of items displayed in the program module block
	 */
	items: Array<{
		/**
		 * @property
		 * @description The heading displayed in the program module item
		 */
		heading: string;
		/**
		 * @property
		 * @description THe paragraph displayed in the program module item
		 */
		paragraph: string;
		/**
		 * @property
		 * @description The stats displayed in the program module item
		 */
		stats: {
			/**
			 * @property
			 * @description The age range statistic displayed in the stats block
			 */
			ageRange: string;
			/**
			 * @property
			 * @description The demographic statistic displayed in the stats block
			 */
			demographic: string;
		}
		/**
		 * @property
		 * @description The image displayed at the top of the block
		 */
		image: IImage;
		/**
		 * @property
		 * @description The video linked to the program module
		 */
		video?:IVideo;
		/**
		 * @property
		 * @description The array of tags displayed at the bottom of the block
		 */
		tags?: Array<ITag>;
	}>
}

export default IProgramModuleItemOptions;
