import AbstractComponentController from "../../../../lib/temple/component/AbstractComponentController";
import DefaultSubTransitionViewModel from "./AbstractTransitionComponentViewModel";
import IDefaultComponentTransitionOptions from "./IAbstractTransitionComponentOptions";
import CallbackCounter from "../../CallbackCounter";
import AbstractTransitionController from "../AbstractTransitionController";
import Promise = require("bluebird");


/**
 * @class AbstractTransitionComponentController
 * @description This class is used by all components that you want to be transition in/out
 */
abstract class AbstractTransitionComponentController<TController, TOptions extends IDefaultComponentTransitionOptions>
	extends AbstractComponentController<DefaultSubTransitionViewModel<TController, TOptions>, TOptions>
{
	/**
	 * @property viewModel
	 * @type {TController}
	 */
	protected viewModel: TController & any;
	/**
	 * @property transitionController
	 * @type {AbstractTransitionController}
	 */
	public transitionController: AbstractTransitionController<AbstractTransitionComponentController<TController, TOptions>>;
	/**
	 * @property callBackCounter
	 * @type {CallbackCounter}
	 */
	public callbackCounter: CallbackCounter = new CallbackCounter();

	/**
	 * @public
	 * @method init
	 */
	public init(): void
	{
		// Store instance on element.
		ko.utils.domData.set(this.element, AbstractComponentController.BINDING_NAME, this);

		this.callbackCounter.promise.then(() => this.allComponentsLoaded());

		// Manually resolve the callback counter if there a no components to wait for!
		if(this.callbackCounter.count === 0)
		{
			this.callbackCounter.resolve();
		}
	}

	/**
	 * @public
	 * @method transitionIn
	 */
	public transitionIn(): Promise<any>
	{
		return this.transitionController.transitionIn();
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
	 * @public
	 * @method startAnimation
	 */
	public startAnimation(): void
	{
		this.transitionController.loopingAnimationTimeline.play();
	}

	/**
	 * @public
	 * @method stopAnimation
	 */
	public stopAnimation(): void
	{
		this.transitionController.loopingAnimationTimeline.pause();
	}

	/**
	 * @public
	 * @handleComponentReady
	 * @param controller
	 */
	public handleComponentReady(controller: AbstractComponentController<any, any>): void
	{
		this.handleComponentReady(controller);
	}

	/**
	 * @protected
	 * @method allComponentsLoaded
	 * @description In the parent class we want this method to create the new transitionController instance because
	 * it means all the sub-components are loaded and we are ready to go!
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
		// Cleaning up the instance domData
		let disposeCallback = () =>
		{
			ko.utils.domNodeDisposal.removeDisposeCallback(this.element, disposeCallback);

			ko.utils.domData.set(this.element, AbstractComponentController.BINDING_NAME, null);
		};

		ko.utils.domNodeDisposal.addDisposeCallback(this.element, disposeCallback);

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

export default AbstractTransitionComponentController;
