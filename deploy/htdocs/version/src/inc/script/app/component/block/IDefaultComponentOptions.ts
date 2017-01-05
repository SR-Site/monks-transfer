import IIndexable from "../../../lib/temple/core/IIndexable";
import IBlock from "../../data/interface/block/IBlock";

interface IDefaultComponentOptions extends IIndexable
{
	/**
	 * @property blocks
	 * @description The blocks inside this block
	 */
	blocks?: Array<IBlock>;
	/**
	 * @property
	 * @description If you want to disable the default transition in for the component, for example when you start
	 * nesting block components inside of other block components and you want to have control over the transition in
	 */
	disableTransitionIn?: boolean;

	/**
	 * @property
	 * @description the amount of margin to be applied to the top (marginTop * gridSize)
	 */
	marginTop?:number;

	/**
	 * @property
	 * @description Windowed means the block will be surrounded by a white border of 2 * gridSize
	 */
	windowed?: boolean;

	/**
	 * @property
	 * @description Overlap mean the z-index will be 1 instead of 0 so you can overlap elements
	 */
	overlap?:boolean;
}

export default IDefaultComponentOptions;
