import AbstractTransitionController from "../../../util/component-transition/AbstractTransitionController";
import SentenceTransitionController from "../../../util/component-transition/SentenceTransitionController";

class BlockImageWithContentTransitionController extends AbstractTransitionController
{

	private _headingAnimation: SentenceTransitionController;
	private _copyAnimation: SentenceTransitionController;

	constructor(element: HTMLElement, parentController: any)
	{
		super(element, parentController);

		this._headingAnimation = new SentenceTransitionController(
			<HTMLElement>this.element.querySelector('.heading'),
			this._parentController
		);

		this._copyAnimation = new SentenceTransitionController(
			<HTMLElement>this.element.querySelector('.copy'),
			this._parentController
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

		this._transitionInTimeline.fromTo(this.element.querySelector('.image'), 2,
			{
				clip: 'rect(0, 0,' + height + ', 0)'
			},
			{
				clip: 'rect(0, ' + width + ', ' + height + ', 0)',
				clearProps: "clip",
				ease: Expo.easeInOut
			});

		this._transitionInTimeline.from(this.element.querySelector('.content'), 2,
			{
				xPercent: -150,
				clearProps: "all",
				ease: Expo.easeInOut
			},
			'=-1.8'
		);

		this._transitionInTimeline.add(this._headingAnimation.getTimeline(), '=-1');
		this._transitionInTimeline.add(this._copyAnimation.getTimeline());

		if(button)
		{
			this._transitionInTimeline.add(this.getSubTimeline(button));
		}
	}
}

export default BlockImageWithContentTransitionController;
