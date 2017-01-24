import IDefaultComponentOptions from "../IDefaultComponentOptions";

export interface IBlockQuoteSecondaryOptions extends IDefaultComponentOptions
{
	/**
	 * @property
	 * @description The quote displayed in the block
	 */
	quote: string;
	/**
	 * @property
	 * @description The author displayed in the block
	 */
	author: string;
}

export default IBlockQuoteSecondaryOptions;
