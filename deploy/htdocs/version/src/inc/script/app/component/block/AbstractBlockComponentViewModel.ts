import IAbstractBlockComponentOptions from "./IAbstractBlockComponentOptions";
import AbstractBlockComponentController from "./AbstractBlockComponentController";
import BlockType from "../../data/enum/type/BlockType";
import AbstractTransitionComponentViewModel from "../../util/component-transition/abstract-transition-component/AbstractTransitionComponentViewModel";

/**
 * @class AbstractBlockComponentViewModel
 * @description This is the base viewModel used for all block components.
 */
abstract class AbstractBlockComponentViewModel<T, U extends IAbstractBlockComponentOptions> extends AbstractTransitionComponentViewModel<AbstractBlockComponentController<T, U>, U>
{
	/**
	 * @property controller
	 * @type {AbstractBlockComponentController<T, U>
	 */
	public controller:AbstractBlockComponentController<T, U> & any;

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
