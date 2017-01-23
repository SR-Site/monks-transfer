import ko = require('knockout');
import Promise = require('bluebird');
import ImageHelper from "../../app/util/ImageHelper";
import IImage from "../../app/data/interface/media/IImage";
import {DeviceState} from "../../app/data/scss-shared/MediaQueries";

class KnockoutImage
{
	static init(): any
	{

	}

	static update(element, valueAccessor: () => any): any
	{
		let data: {state: DeviceState, image: IImage} = Object.assign(valueAccessor());
		let imageUrl = ImageHelper.getImageForMediaQuery(data.image, data.state);

		if(imageUrl !== void(0))
		{
			if(element.tagName == 'IMG')
			{
				element.setAttribute('src', imageUrl);
				element.setAttribute('alt', data.image.alt);
			}
			else
			{
				element.style.backgroundImage = 'url("' + imageUrl + '")';
			}
		}
	}
}

ko.bindingHandlers['image'] = KnockoutImage;

export default KnockoutImage;
