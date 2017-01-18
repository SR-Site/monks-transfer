import AbstractComponentViewModel from 'lib/temple/component/AbstractComponentViewModel';
import ImageSequenceController from 'app/component/image-sequence/ImageSequenceController';
import IImageSequenceOptions from 'app/component/image-sequence/IImageSequenceOptions';

import ko = require('knockout');

class ImageSequenceViewModel extends AbstractComponentViewModel<ImageSequenceController, IImageSequenceOptions>
{

	/**
	 *  Overrides AbstractComponentViewModel.destruct()
	 *  @method destruct
	 */
	public destruct(): void
	{

		// always call this last
		super.destruct();
	}
}

export default ImageSequenceViewModel;