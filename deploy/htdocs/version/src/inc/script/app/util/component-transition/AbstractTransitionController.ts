import EventDispatcher from "../../../lib/temple/event/EventDispatcher";
import AbstractComponentController from "../../../lib/temple/component/AbstractComponentController";
import AbstractTransitionComponentController from "./abstract-transition-component/AbstractTransitionComponentController";
import DefaultPageController from "../../page/DefaultPageController";
import Promise = require("bluebird");

/**
 * @class AbstractTransitionController
 * @description This class is used by all components that you want to be transition in/out
 *
 * When extending the AbstractTransitionController a transition out timeline is not required. If it's not provided it
 * will reverse the transition in timeline when transition out is triggered.
 *
 * The AbstractTransitionController also contains a timeline for looping animations. If your component needs to keep
 * animating after transition in is done you can use this timeline to setup a looping animation,
 */
abstract class AbstractTransitionController<TParentController extends AbstractTransitionComponentController<any, any, any>> extends EventDispatcher
{
	/**
	 * @property TRANSITION_IN_COMPLETE
	 * @type {string}
	 */
	public static TRANSITION_IN_COMPLETE: string = 'AbstractTransitionController.TRANSITION_IN_COMPLETE';
	/**
	 * @property TRANSITION_OUT_COMPLETE
	 * @type {string}
	 */
	public static TRANSITION_OUT_COMPLETE: string = 'AbstractTransitionController.TRANSITION_OUT_COMPLETE';
	/**
	 * @property TRANSITION_IN_START
	 * @type {string}
	 */
	public static TRANSITION_IN_START: string = 'AbstractTransitionController.TRANSITION_IN_START';
	/**
	 * @property TRANSITION_OUT_START
	 * @type {string}
	 */
	public static TRANSITION_OUT_START: string = 'AbstractTransitionController.TRANSITION_OUT_START';
	/**
	 * @property FORWARD
	 * @type {string}
	 */
	public static FORWARD: string = 'AbstractTransitionController.FORWARD';
	/**
	 * @property REVERSED
	 * @type {string}
	 */
	public static REVERSED: string = 'AbstractTransitionController.REVERSED';
	/**
	 * @property IN
	 * @type {string}
	 */
	public static IN: string = 'AbstractTransitionController.IN';
	/**
	 * @property OUT
	 * @type {string}
	 */
	public static OUT: string = 'AbstractTransitionController.OUT';
	/**
	 * @property LOOP
	 * @type {string}
	 */
	public static LOOP: string = 'AbstractTransitionController.LOOP';
	/**
	 * @public
	 * @description the element on which the transition component is wrapped
	 */
	public element: HTMLElement;
	/**
	 * @property transitionResolveMethod
	 * @type {()=>void}
	 */
	public transitionResolveMethod: () => void;
	/**
	 * @property loopingAnimationTimeline
	 * @type {TimelineMax}
	 */
	public loopingAnimationTimeline: TimelineMax = new TimelineMax({
		paused: true,
		repeat: -1
	});
	/**
	 * @property transitionInTimline
	 * @type {TimelineLite}
	 */
	protected transitionInTimeline: TimelineLite = new TimelineLite({
		paused: true,
		onStart: this.handleAnimationStart.bind(this, AbstractTransitionController.IN),
		onComplete: this.handleAnimationComplete.bind(this, AbstractTransitionController.FORWARD, AbstractTransitionController.IN),
		onReverseComplete: this.handleAnimationComplete.bind(this, AbstractTransitionController.REVERSED, AbstractTransitionController.OUT)
	});
	/**
	 * @property transitionOutTimeline
	 * @type {TimelineLite}
	 */
	protected transitionOutTimeline: TimelineLite = new TimelineLite({
		paused: true,
		onStart: this.handleAnimationStart.bind(this, AbstractTransitionController.OUT),
		onComplete: this.handleAnimationComplete.bind(this, AbstractTransitionController.FORWARD, AbstractTransitionController.OUT)
	});
	/**
	 * @property _parentController
	 * @property The _parentController can either be a page or another component
	 */
	protected parentController: TParentController;
	/**
	 * @property _transitionInComplete
	 * @type {boolean}
	 */
	private _transitionInComplete: boolean = false;
	/**
	 * @property _transitionInStarted
	 * @type {boolean}
	 */
	private _transitionInStarted: boolean = false;


	constructor(element: HTMLElement, parentController: TParentController, waitForParent: boolean = true)
	{
		super();

		this.element = element;
		this.parentController = parentController;

		if(waitForParent)
		{
			const rootComponentCallbackCounter = this.getRootComponent().callbackCounter;
			if(rootComponentCallbackCounter)
			{
				rootComponentCallbackCounter.promise.then(() => this.handleRootComponentLoaded());
			}
			// In case a transitionComponent is not nested
			// within a transitionComponent (thus has not a callbackCounter).
			else
			{
				this.handleRootComponentLoaded();
			}
		}
		else
		{
			this.setupTransitionTimeline();
		}
	}

	/**
	 * @private
	 * @method handleRootComponentLoaded
	 */
	private handleRootComponentLoaded(): void
	{
		if(!this.isDestructed())
		{
			this.setupTransitionTimeline();
		}
	}

	/**
	 * @public
	 * @method setupTransitionTimeline
	 * @description This method will be used for setting up the timeline for the component
	 */
	public setupTransitionTimeline(): void
	{
		this.setupTransitionInTimeline();
		this.setupTransitionOutTimeline();
		this.setupLoopingAnimationTimeline();
	}

	/**
	 * @public
	 * @method getRootComponent
	 * @returns {any}
	 */
	public getRootComponent(): TParentController
	{
		let parent = this.parentController;

		// Try to find the parent that is not a page
		while(parent.parent && !(<DefaultPageController<any>>parent.parent).page)
		{
			parent = <TParentController>parent.parent
		}

		return parent;
	}

	/**
	 * @public
	 * @method get transitionInStarted
	 * @returns {boolean}
	 */
	public get transitionInStarted(): boolean
	{
		return this._transitionInStarted;
	}

	/**
	 * @public
	 * @method get transitionInComplete
	 * @returns {boolean}
	 */
	public get transitionInComplete(): boolean
	{
		return this._transitionInComplete;
	}

	/**
	 * @public
	 * @method transitionIn
	 */
	public transitionIn(): Promise<any>
	{
		return new Promise((resolve: () => void) =>
		{
			if(this.transitionInTimeline.duration() === 0)
			{
				console.log(' [AbstractTransitionController] This block does not have transition, so resolve right away');

				resolve();
			}
			else
			{
				this.transitionResolveMethod = resolve;
				this.transitionInTimeline.restart();
			}
		})
	}

	/**
	 * @public
	 * @method transitionOut
	 */
	public transitionOut(): Promise<any>
	{
		return new Promise((resolve: () => void) =>
		{
			this.transitionResolveMethod = resolve;

			if(this.transitionOutTimeline.duration() > 0)
			{
				this.transitionOutTimeline.restart();
			}
			else
			{
				this.transitionInTimeline.reverse();
			}
		});
	}

	/**
	 * @public
	 * @method getController
	 */
	public getTransitionController(element: Element|string): AbstractTransitionController<any>
	{
		const componentElement: Element = typeof element == 'string' ? this.element.querySelector(<string>element) : <Element>element;

		if(componentElement)
		{
			const controller = ko.utils.domData.get(componentElement, AbstractComponentController.BINDING_NAME);

			if(controller && controller.transitionController)
			{
				return controller.transitionController;
			}
		}

		throw new Error('[AbstractTransitionController] This element does not own a transitionController');
	}

	/**
	 * @public
	 * @method getSubTimeline
	 * @param {Element|string} element
	 * @param {string} type
	 * @returns {TimelineLite|null}
	 */
	public getSubTimeline(element: Element|string, type: string = AbstractTransitionController.IN): TimelineLite|TimelineMax
	{
		const transitionController = this.getTransitionController(element);

		if(transitionController)
		{
			let timeline: any;

			switch(type)
			{
				case AbstractTransitionController.IN:
					timeline = transitionController.transitionInTimeline.play();
					break;
				case AbstractTransitionController.OUT:
					timeline = transitionController.transitionInTimeline.play();
					break;
				case AbstractTransitionController.LOOP:
					timeline = transitionController.loopingAnimationTimeline;
					break;
			}

			return timeline;
		}

		throw new Error('[AbstractTransitionController] This element does not own a transition [' + type + '] timeline , so unable to add it to the transition');
	}

	/**
	 * @public
	 * @method setupTransitionOutTimeline
	 * @description overwrite this method in the parent class
	 */
	protected setupTransitionOutTimeline(): void
	{
	}

	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description overwrite this method in the parent class
	 * */
	protected setupTransitionInTimeline(): void
	{
	}

	/**
	 * @public
	 * @method setupLoopingAnimationTimeline
	 * @description overwrite this method in the parent class
	 * */
	protected setupLoopingAnimationTimeline(): void
	{
	}

	/**
	 * @protected
	 * @method handleAnimationStart
	 */
	protected handleAnimationStart(type: string, direction: string): void
	{
		let transitionEvent: string;

		switch(type)
		{
			case AbstractTransitionController.IN:
				transitionEvent = AbstractTransitionController.TRANSITION_IN_START;

				switch(direction)
				{
					case AbstractTransitionController.FORWARD:
						this._transitionInStarted = true;
						break;
				}

				break;
			case AbstractTransitionController.OUT:
				transitionEvent = AbstractTransitionController.TRANSITION_OUT_START;
				break;
		}

		// Dispatch TransitionEvent
		this.dispatch(transitionEvent);
	}

	/**
	 * @protected
	 * @method handleAnimationComplete
	 */
	protected handleAnimationComplete(direction: string, type: string): void
	{
		let transitionEvent: string;

		switch(type)
		{
			case AbstractTransitionController.IN:
				transitionEvent = AbstractTransitionController.TRANSITION_IN_COMPLETE;

				switch(direction)
				{
					case AbstractTransitionController.FORWARD:
						this._transitionInComplete = true;
						break;
				}
				break;

			case AbstractTransitionController.OUT:
				transitionEvent = AbstractTransitionController.TRANSITION_OUT_COMPLETE;
				break;
		}


		// Dispatch TransitionEvent
		this.dispatch(transitionEvent);

		if(this.transitionResolveMethod)
		{
			this.transitionResolveMethod();
			this.transitionResolveMethod = null;
		}
	}

	/**
	 * @protected
	 * @method clearTimeline
	 * @param timeline
	 */
	protected clearTimeline(timeline: TimelineLite): void
	{
		let targets = timeline.getChildren();

		for(let i = 0; i < targets.length; i++)
		{
			if((<Tween>targets[i]).target)
			{
				TweenLite.set((<Tween>targets[i]).target, {clearProps: "all"});
			}
			else
			{
				this.clearTimeline(<TimelineLite>targets[i]);
			}
		}

		timeline.clear();
	}

	/**
	 * @protected
	 * @method killAndClearTimeline
	 * @param timeline
	 */
	protected killAndClearTimeline(timeline: TimelineLite): void
	{
		this.clearTimeline(timeline);

		timeline.kill();
	}

	/**
	 * @public
	 * @method destruct
	 */
	public destruct(): void
	{
		this.element = null;

		if(this.transitionOutTimeline)
		{
			this.killAndClearTimeline(this.transitionOutTimeline);

			this.transitionOutTimeline = null;
		}

		if(this.transitionInTimeline)
		{
			this.killAndClearTimeline(this.transitionInTimeline);

			this.transitionInTimeline = null;
		}

		if(this.loopingAnimationTimeline)
		{
			this.killAndClearTimeline(this.loopingAnimationTimeline);

			this.loopingAnimationTimeline = null;
		}

		this.transitionResolveMethod = null;
		this._transitionInComplete = null;

		super.destruct();
	}
}

export default AbstractTransitionController;
