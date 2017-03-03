import IAbstractBlockComponentOptions from "../IAbstractBlockComponentOptions";
import IImage from "../../../data/interface/media/IImage";
import IVideo from "../../../data/interface/media/IVideo";
import ITag from "../../../data/interface/action/ITag";

interface IBlockProgramModuleOptions extends IAbstractBlockComponentOptions
{
	/**
	 * @property
	 * @description The array of programs displayed on this block
	 */
	items: Array<{
		/**
		 * @property
		 * @description The main image displayed for the program
		 */
		image: IImage;
		/**
		 * @property
		 * @description The title of the program
		 */
		heading: string;
		/**
		 * @property
		 * @description The paragraph of text displayed for the program
		 */
		paragraph: string;
		/**
		 * @property
		 * @description Some stats for the program
		 */
		stats: {
			/**
			 * @property
			 * @description The age range for the program
			 */
			ageRange: string;
			/**
			 * @property
			 * @description The demographics for the program
			 */
			demographic: string;
		};
		/**
		 * @property
		 * @description The teaser video linked to the program
		 */
		video: IVideo;
		/**
		 * @property
		 * @description The tags related to the program
		 */
		tags: Array<ITag>;
	}>
}

export default IBlockProgramModuleOptions;
