import AbstractBlockComponentController from "../AbstractBlockComponentController";
import BlockButtonTransitionController from 'app/component/block/block-button/BlockButtonTransitionController';
import IBlockButtonOptions from 'app/component/block/block-button/IBlockButtonOptions';
import BlockButtonViewModel from 'app/component/block/block-button/BlockButtonViewModel';

import Log from "lib/temple/util/Log";

class BlockButtonController extends AbstractBlockComponentController<BlockButtonViewModel, IBlockButtonOptions>
{
	/**
	 *    Instance of Log debug utility for debug logging
	 *    @property _debug
	 *    @private
	 */
	private _debug: Log = new Log('app.component.BlockButton');

	/**
	 *    Overrides AbstractPageController.init()
	 *    @method init
	 */
	public init(): void
	{
		super.init();

		this._debug.log('Init');
	}

	/**
	 * @protected
	 * @method allComponentsLoaded
	 */
	protected allComponentsLoaded(): void
	{
		this.transitionController = new BlockButtonTransitionController(this.element, this);

		super.allComponentsLoaded();
	}

	/**
	 *  Overrides AbstractComponentController.destruct()
	 *  @method destruct
	 */
	public destruct(): void
	{

		// always call this last
		super.destruct();
	}
}

export default BlockButtonController;
