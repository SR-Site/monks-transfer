import AbstractTransitionController from "../../../util/component-transition/AbstractTransitionController";
import BlockImageWithContentController from "./BlockImageWithContentController";

class BlockImageWithContentTransitionController extends AbstractTransitionController<BlockImageWithContentController>
{
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description overwrite this method in the parent class
	 * */
	protected setupTransitionInTimeline(): void
	{
		const wrapper = <HTMLElement>this.element.querySelector('.site-frame');
		const width = wrapper.offsetWidth;
		const height = wrapper.offsetHeight;

		const button = this.element.querySelector('.component-button-main');

		this.transitionInTimeline.from(this.element.querySelector('.content'), 2,
			{
				xPercent: -100,
				clearProps: "all",
				ease: Expo.easeOut
			}
		);

		this.transitionInTimeline.fromTo(this.element.querySelector('.image'), 2,
			{
				clip: 'rect(0, 0,' + height + ', 0)',
				opacity: 0
			},
			{
				clip: 'rect(0, ' + width + ', ' + height + ', 0)',
				opacity: 1,
				clearProps: "clip",
				ease: Expo.easeOut
			}, 0);

		this.transitionInTimeline.from(this.element.querySelector('.heading'), 0.8, {
			opacity: 0,
			ease: Linear.easeNone
		}, 1.1);

		this.transitionInTimeline.from(this.element.querySelector('.copy'), 0.8, {
			opacity: 0,
			ease: Linear.easeNone
		}, 1.3);

		if(button)
		{
			this.transitionInTimeline.add(this.getSubTimeline(button), 1.5);
		}
	}
}

export default BlockImageWithContentTransitionController;

