import DefaultPageViewModel from "app/page/DefaultPageViewModel";
import IndexPageController from "app/page/index/IndexPageController";
import ko = require('knockout');

class IndexPageViewModel extends DefaultPageViewModel<IndexPageController>
{
	/**
	 *	Overrides AbstractPageViewModel.destruct()
	 *  @method destruct
	 */
	public destruct():void
	{

		// always call this last
		super.destruct();
	}
}

export default IndexPageViewModel;