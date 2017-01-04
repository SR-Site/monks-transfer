import IDefaultComponentOptions from "./IDefaultComponentOptions";
import AbstractComponentViewModel from "../../../lib/temple/component/AbstractComponentViewModel";
import DefaultComponentController from "./DefaultComponentController";
import BlockType from "../../data/enum/type/BlockType";

/**
 * @class DefaultComponentViewModel
 * @description This is the base viewModel used for all block components.
 */
class DefaultComponentViewModel<T, U extends IDefaultComponentOptions> extends AbstractComponentViewModel<DefaultComponentController<T, U>, U>
{
	/**
	 * @property controller
	 * @type {DefaultComponentController<T, U>
	 */
	public controller:DefaultComponentController<T, U> & any;

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

export default DefaultComponentViewModel;
