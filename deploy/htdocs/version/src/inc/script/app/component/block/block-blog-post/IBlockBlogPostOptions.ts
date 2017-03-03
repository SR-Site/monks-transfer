import IAbstractBlockComponentOptions from "../IAbstractBlockComponentOptions";
import ITag from "../../../data/interface/action/ITag";
import IImage from "../../../data/interface/media/IImage";
import ILink from "../../../data/interface/action/ILink";

interface IBlockBlogPostOptions extends IAbstractBlockComponentOptions
{
	/**
	 * @propety
	 * @description The main heading displayed on the block
	 */
	heading: string;
	/**
	 * @propety
	 * @description The sub heading displayed on the block
	 */
	subHeading: string;
	/**
	 * @propety
	 * @description The main paragraph displayed on the block
	 */
	paragraph: string;
	/**
	 * @property
	 * @description The publish date of the article
	 * @placeholder 01/01/2017
	 */
	date:string;
	/**
	 * @propety
	 * @description The tags linked to the block
	 */
	tags: Array<ITag>;
	/**
	 * @propety
	 * @description The author of the blog post
	 */
	author: {
		/**
		 * @propety
		 * @description The name of the author
		 */
		name: string;
		/**
		 * @propety
		 * @description The role of the author
		 */
		role: string;
		/**
		 * @propety
		 * @description An image of the author
		 */
		image: IImage;
	}
	/**
	 * @propety
	 * @description An array of social links to the article
	 */
	social: Array<ILink>;
}

export default IBlockBlogPostOptions;
