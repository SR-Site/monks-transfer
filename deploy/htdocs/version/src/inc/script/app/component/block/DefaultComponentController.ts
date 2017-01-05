import IDefaultComponentOptions from "./IDefaultComponentOptions";
import AbstractComponentController from "../../../lib/temple/component/AbstractComponentController";
import DefaultComponentViewModel from "./DefaultComponentViewModel";
import CallbackCounter from "../../util/CallbackCounter";
import DefaultContentPageController from "../../page/DefaultContentPageController";
import DefaultTransitionController from "../../util/component-transition/DefaultTransitionController";
import Promise = require("bluebird");

/**
 * @class DefaultComponentController
 * @description This is the default class used for all the block components in the application
 */
class DefaultComponentController<T, U extends IDefaultComponentOptions> extends AbstractComponentController<DefaultComponentViewModel<T, U>, U>
{
	/**
	 * @property transitionComplete
	 * @type {boolean}
	 */
	public transitionComplete: boolean = false;
	/**
	 * @property transitionInStarted
	 * @type {boolean}
	 */
	public transitionInStarted: boolean = false;
	/**
	 * @property
	 * @type {number}
	 */
	public transitionInThreshold: number = 0.25;
	/**
	 * @property callbackCounter
	 * @type {CallbackCounter}
	 */
	public callbackCounter: CallbackCounter = new CallbackCounter();
	/**
	 * @property isInView
	 * @type {boolean}
	 */
	public isInView: boolean = false;
	/**
	 * @property animationsStarted
	 * @type {boolean}
	 */
	public animationsStarted: boolean = false;
	/**
	 * @property disableTransitionIn
	 * @description If you want to disable the default transition in for the component, for example when you start
	 * nesting block components inside of other block components and you want to have control over the transition in
	 * @type {boolean}
	 */
	public disableTransitionIn: boolean = false;
	/**
	 * @property viewModel
	 * @type {DefaultComponentViewModel}
	 */
	protected viewModel: DefaultComponentViewModel<T, U> & any;
	/**
	 * @propety transitionController
	 * @type {DefaultTransitionController}
	 */
	protected transitionController: DefaultTransitionController;

	constructor(element, options)
	{
		super(element, options);

		this.disableTransitionIn = this.options.disableTransitionIn || false;
	}

	/**
	 *    Overrides AbstractPageController.init()
	 *    @method init
	 */
	public init(): void
	{
		// Add the block id to the block
		let blockId = document.createElement('div');
		blockId.innerHTML = this.options.id;
		blockId.style.position = 'absolute';
		blockId.style.left = '0';
		blockId.style.top = '0';
		blockId.style.padding = (this.options.blocks ? '15px' : '5px');
		blockId.style.fontSize = '15px';
		blockId.style.color = '#fff';
		blockId.style.zIndex = '1';
		blockId.style.backgroundColor = (this.options.blocks ? '#f18e00' : '#f00');

		this.element.appendChild(blockId);

		const allComponentsLoaded: Promise<any> = this.callbackCounter.count > 0 ? this.callbackCounter.promise : Promise.resolve();

		allComponentsLoaded.then(() => this.allComponentsLoaded());

		// Will be overwritten in parent class
		this.transitionController = new DefaultTransitionController(this.element, this);

		// Set the default classes for block components
		if(this.options.windowed)
		{
			this.viewModel.elementClassNames.push('windowed');
		}

		if(this.options.overlap)
		{
			this.viewModel.elementClassNames.push('overlap');
		}

		if(this.options.marginTop)
		{
			this.viewModel.elementClassNames.push('margin-top-' + this.options.marginTop);
		}

		// Add the class names to the element
		this.viewModel.elementClassNames.forEach((className) => this.element.classList.add(className))
	}

	/**
	 * @public
	 * @method get parentPage
	 * @description Method to find the parent page of the current component
	 */
	public get parentPage(): DefaultContentPageController<any>
	{
		let parent = <DefaultContentPageController<any>>this.parent;

		// Try to find the parent that is a page
		while(parent.page == void 0)
		{
			parent = <DefaultContentPageController<any>>parent.parent;
		}

		return parent;
	}

	/**
	 * @public
	 * @method transitionIn
	 */
	public transitionIn(): Promise<any>
	{
		this.transitionInStarted = true;

		return this.transitionController.transitionIn()
			.then(() =>
			{
				this.transitionComplete = true;
			})
	}

	/**
	 * @public
	 * @method transitionOut
	 */
	public transitionOut(): Promise<any>
	{
		return this.transitionController.transitionOut();
	}

	/**
	 * This method get's called ONLY from the AnimationManager
	 * @public
	 * @method startAnimations
	 */
	public startAnimations(): void
	{
		this.animationsStarted = true;
	}

	/**
	 * This method get's called ONLY from the AnimationManager
	 * @public
	 * @method stopAnimations
	 */
	public stopAnimations(): void
	{
		this.animationsStarted = false;
	}

	/**
	 * @public
	 * @handleComponentReady
	 * @param controller
	 */
	public handleComponentReady(controller: DefaultComponentController<T, U>): void
	{
		this.parentPage.handleComponentReady(controller);
	}

	/**
	 * All components loaded so before transition in
	 * @protected
	 * @method allComponentsLoaded
	 * @description All components have been loaded
	 */
	protected allComponentsLoaded(): void
	{
	}

	/**
	 * @public
	 * @method destruct
	 */
	public destruct(): void
	{
		if(this.transitionController)
		{
			this.transitionController.destruct();
			this.transitionController = null;
		}

		if(this.callbackCounter)
		{
			this.callbackCounter.destruct();
			this.callbackCounter = null;
		}

		super.destruct();
	}
}

export default DefaultComponentController;
