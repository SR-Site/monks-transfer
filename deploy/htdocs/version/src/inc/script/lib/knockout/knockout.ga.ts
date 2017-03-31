import * as Analytics from 'app/util/Analytics';
import ko = require('knockout');

export interface ITrackingData
{
	category: string;
	action: string;
	label: string | ILabel;
	value:number;
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
export class GaTrackEvent
{
	static init(element, valueAccessor: () => any, allBindings, vm, bindingContext): any
	{
		var koData: ITrackingData = <ITrackingData> valueAccessor();

		$(element).on('tap', (event: JQueryEventObject) =>
		{
			let trackingData: ITrackingData = GaTrackEvent.processData(koData);

			Analytics.trackEvent(trackingData.category, trackingData.action, <string> trackingData.label, trackingData.value);
		});

		return {};
	}

	/**
	 * Creates a clone of the koData.
	 * And sets the right tracking values
	 * @param trackingData
	 * @returns {ITrackingData}
	 */
	public static processData(trackingData: ITrackingData): ITrackingData
	{
		var trackingObject: ITrackingData = {
			action: null,
			label: null,
			category: null,
			value:null
		};

		trackingObject.action = trackingData.action;
		trackingObject.label = trackingData.label;
		trackingObject.category = trackingData.category;
		trackingObject.value = trackingData.value;

		return trackingObject;
	}
}

ko.bindingHandlers['gaTrackEvent'] = GaTrackEvent;
ko.virtualElements.allowedBindings['gaTrackEvent'] = true;
