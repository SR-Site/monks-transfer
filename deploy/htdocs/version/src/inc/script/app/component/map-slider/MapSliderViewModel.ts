import DefaultComponentTransitionViewModel from "app/util/component-transition/default-component-transition/DefaultComponentTransitionViewModel";
import MapSliderController from 'app/component/map-slider/MapSliderController';
import IMapSliderOptions from 'app/component/map-slider/IMapSliderOptions';

import ko = require('knockout');

class MapSliderViewModel extends DefaultComponentTransitionViewModel<MapSliderController, IMapSliderOptions>
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

export default MapSliderViewModel;
