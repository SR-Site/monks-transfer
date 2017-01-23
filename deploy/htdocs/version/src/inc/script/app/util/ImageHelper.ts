import IImage from "../data/interface/media/IImage";
import DataManager from "../data/DataManager";
import {DeviceState} from "../data/scss-shared/MediaQueries";

class ImageHelper
{
	/**
	 * @public
	 * @method getImageForMediaQuery
	 * @param image
	 */
	public static getImageForMediaQuery(image: IImage): string
	{
		const currentState = DataManager.getInstance().deviceStateTracker.currentState();

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