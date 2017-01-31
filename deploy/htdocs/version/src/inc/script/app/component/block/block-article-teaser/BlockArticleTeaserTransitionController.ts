import DefaultTransitionController from "app/util/component-transition/DefaultTransitionController";

class BlockArticleTeaserTransitionController extends DefaultTransitionController
{
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description overwrite this method in the parent class
	 * */
	protected setupTransitionInTimeline(): void
	{
		console.log('Setup article teaser timeline ');

		const tags = Array.prototype.slice.call(this.element.querySelectorAll('.component-button-tag'));

		this.transitionInTimeline.fromTo(this.element.querySelector('figure'), 2,
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


		this.transitionInTimeline.from(this.element.querySelector('img'), 1,
			{
				xPercent: -10,
				clearProps: "xPercent",
				ease: Expo.easeInOut
			}, 0);


		this.transitionInTimeline.from(this.element.querySelector('.heading'), 1,
			{
				opacity: 0,
				clearProps: "opacity",
			}, '=-0.8');

		this.transitionInTimeline.from(this.element.querySelector('.copy'), 1,
			{
				opacity: 0,
				clearProps: "opacity",
			}, '=-0.8');


		tags.forEach((tag, index) =>
		{
			this.transitionInTimeline.from(tag, 1,
				{
					opacity: 0,
					clearProps: "opacity",
				}, '=-0.8');
		})


		// Enable css transitions
		this.transitionInTimeline.add(() => this.element.classList.add('transition-in-complete'));

	}
}

export default BlockArticleTeaserTransitionController;
