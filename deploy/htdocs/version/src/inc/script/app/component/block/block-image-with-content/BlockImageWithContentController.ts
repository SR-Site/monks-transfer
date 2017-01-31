import AbstractBlockComponentController from "../AbstractBlockComponentController";
import BlockImageWithContentTransitionController from 'app/component/block/block-image-with-content/BlockImageWithContentTransitionController';
import IBlockImageWithContentOptions from 'app/component/block/block-image-with-content/IBlockImageWithContentOptions';
import BlockImageWithContentViewModel from 'app/component/block/block-image-with-content/BlockImageWithContentViewModel';

import Log from "lib/temple/util/Log";
import Alignment from "../../../data/enum/layout/Alignment";

class BlockImageWithContentController extends AbstractBlockComponentController<BlockImageWithContentViewModel, IBlockImageWithContentOptions>
{
	/**
	 *	Instance of Log debug utility for debug logging
	 *	@property _debug
	 *	@private
	 */
	private _debug:Log = new Log('app.component.BlockImageWithContent');

	/**
	 *	Overrides AbstractPageController.init()
	 *	@method init
	 */
	public init():void
	{
		// Add the extra classes to the component
		if(this.options.alignment === Alignment.LEFT) this.viewModel.elementClassNames.push('left-aligned');
		if(this.options.alignment === Alignment.RIGHT) this.viewModel.elementClassNames.push('right-aligned');

		if(this.options.croppedImage) this.viewModel.elementClassNames.push('cropped-image');

		this._debug.log('Init');

		super.init();
	}

	/**
	* @protected
	* @method allComponentsLoaded
	*/
	protected allComponentsLoaded():void
	{
		this.transitionController = new BlockImageWithContentTransitionController(this.element, this);

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

export default BlockImageWithContentController;
