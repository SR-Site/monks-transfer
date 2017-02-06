import AbstractBlockComponentViewModel from "../AbstractBlockComponentViewModel";
import BlockProgramModuleController from "app/component/block/block-program-module/BlockProgramModuleController";
import IBlockProgramModuleOptions from "app/component/block/block-program-module/IBlockProgramModuleOptions";

import ko = require('knockout');
import DataManager from "../../../data/DataManager";
import {DeviceState} from "../../../data/scss-shared/MediaQueries";

class BlockProgramModuleViewModel extends AbstractBlockComponentViewModel<BlockProgramModuleController, IBlockProgramModuleOptions>
{
	public activeHoverIndex: KnockoutObservable<number> = ko.observable(null);

	/**
	 * @public
	 * @method getClassNames
	 */
	public getClassNames(index: number): string
	{
		return 'index-' + (index + 1) + (index === this.activeHoverIndex() ? ' is-active' : '');
	}

	/**
	 * @public
	 * @method handleMouseEnter
	 */
	public handleMouseEnter(index: number, event: MouseEvent): void
	{
		if(DataManager.getInstance().deviceStateTracker.currentState() > DeviceState.SMALL)
		{
			this.activeHoverIndex(index);

			this.controller.openProgramModule(event.currentTarget);
		}
	}

	/**
	 * @public
	 * @method handleMouseLeave
	 */
	public handleMouseLeave(event: MouseEvent): void
	{
		if(DataManager.getInstance().deviceStateTracker.currentState() > DeviceState.SMALL)
		{
			this.activeHoverIndex(null);

			this.controller.closeProgramModule(event.currentTarget);
		}
	}

	/**
	 *  Overrides AbstractComponentViewModel.destruct()
	 *  @method destruct
	 */
	public destruct(): void
	{
		this.activeHoverIndex = null;

		// always call this last
		super.destruct();
	}
}

export default BlockProgramModuleViewModel;
