import DefaultComponentTransitionViewModel from "../../util/component-transition/abstract-transition-component/AbstractTransitionComponentViewModel";
import ImageCrossfaderController from 'app/component/image-crossfader/ImageCrossfaderController';
import IImageCrossfaderOptions from 'app/component/image-crossfader/IImageCrossfaderOptions';

import ko = require('knockout');

class ImageCrossfaderViewModel extends DefaultComponentTransitionViewModel<ImageCrossfaderController, IImageCrossfaderOptions>
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

export default ImageCrossfaderViewModel;
