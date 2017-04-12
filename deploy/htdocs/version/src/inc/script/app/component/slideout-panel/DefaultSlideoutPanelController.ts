import Promise = require("bluebird");
import IDefaultSlideoutPanelOptions from "./IDefaultSlideoutPanelOptions";
import DefaultSlideoutPanelViewModel from "./DefaultSlideoutPanelViewModel";
import ScrollUtils from "../../util/ScrollUtils";
import Scrollbar from "../../../lib/temple/component/Scrollbar";
import AbstractTransitionComponentController from "../../util/component-transition/abstract-transition-component/AbstractTransitionComponentController";
import NativeEventListener from "../../../lib/temple/event/NativeEventListener";
import ThrottleDebounce from "../../../lib/temple/util/ThrottleDebounce";
import DefaultSlideoutPanelTransitionController from "./DefaultSlideoutPanelTransitionController";
import bowser = require('bowser');

class DefaultSlideoutPanelController<
	TViewModel extends DefaultSlideoutPanelViewModel<any, any>,
	TOptions extends IDefaultSlideoutPanelOptions,
	TTransitionController extends DefaultSlideoutPanelTransitionController<any>>
extends AbstractTransitionComponentController<TViewModel, TOptions, TTransitionController>
{
	protected panelComponents: {[id: string]: AbstractTransitionComponentController<any, any, any>} = {};
	public activePanel: string = '';

	/**
	 *    Overrides AbstractPageController.init()
	 *    @method init
	 */
	public init(): void
	{
		super.init();

		this.addEvents();
	}

	/**
	 * @public
	 * @method get isOpen
	 * @returns {boolean}
	 */
	public get isOpen(): KnockoutObservable<boolean>
	{
		return this.viewModel.isOpen;
	}

	/**
	 * @public
	 * @method getPanelComponentById
	 * @param panelId
	 * @returns {AbstractTransitionComponentController}
	 */
	public getPanelComponentById(panelId): AbstractTransitionComponentController<any, any, any>
	{
		return this.panelComponents[panelId];
	}

	/**
	 * @public
	 * @method handleComponentReady
	 * @param controller
	 */
	public handleComponentReady(controller: AbstractTransitionComponentController<any, any, any>): void
	{
		this.panelComponents[controller.options.id] = controller;
	}

	/**
	 * @public
	 * @method setActivePanel
	 * @param panelId
	 */
	public setActivePanel(panelId)
	{
		this.activePanel = panelId;
	}

	/**
	 * @public
	 * @method get _activePanel
	 *
	 */
	public getActivePanel()
	{
		return this.activePanel;
	}

	/**
	 * @public
	 * @method transitionOut
	 */
	public transitionOut(): Promise<any>
	{
		this.viewModel.isOpen(false);

		// Enable Window Scroll
		ScrollUtils.enableScroll();

		// Animate out Out Panel
		return this.hidePanelContent(this.activePanel).then(() => this.transitionController.transitionOut());
	}

	/**
	 * @public
	 * @method transitionIn
	 */
	public transitionIn(panelId: string = this.activePanel): Promise<any>
	{
		if(this.viewModel.isOpen())
		{
			return this.showPanelContent(panelId).then(() => this.checkScroll());
		}

		this.viewModel.isOpen(true);

		// Animate in Panel
		return this.transitionController.transitionIn().then(() => this.showPanelContent(panelId)).then(() => this.checkScroll());
	}

	/**
	 * @protected
	 * @method checkScroll
	 */
	protected checkScroll(): void
	{
		if(this.viewModel.isOpen())
		{
			const scrollWrapper = this.getCustomScrollElement();

			if(scrollWrapper && !bowser.ios)
			{
				const scrollContent = <HTMLElement>scrollWrapper.querySelector('.scroll-content');

				// Only Disable window scrolling when it's needed else it has a buggy behaviour.
				if(scrollWrapper.offsetHeight < scrollContent.scrollHeight)
				{
					ScrollUtils.disableScroll();
				}
				else
				{
					ScrollUtils.enableScroll();
				}
			}
		}
	}

	/**
	 * @public
	 * @method showPanelContent
	 */
	public showPanelContent(panelId: string): Promise<any>
	{
		const prevPanel = this.activePanel;

		// Update the panel
		this.setActivePanel(panelId);

		// Animate active panel out if any open.
		if(prevPanel && panelId !== prevPanel)
		{
			return this.hidePanelContent(prevPanel).then(() =>
			{
				return this.panelComponents[panelId].transitionIn()
					.then(() => this.updateCustomScrollbar());
			});
		}
		else
		{
			return this.panelComponents[panelId].transitionIn()
				.then(() => this.updateCustomScrollbar());
		}
	}

	/**
	 * @protected
	 * @method hidePanelContent
	 */
	protected hidePanelContent(panelId: string = this.activePanel): Promise<any>
	{
		return this.panelComponents[panelId].transitionOut();
	}

	/**
	 * @protected
	 * @method updateCustomScrollbar
	 */
	protected updateCustomScrollbar(): void
	{
		const scrollWrapper = this.getCustomScrollbar();
		if(scrollWrapper)
		{
			scrollWrapper.update();
		}
	}

	public getCustomScrollbar(): Scrollbar
	{
		return ko.utils.domData.get(this.getCustomScrollElement(), Scrollbar.BINDING_NAME);
	}

	/**
	 * @private
	 * @method getCustomScrollElement
	 */
	private getCustomScrollElement(): HTMLElement
	{
		return <HTMLElement>this.element.querySelector('.js-scroll-wrapper');
	}

	/**
	 * @private
	 * @method addEvents
	 */
	private addEvents(): void
	{
		// On panel Mask click, hide the panel
		let mask = $(this.element).next('.slideout-panel-mask')[0];

		if(mask)
		{
			mask.addEventListener('click', this.viewModel.handleCloseClick.bind(this.viewModel));
		}

		this.destructibles.add(new NativeEventListener(window, 'resize', ThrottleDebounce.debounce(this.handleResize, 250, this)));
	}

	/**
	 * @private
	 * @method handleResize
	 */
	private handleResize(): void
	{
		this.checkScroll();
	}

	/**
	 * @public
	 * @method destruct
	 */
	public destruct(): void
	{
		ScrollUtils.enableScroll();

		super.destruct();
	}
}

export default DefaultSlideoutPanelController;
