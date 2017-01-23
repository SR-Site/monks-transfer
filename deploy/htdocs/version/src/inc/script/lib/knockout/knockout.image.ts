import ko = require('knockout');
import Promise = require('bluebird');

class KnockoutImage
{
	static init(): any
	{

	}

	static update(element, valueAccessor: () => any): any
	{
		let data: any = Object.assign(valueAccessor());

		delete data['state'];

		let imageUrl: string;


		if(data.queries && data.queries.length)
		{
			for(let i = 0; i < data.queries.length; i++)
			{
				let queryData = data.queries[i];

				if(matchMedia(queryData[0]).matches)
				{
					imageUrl = queryData[1];
					break;
				}
			}
		}

		if(imageUrl !== void(0))
		{
			if(element.tagName == 'IMG')
			{
				element.setAttribute('src', imageUrl);
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
