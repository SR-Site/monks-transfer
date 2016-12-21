import DefaultPageViewModel from "app/page/DefaultPageViewModel";
import HomePageController from "app/page/home/HomePageController";
import ko = require('knockout');

class HomePageViewModel extends DefaultPageViewModel<HomePageController>
{
	/**
	 *	Overrides AbstractPageViewModel.destruct()
	 */
	public destruct():void
	{

		// always call this last
		super.destruct();
	}
}

export default HomePageViewModel;