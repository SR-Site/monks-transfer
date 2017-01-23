import IImage from "../data/interface/media/IImage";
import DataManager from "../data/DataManager";
import {DeviceState} from "../data/scss-shared/MediaQueries";

class ImageHelper
{
	/**
	 * @public
	 * @method getImageForMediaQuery
	 * @param currentState
	 * @param image
	 */
	public static getImageForMediaQuery(image: IImage, currentState:DeviceState = DataManager.getInstance().deviceStateTracker.currentState()): string
	{
		if(currentState > DeviceState.SMALL)
		{
			return image.normal;
		}
		else
		{
			return image.small;
		}
	}
}

export default ImageHelper;