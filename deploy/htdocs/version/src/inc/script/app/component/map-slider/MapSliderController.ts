import DefaultComponentTransitionController from "app/util/component-transition/default-component-transition/DefaultComponentTransitionController";
import MapSliderTransitionController from 'app/component/map-slider/MapSliderTransitionController';
import IMapSliderOptions from 'app/component/map-slider/IMapSliderOptions';
import MapSliderViewModel from 'app/component/map-slider/MapSliderViewModel';

import Log from "lib/temple/util/Log";

class MapSliderController extends DefaultComponentTransitionController<MapSliderViewModel, IMapSliderOptions>
{
	/**
	 *	Instance of Log debug utility for debug logging
	 *	@property _debug
	 *	@private
	 */
	private _debug:Log = new Log('app.component.MapSlider');

	/**
	 *	Overrides AbstractPageController.init()
	 *	@method init
	 */
	public init():void
	{
		super.init();

		this._debug.log('Init');

		this.transitionController = new MapSliderTransitionController(this.element, this);

	}


	/**
	 *  Overrides AbstractComponentController.destruct()
	 *  @method destruct
	 */
	public destruct():void
	{

		// always call this last
		super.destruct();
	}
}

export default MapSliderController;
