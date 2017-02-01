import AbstractTransitionController from "./AbstractTransitionController";

class SentenceTransitionController extends AbstractTransitionController
{
	private _splitText:SplitText;


	constructor(public element: HTMLElement, parentController: any )
	{
		super(element, parentController, false);

		this.addEventListener(AbstractTransitionController.TRANSITION_IN_COMPLETE, () =>{
			this._splitText.revert();
		});
	}

	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description overwrite this method in the parent class
	 * */
	protected setupTransitionInTimeline(): void
	{
		this._splitText = new SplitText(this.element, {type: 'lines', linesClass: 'sentence-animation'});
		const lineElements:Array<HTMLElement> = this._splitText.lines;

		const duration = 0.25;

		lineElements.forEach((element:HTMLElement) =>{

			// Inject animation spans
			(<HTMLElement>element.appendChild( document.createElement('span') )).classList.add('mask-line');
			(<HTMLElement>element.appendChild( document.createElement('span') )).classList.add('animation-line');

			// Cover sentence with Animation Line
			this.transitionInTimeline.to(element.querySelector('.animation-line'), duration, {x: '0%', ease: Expo.easeIn}, 'line1');
			this.transitionInTimeline.addLabel('afterLine1', '-=0');

			// Hide Mask Line
			this.transitionInTimeline.set(element.querySelector('.mask-line'), {display: 'none'}, 'afterLine1');

			// Reveal Sentence
			this.transitionInTimeline.to(element.querySelector('.animation-line'), duration, {width: '0%', ease: Expo.easeIn}, 'afterLine1');
			this.transitionInTimeline.addLabel('line1', '-=' + duration*0.9);
		});
	}

	/**
	 * @public
	 * @method getTimeline
	 */
	public getTimeline():Animation
	{
		return this.transitionInTimeline.play();
	}

}

export default SentenceTransitionController;
