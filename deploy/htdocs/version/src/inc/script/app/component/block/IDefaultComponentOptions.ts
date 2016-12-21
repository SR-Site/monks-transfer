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
}

export default IDefaultComponentOptions;
