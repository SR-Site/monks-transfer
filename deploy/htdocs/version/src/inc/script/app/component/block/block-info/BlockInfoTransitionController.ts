import AbstractTransitionController from "../../../util/component-transition/AbstractTransitionController";
import BlockInfoController from "./BlockInfoController";

class BlockInfoTransitionController extends AbstractTransitionController<BlockInfoController>
{
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description overwrite this method in the parent class
	 * */
	protected setupTransitionInTimeline(): void
	{
		const heading = this.element.querySelector('.heading');
		const copy = this.element.querySelector('.copy');
		const button = this.element.querySelector('.component-button-main');

		this.transitionInTimeline.from(this.element, 0.5, {opacity: 0, clearProps: "al"});

		this.transitionInTimeline.fromTo(this.element.querySelector('.clip-mask'), 1.6,
			{
				scaleX: 1,
			},
			{
				scaleX: 0,
				ease: Expo.easeOut
			});


		this.transitionInTimeline.from(heading, 0.5, {opacity: 0, clearProps: "al"}, 1.1);
		this.transitionInTimeline.from(copy, 0.5, {opacity: 0, clearProps: "al"}, 1.3);
		if(button)
		{
			this.transitionInTimeline.add(this.getSubTimeline(button), 1.5);
		}
	}
}

export default BlockInfoTransitionController;
