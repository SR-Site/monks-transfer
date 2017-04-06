import IBlock from "../../data/interface/block/IBlock";
import IAbstractTransitionComponentOptions from "../../util/component-transition/abstract-transition-component/IAbstractTransitionComponentOptions";

interface IAbstractBlockComponentOptions extends IAbstractTransitionComponentOptions
{
	/**
	 * @ignore
	 * @property blocks
	 * @description The blocks inside this block
	 */
	blocks?: Array<IBlock>;
	/**
	 * @ignore
	 * @property
	 * @description If you want to disable the default transition in for the component, for example when you start nesting block components inside of other block components and you want to have control over the transition in
	 */
	disableTransitionIn?: boolean;
	/**
	 * @property
	 * @description the amount of margin to be applied to the top (marginTop * gridSize)
	 * @placeholder 0
	 * @defaultValue 0
	 */
	marginTop?:number;

	/**
	 * @property
	 * @description Windowed means the block will be surrounded by a white border of 2 * gridSize
	 * @placeholder false
	 * @defaultValue false
	 */
	windowed?: boolean;
	/**
	 * @property
	 * @description Overlap mean the z-index will be 1 instead of 0 so you can overlap elements
	 * @placeholder false
	 * @defaultValue false
	 */
	overlap?:boolean;
	/**
	 * @property
	 * @description The id of the section so that we can scroll to this component with a gaiaGoto
	 * @defaultValue uniqueSectionName
	 * @placeholder uniqueSectionName
	 */
	scrollSection?:string;
}

export default IAbstractBlockComponentOptions;
