import AbstractTransitionController from "app/util/component-transition/AbstractTransitionController";
import BlockVideoWithContentController from 'app/component/block/block-video-with-content/BlockVideoWithContentController';

class BlockVideoWithContentTransitionController extends AbstractTransitionController<BlockVideoWithContentController>
{
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description overwrite this method in the parent class
	 * */
	protected setupTransitionInTimeline(): void
	{
		const wrapper = <HTMLElement>this.element.querySelector('.video-wrapper');
		const width = wrapper.offsetWidth;
		const height = wrapper.offsetHeight;
		const button = this.element.querySelector('.component-button-main');

		this.transitionInTimeline.fromTo(this.element.querySelector('.video-poster'), 2,
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

		this.transitionInTimeline.add(this.getSubTimeline(
			this.element.querySelector('.component-button-play-circle')
		));

		this.transitionInTimeline.from(this.element.querySelector('.heading'), 0.8, {
			opacity: 0,
			ease: Linear.easeNone
		}, 0.5);

		this.transitionInTimeline.from(this.element.querySelector('.copy'), 0.8, {
			opacity: 0,
			ease: Linear.easeNone
		}, 0.7);

		if(button)
		{
			this.transitionInTimeline.add(this.getSubTimeline(button), 0.9);
		}

	}
}

export default BlockVideoWithContentTransitionController;
