interface IBlock
{
	/**
	 * @property
	 * @description The id of the block
	 */
	id:string;
	/**
	 * @property
	 * @description The type of the block either 0 or 1 for component or partial
	 */
	type:string;
	/**
	 * @property
	 * @description The data for the block
	 */
	data:any|Array<IBlock>;
}

export default IBlock;
