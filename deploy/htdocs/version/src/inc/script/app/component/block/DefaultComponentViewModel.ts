import IDefaultComponentOptions from "./IDefaultComponentOptions";
import AbstractComponentViewModel from "../../../lib/temple/component/AbstractComponentViewModel";
import DefaultComponentController from "./DefaultComponentController";
import BlockType from "../../data/enum/type/BlockType";
import Routes from "../../config/Routes";
import {mediaQueries, DeviceState} from "../../data/scss-shared/MediaQueries";
import DataManager from "../../data/DataManager";

/**
 * @class DefaultComponentViewModel
 * @description This is the base viewModel used for all block components.
 */
class DefaultComponentViewModel<T, U extends IDefaultComponentOptions> extends AbstractComponentViewModel<DefaultComponentController<T, U>, U>
{
	public deviceState:KnockoutObservable<DeviceState> = DataManager.getInstance().deviceStateTracker.currentState;

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
	public MediaQueries:Class = mediaQueries;


	/**
	 * @public
	 * @method destruct
	 */
	public destruct():void
	{
		this.BlockType = null;
		this.deviceState = null;

		super.destruct();
	}
}

export default DefaultComponentViewModel;
