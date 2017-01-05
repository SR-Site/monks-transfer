import DefaultComponentController from "../DefaultComponentController";
import BlockHeroTertiaryTransitionController from 'app/component/block/block-hero-tertiary/BlockHeroTertiaryTransitionController';
import IBlockHeroTertiaryOptions from 'app/component/block/block-hero-tertiary/IBlockHeroTertiaryOptions';
import BlockHeroTertiaryViewModel from 'app/component/block/block-hero-tertiary/BlockHeroTertiaryViewModel';

import Log from "lib/temple/util/Log";

class BlockHeroTertiaryController extends DefaultComponentController<BlockHeroTertiaryViewModel, IBlockHeroTertiaryOptions>
{
	/**
	 *	Instance of Log debug utility for debug logging
	 *	@property _debug
	 *	@private
	 */
	private _debug:Log = new Log('app.component.BlockHeroTertiary');

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
		this.transitionController = new BlockHeroTertiaryTransitionController(this.element, this);

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

export default BlockHeroTertiaryController;
