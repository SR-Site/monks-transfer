import AbstractTransitionController from "../../../util/component-transition/AbstractTransitionController";

class BlockArticleTeaserTransitionController extends AbstractTransitionController
{
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description overwrite this method in the parent class
	 * */
	protected setupTransitionInTimeline(): void
	{
		const tags = Array.prototype.slice.call(this.element.querySelectorAll('.component-button-tag'));

		this._transitionInTimeline.fromTo(this.element.querySelector('figure'), 2,
			{
				clip: 'rect(0, ' + this.element.offsetWidth + ',' + this.element.offsetHeight + ', ' + this.element.offsetWidth + ')',
				opacity: 0
			},
			{
				clip: 'rect(0, ' + this.element.offsetWidth + ',' + this.element.offsetHeight + ', ' + this.element.offsetWidth / 2 + ')',
				opacity: 1,
				clearProps: "clip, opacity",
				ease: Expo.easeInOut
			});


		this._transitionInTimeline.from(this.element.querySelector('img'), 1,
			{
				xPercent: -10,
				clearProps: "xPercent",
				ease: Expo.easeInOut
			}, 0);


		this._transitionInTimeline.from(this.element.querySelector('.heading'), 1,
			{
				opacity: 0,
				clearProps: "opacity",
			}, '=-0.8');

		this._transitionInTimeline.from(this.element.querySelector('.copy'), 1,
			{
				opacity: 0,
				clearProps: "opacity",
			}, '=-0.8');


		tags.forEach((tag, index) =>
		{
			this._transitionInTimeline.from(tag, 1,
				{
					opacity: 0,
					clearProps: "opacity",
				}, '=-0.8');
		})


		// Enable css transitions
		this._transitionInTimeline.add(() => this.element.classList.add('transition-in-complete'));

	}
}

export default BlockArticleTeaserTransitionController;
