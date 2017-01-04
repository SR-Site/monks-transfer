import DefaultComponentTransitionViewModel from "app/util/component-transition/default-component-transition/DefaultComponentTransitionViewModel";
import MapSliderController from 'app/component/map-slider/MapSliderController';
import IMapSliderOptions from 'app/component/map-slider/IMapSliderOptions';

import ko = require('knockout');

class MapSliderViewModel extends DefaultComponentTransitionViewModel<MapSliderController, IMapSliderOptions>
{
	public progress:KnockoutObservable<number> = ko.observable(0);
	public activeIndex:KnockoutObservable<number> = ko.observable(0);

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
