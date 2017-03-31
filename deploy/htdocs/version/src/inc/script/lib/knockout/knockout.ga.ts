import * as Analytics from 'app/util/Analytics';
import ko = require('knockout');

interface ITrackingData
{
	category: string;
	action: string;
	label: string | ILabel;
	toggle?: KnockoutObservable<boolean>;
}

interface ILabel
{
	label: Array<{ enabled: string; disabled: string }>;
}

/**
 * gaTrackEvent binding
 * Usage: data-bind="gaTrackEvent: {category:string, action:string, label:string}"
 */
class GaTrackEvent
{
	static init(element, valueAccessor: () => any, allBindings, vm, bindingContext): any
	{
		var koData: ITrackingData = <ITrackingData> valueAccessor();

		$(element).on('tap', (event: JQueryEventObject) =>
		{
			let trackingData: ITrackingData = GaTrackEvent.processData(koData);

			Analytics.trackEvent(trackingData.category, trackingData.action, <string> trackingData.label);
		});

		return {};
	}

	/**
	 * Creates a clone of the koData.
	 * And sets the right tracking values
	 * @param trackingData
	 * @returns {ITrackingData}
	 */
	static processData(trackingData: ITrackingData): ITrackingData
	{
		var trackingObject: ITrackingData = {
			action: null,
			label: null,
			category: null
		};

		trackingObject.action = trackingData.action;
		trackingObject.label = trackingData.label;
		trackingObject.category = trackingData.category;

		return trackingObject;
	}
}

ko.bindingHandlers['gaTrackEvent'] = GaTrackEvent;
ko.virtualElements.allowedBindings['gaTrackEvent'] = true;
