import DefaultTransitionController from "app/util/component-transition/DefaultTransitionController";

class PageLoaderTransitionController extends DefaultTransitionController
{
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description overwrite this method in the parent class
	 * */
	protected setupTransitionInTimeline(): void
	{
		this.transitionInTimeline.from(this.element, 0.5, {
			autoAlpha: 0,
			ease: Power3.easeInOut
		});
	}
}

export default PageLoaderTransitionController;
