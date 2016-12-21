import ContentPagePageController from "app/page/content-page/ContentPagePageController";
import DefaultContentPageViewModel from "../DefaultContentPageViewModel";
import ko = require('knockout');

class ContentPagePageViewModel extends DefaultContentPageViewModel<ContentPagePageController>
{
	/**
	 *	Overrides AbstractPageViewModel.destruct()
	 *	@method destruct
	 */
	public destruct():void
	{

		// always call this last
		super.destruct();
	}
}

export default ContentPagePageViewModel;