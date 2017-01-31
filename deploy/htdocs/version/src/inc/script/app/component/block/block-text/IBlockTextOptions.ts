import IAbstractBlockComponentOptions from "../IAbstractBlockComponentOptions";

export interface IBlockTextOptions extends IAbstractBlockComponentOptions
{
	/**
	 * @property
	 * @description The html that will be rendered in the block
	 */
	html:string;
}

export default IBlockTextOptions;
