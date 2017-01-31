import AbstractBlockComponentViewModel from "../AbstractBlockComponentViewModel";
import BlockAudioFragmentController from 'app/component/block/block-audio-fragment/BlockAudioFragmentController';
import IBlockAudioFragmentOptions from 'app/component/block/block-audio-fragment/IBlockAudioFragmentOptions';

import ko = require('knockout');

class BlockAudioFragmentViewModel extends AbstractBlockComponentViewModel<BlockAudioFragmentController, IBlockAudioFragmentOptions>
{
	/**
	 *  Overrides AbstractComponentViewModel.destruct()
	 *  @method destruct
	 */
	public destruct():void
	{

		// always call this last
		super.destruct();
	}
}

export default BlockAudioFragmentViewModel;
