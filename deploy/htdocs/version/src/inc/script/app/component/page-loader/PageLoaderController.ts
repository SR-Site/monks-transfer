import AbstractTransitionComponentController from "../../util/component-transition/abstract-transition-component/AbstractTransitionComponentController";
import PageLoaderTransitionController from 'app/component/page-loader/PageLoaderTransitionController';
import IPageLoaderOptions from 'app/component/page-loader/IPageLoaderOptions';
import PageLoaderViewModel from 'app/component/page-loader/PageLoaderViewModel';

import Log from "lib/temple/util/Log";

class PageLoaderController extends AbstractTransitionComponentController<PageLoaderViewModel, IPageLoaderOptions, PageLoaderTransitionController>
{
	/**
	 *	Instance of Log debug utility for debug logging
	 *	@property _debug
	 *	@private
	 */
	private _debug:Log = new Log('app.component.PageLoader');

	/**
	 *	Overrides AbstractPageController.init()
	 *	@method init
	 */
	public init():void
	{
		super.init();

		this._debug.log('Init');

		this.transitionController = new PageLoaderTransitionController(this.element, this);

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

export default PageLoaderController;
