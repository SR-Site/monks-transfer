import DefaultComponentController from "../DefaultComponentController";
import BlockHeroSecondaryTransitionController from 'app/component/block/block-hero-secondary/BlockHeroSecondaryTransitionController';
import IBlockHeroSecondaryOptions from 'app/component/block/block-hero-secondary/IBlockHeroSecondaryOptions';
import BlockHeroSecondaryViewModel from 'app/component/block/block-hero-secondary/BlockHeroSecondaryViewModel';

import Log from "lib/temple/util/Log";

class BlockHeroSecondaryController extends DefaultComponentController<BlockHeroSecondaryViewModel, IBlockHeroSecondaryOptions>
{
	/**
	 *	Instance of Log debug utility for debug logging
	 *	@property _debug
	 *	@private
	 */
	private _debug:Log = new Log('app.component.BlockHeroSecondary');

	/**
	 *	Overrides AbstractPageController.init()
	 *	@method init
	 */
	public init():void
	{
		super.init();

		this._debug.log('Init');
	}

	/**
	* @protected
	* @method allComponentsLoaded
	*/
	protected allComponentsLoaded():void
	{
		this.transitionController = new BlockHeroSecondaryTransitionController(this.element, this);

		super.allComponentsLoaded();
	}

	/**
	 *  Overrides AbstractComponentController.destruct()
	 *  @method destruct
	 */
	public destruct():void
	{

		// always call this last
		super.destruct();
	}
}

export default BlockHeroSecondaryController;
