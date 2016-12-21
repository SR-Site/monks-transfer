import DefaultPageController from "app/page/DefaultPageController";
import HomePageViewModel from "app/page/home/HomePageViewModel";
import * as Gaia from "lib/gaia/api/Gaia";

import ko = require("knockout");

class HomePageController extends DefaultPageController<HomePageViewModel>
{
	/**
	 *	Overrides AbstractPageController.init()
	 *  @method init
	 */
	public init():void
	{
		super.init();
	}

	/**
	 *	Overrides AbstractPageController.destruct()
	 *  @method destruct
	 */
	public destruct():void
	{

		// always call this last
		super.destruct();
	}
}

export default HomePageController;