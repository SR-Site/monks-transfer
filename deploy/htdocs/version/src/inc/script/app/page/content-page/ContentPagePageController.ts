import ContentPagePageViewModel from "app/page/content-page/ContentPagePageViewModel";
import DefaultContentPageController from "../DefaultContentPageController";

import ko = require("knockout");

class ContentPagePageController extends DefaultContentPageController<ContentPagePageViewModel>
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
	 *	@method destruct
	 */
	public destruct():void
	{
		// always call this last
		super.destruct();
	}
}

export default ContentPagePageController;