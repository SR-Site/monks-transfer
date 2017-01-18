import DefaultComponentViewModel from "../DefaultComponentViewModel";
import BlockAudioFragmentController from 'app/component/block/block-audio-fragment/BlockAudioFragmentController';
import IBlockAudioFragmentOptions from 'app/component/block/block-audio-fragment/IBlockAudioFragmentOptions';

import ko = require('knockout');

class BlockAudioFragmentViewModel extends DefaultComponentViewModel<BlockAudioFragmentController, IBlockAudioFragmentOptions>
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
