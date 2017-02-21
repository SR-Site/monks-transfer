import IAbstractBlockComponentOptions from "./IAbstractBlockComponentOptions";
import AbstractBlockComponentController from "./AbstractBlockComponentController";
import BlockType from "../../data/enum/type/BlockType";
import AbstractTransitionComponentViewModel from "../../util/component-transition/abstract-transition-component/AbstractTransitionComponentViewModel";

/**
 * @class AbstractBlockComponentViewModel
 * @description This is the base viewModel used for all block components.
 */
abstract class AbstractBlockComponentViewModel<TController extends AbstractBlockComponentController<any, any, any>, TOptions extends IAbstractBlockComponentOptions>
	extends AbstractTransitionComponentViewModel<TController, TOptions>
{
	/**
	 * @property BlockTYpe
	 * @type {BlockType}
	 */
	public BlockType:Class = BlockType;

	/**
	 * @property _elementClassNames
	 * @description Array containing all the that will be applied to the this.controller.element
	 * @type {Array}
	 */
	public elementClassNames:Array<string> = [];

	/**
	 * @public
	 * @method destruct
	 */
	public destruct():void
	{
		this.BlockType = null;

		this.elementClassNames = null;

		super.destruct();
	}
}

export default AbstractBlockComponentViewModel;
