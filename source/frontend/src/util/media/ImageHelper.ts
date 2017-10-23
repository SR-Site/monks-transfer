import { DEVICE_STATE_TRACKER } from 'data/Injectables';
import { getValue } from 'util/injector';
import { deviceState } from 'config/deviceStateConfig';
import IImage from 'data/interface/media/IImage';

export default class ImageHelper {
	/**
	 * @public
	 * @method getImageForMediaQuery
	 * @param currentState
	 * @param image
	 */
	public static getImageForMediaQuery(
		image: IImage,
		currentState: number = getValue(DEVICE_STATE_TRACKER).currentState,
	): string {
		if (currentState > deviceState.SMALL) {
			return image.normal;
		} else {
			return image.small;
		}
	}
}
