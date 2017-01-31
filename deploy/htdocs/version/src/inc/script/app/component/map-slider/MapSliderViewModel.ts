import DefaultComponentTransitionViewModel from "../../util/component-transition/abstract-transition-component/AbstractTransitionComponentViewModel";
import MapSliderController from 'app/component/map-slider/MapSliderController';
import IMapSliderOptions from 'app/component/map-slider/IMapSliderOptions';

import ko = require('knockout');

class MapSliderViewModel extends DefaultComponentTransitionViewModel<MapSliderController, IMapSliderOptions>
{
	public progress:KnockoutObservable<number> = ko.observable(0);
	public activeIndex:KnockoutObservable<number> = ko.observable(0);

	/**
	 * @public
	 * @method handleStepClick
	 */
	public handleStepClick(index:number):void
	{
		this.controller.openIndex(index);
	}

	/**
	 *  Overrides AbstractComponentViewModel.destruct()
	 *  @method destruct
	 */
	public destruct():void
	{
		this.progress = null;
		this.activeIndex = null;

		// always call this last
		super.destruct();
	}
}

export default MapSliderViewModel;
