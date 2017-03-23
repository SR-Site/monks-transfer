import AbstractTransitionController from "../../../util/component-transition/AbstractTransitionController";
import BlockArticleTeaserController from "./BlockArticleTeaserController";
import Promise = require("bluebird");

class BlockArticleTeaserTransitionController extends AbstractTransitionController<BlockArticleTeaserController>
{
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description overwrite this method in the parent class
	 * */
	protected setupTransitionInTimeline(): void
	{
		const tags = Array.prototype.slice.call(this.element.querySelectorAll('.component-button-tag'));

		this.transitionInTimeline.fromTo(this.element, 0.5,
			{
				opacity: 0
			},
			{
				opacity: 1
			}
		);

		const clipSize = this.element.querySelector('aside').offsetWidth

		this.transitionInTimeline.fromTo(this.element.querySelector('figure'), 1.6,
			{
				clip: 'rect(0, ' + this.element.offsetWidth + ',' + this.element.offsetHeight + ', ' + this.element.offsetWidth + ')',
				opacity: 0
			},
			{
				clip: 'rect(0, ' + this.element.offsetWidth + ',' + this.element.offsetHeight + ', ' + clipSize + ')',
				opacity: 1,
				clearProps: "clip, opacity",
				ease: Expo.easeOut
			});


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
		});


		// Enable css transitions
		this.transitionInTimeline.add(() => this.element.classList.add('transition-in-complete'));

	}
}

export default BlockArticleTeaserTransitionController;
