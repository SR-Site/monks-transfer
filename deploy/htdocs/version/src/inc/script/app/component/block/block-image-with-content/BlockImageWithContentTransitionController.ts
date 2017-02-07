import AbstractTransitionController from "../../../util/component-transition/AbstractTransitionController";
import SentenceTransitionController from "../../../util/component-transition/SentenceTransitionController";
import BlockImageWithContentController from "./BlockImageWithContentController";

class BlockImageWithContentTransitionController extends AbstractTransitionController<BlockImageWithContentController>
{
	private _headingAnimation: SentenceTransitionController<BlockImageWithContentController>;
	private _copyAnimation: SentenceTransitionController<BlockImageWithContentController>;

	constructor(element: HTMLElement, parentController: any)
	{
		super(element, parentController);

		this._headingAnimation = new SentenceTransitionController<BlockImageWithContentController>(
			<HTMLElement>this.element.querySelector('.heading'),
			this.parentController
		);

		this._copyAnimation = new SentenceTransitionController<BlockImageWithContentController>(
			<HTMLElement>this.element.querySelector('.copy'),
			this.parentController
		);
	}

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


		const copyTimeline = this._copyAnimation.getTimeline();
		const headingTimeline = this._headingAnimation.getTimeline();


		this.transitionInTimeline.add(headingTimeline.play(), 1.1);
		this.transitionInTimeline.add(copyTimeline.play(),  1.3);


		if(button)
		{
			this.transitionInTimeline.add(this.getSubTimeline(button),  2.4);
		}
	}
}

export default BlockImageWithContentTransitionController;

