import IDefaultComponentOptions from "../IDefaultComponentOptions";

export interface IBlockTextOptions extends IDefaultComponentOptions
{
	/**
	 * @property
	 * @description The html that will be rendered in the block
	 */
	html:string;
}

export default IBlockTextOptions;
