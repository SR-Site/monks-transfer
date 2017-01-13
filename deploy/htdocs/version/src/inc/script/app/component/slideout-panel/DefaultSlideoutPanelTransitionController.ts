import DefaultTransitionController from "../../util/component-transition/DefaultTransitionController";

class DefaultSlideoutPanelTransitionController extends DefaultTransitionController
{
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description overwrite this method in the parent class if it's not overwritten it will use the default transition which is a fade
	 */
	protected setupTransitionInTimeline(): void
	{
		this.transitionInTimeline.from(this.element, 0.1, {opacity: 0, display: 'none'});
		this.transitionInTimeline.to(this.element, 0.5, {
			className: '+=is-open',
			ease: Expo.easeInOut
		});

		this.transitionInTimeline.fromTo(this.element.nextElementSibling, 0.4, {
			opacity: 0,
			display: 'none'
		},
		{
			opacity: 1,
			display: 'block'
		}, 0);
	}
}

export default DefaultSlideoutPanelTransitionController;
