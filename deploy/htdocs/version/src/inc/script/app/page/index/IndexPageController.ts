import DefaultPageController from "app/page/DefaultPageController";
import IndexPageViewModel from "app/page/index/IndexPageViewModel";
import * as Gaia from "lib/gaia/api/Gaia";

import ko = require("knockout");

class IndexPageController extends DefaultPageController<IndexPageViewModel>
{
	/**
	 *	Overrides AbstractPageController.init()
	 *	@method init
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

export default IndexPageController;