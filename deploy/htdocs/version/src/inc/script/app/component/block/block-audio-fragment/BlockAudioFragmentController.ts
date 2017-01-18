import DefaultComponentController from "../DefaultComponentController";
import BlockAudioFragmentTransitionController from 'app/component/block/block-audio-fragment/BlockAudioFragmentTransitionController';
import IBlockAudioFragmentOptions from 'app/component/block/block-audio-fragment/IBlockAudioFragmentOptions';
import BlockAudioFragmentViewModel from 'app/component/block/block-audio-fragment/BlockAudioFragmentViewModel';

import Log from "lib/temple/util/Log";

class BlockAudioFragmentController extends DefaultComponentController<BlockAudioFragmentViewModel, IBlockAudioFragmentOptions>
{
	/**
	 *	Instance of Log debug utility for debug logging
	 *	@property _debug
	 *	@private
	 */
	private _debug:Log = new Log('app.component.BlockAudioFragment');

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
		this.transitionController = new BlockAudioFragmentTransitionController(this.element, this);

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

export default BlockAudioFragmentController;
