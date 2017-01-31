import IAbstractBlockComponentOptions from "./IAbstractBlockComponentOptions";
import AbstractComponentViewModel from "../../../lib/temple/component/AbstractComponentViewModel";
import AbstractBlockComponentController from "./AbstractBlockComponentController";
import BlockType from "../../data/enum/type/BlockType";

/**
 * @class AbstractBlockComponentViewModel
 * @description This is the base viewModel used for all block components.
 */
abstract class AbstractBlockComponentViewModel<T, U extends IAbstractBlockComponentOptions> extends AbstractComponentViewModel<AbstractBlockComponentController<T, U>, U>
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
	 * @property elementClassNames
	 * @description Array containing all the that will be applied to the this.controller.element
	 * @type {Array}
	 */
	protected elementClassNames:Array<string> = [];

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
