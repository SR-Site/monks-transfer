import EventDispatcher from "lib/temple/event/EventDispatcher";
import DestructibleHelper from "lib/temple/core/DestructibleHelper";

import IPageAsset from "../interface/IPageAsset";
import PageEvent from "../event/PageEvent";
import GaiaHistoryEvent from "../event/GaiaHistoryEvent";

import ko = require('knockout');
import Log from "../../temple/util/Log";
import AbstractPageViewModel from "./AbstractPageViewModel";
import CommonEvent from "../../temple/event/CommonEvent";

/**
 * Abstract controller for pages. Contains logic to initialize a page.
 *
 * @module Gaia
 * @namespace gaia.asset
 * @class AbstractPageController
 * @extends temple.event.EventDispatcher
 */
abstract class AbstractPageController<T extends AbstractPageViewModel<any>> extends EventDispatcher
{
	/**
	 * A reference to the ViewModel that will be used by knockout to render the template of this component.
	 *
	 * @property {AbstractPageViewModel} viewModel
	 */
	protected viewModel:T & AbstractPageViewModel<this>;

	/**
	 * The root div element of the template of this component in the DOM.
	 *
	 * @property {HTMLDivElement} element
	 */
	public element:HTMLDivElement;

	/**
	 * Reference to the PageAsset object containing information on this page configuration like id, route
	 * title, etc...
	 *
	 * @property {IPageAsset} page
	 */
	private _page:IPageAsset;

	public get page():IPageAsset
	{
		return this._page;
	}

	public set page(value:IPageAsset)
	{
		this._page = value;
		if (this._page && this._page.parent)
		{
			this.parent = this._page.parent.getContent();
		}
	}

	/**
	 * Instance of helper class to destruct created objects
	 *
	 * @property {DestructibleHelper} destructibles
	 * @protected
	 */
	protected destructibles:DestructibleHelper = new DestructibleHelper();

	/**
	 * Instance of {{#crossLink "temple.util.log.Log"}}Log{{/crossLink}}, used for logging
	 *
	 * @property _log
	 * @type {Log}
	 * @protected
	 */
	protected _log:Log = new Log('lib.gaia.asset.AbstractPageController');

	/**
	 * Save a reference to the viewmodel for this page, and add a reference back to this page on the viewModel.
	 *
	 * @method setViewModel
	 * @param {AbstractPageViewModel} viewModel The viewModel instance
	 */
	public setViewModel(viewModel:T & AbstractPageViewModel<this>):void
	{
		this.viewModel = viewModel;
		this.viewModel.setController(this);
	}

	/**
	 * Save the a template string in the ko.templates object, so it can be used by the knockout template binding.
	 *
	 * @method setTemplate
	 * @param {string} template
	 */
	public setTemplate(template:string):void
	{
		ko.templates[this.page.id] = template;
	}

	/**
	 * Always call super.init() when you override this method, or else we don't have a ViewController
	 *
	 * @method init
	 */
	public init():void
	{
		this.dispatchEvent(new CommonEvent(CommonEvent.INIT, true));

		// find container to insert this page in
		var container:HTMLDivElement;
		var page = this.page;

		// update the log object with a new namespace based on this page's id
		this._log.setNamespace(this.page.controllerName.replace(/\//ig, '.'));

		while (page.parent && !container)
		{
			// todo, add support for named containers: "[data-gaia-container=" + container + "]"
			var el = page.parent.getContent().element;
			if (this.page.container)
			{
				container = <HTMLDivElement>$('[data-gaia-container="' + this.page.container + '"]', el)[0];
			}
			else
			{
				container = <HTMLDivElement>$('[data-gaia-container]', el)[0];
			}
			page = page.parent;
		}

		// we need a container div for our page
		container = container || <HTMLDivElement>$('[data-gaia-container=' + this.page.container + ']')[0] || <HTMLDivElement>$('[data-gaia-container=main]')[0] || <HTMLDivElement>$('[data-gaia-container]')[0];
		var holder:HTMLDivElement = <HTMLDivElement>document.createElement('div');

		// the template will be loded in this page via data-binding
		$(holder).attr('data-bind', "template: { name: '" + this.page.id + "' }");

		// we need this css-class for our styles
		$(holder).addClass('view view-' + this.page.id.replace(/\./g, '-'));

		// and add it
		container.appendChild(holder);

		// do the KnockOut magic
		ko.applyBindings(this.viewModel, holder);

		// save the refence
		this.element = holder;

		$(this.element).find('[data-gaia-container]').each((index, item) =>
		{
			if ($(item).attr('data-gaia-container') == '')
			{
				$(item).attr('data-gaia-container', this.page.id);
			}
		});

		// hide it for now, we will show it later in the TransitionManager
		this.element.style.visibility = 'hidden';
	}

	/**
	 * Starts the page transition. Calls transitionComplete() when the transition has completed.
	 * Can be overridden in child classes to change behavior.
	 *
	 * @method transition
	 */
	public transition():void
	{
		this._log.log('transition');

		this.transitionComplete();
	}

	/**
	 * Starts the page transition in. Calls transitionInComplete() when the transition in has completed.
	 * Can be overridden in child classes to change behavior.
	 *
	 * @method transitionIn
	 */
	public transitionIn():void
	{
		this._log.log('transitionIn');

		this.element.style.visibility = 'visible';

		this.transitionInComplete();
	}

	/**
	 * Starts the page transition out. Calls transitionOutComplete() when the transition out has completed.
	 * Can be overridden in child classes to change behavior.
	 *
	 * @method transitionOut
	 */
	public transitionOut()
	{
		this._log.log('transitionOut');

		this.element.style.visibility = 'visible';

		this.transitionOutComplete();
	}

	/**
	 * Called when the page transition has completed. Dispatches a TRANSITION_COMPLETE event.
	 * Can be overridden in child classes to change behavior.
	 *
	 * @method transitionComplete
	 */
	public transitionComplete():void
	{
		this._log.log('transitionComplete');

		this.hasEventListener(PageEvent.TRANSITION_COMPLETE) && this.dispatchEvent(new PageEvent(PageEvent.TRANSITION_COMPLETE));
	}

	/**
	 * Called when the page transition in has completed. Dispatches a TRANSITION_IN_COMPLETE event.
	 * Can be overridden in child classes to change behavior.
	 *
	 * @method transitionInComplete
	 */
	public transitionInComplete():void
	{
		this._log.log('transitionInComplete');

		this.hasEventListener(PageEvent.TRANSITION_IN_COMPLETE) && this.dispatchEvent(new PageEvent(PageEvent.TRANSITION_IN_COMPLETE));
	}

	/**
	 * Called when the page transition out has completed. Dispatches a TRANSITION_OUT_COMPLETE event.
	 * Can be overridden in child classes to change behavior.
	 *
	 * @method transitionOutComplete
	 */
	public transitionOutComplete():void
	{
		this._log.log('transitionOutComplete');

		this.hasEventListener(PageEvent.TRANSITION_OUT_COMPLETE) && this.dispatchEvent(new PageEvent(PageEvent.TRANSITION_OUT_COMPLETE));
	}

	/**
	 * Called when the deeplink updates on this page.
	 * Can be overridden in child classes to change behavior.
	 * @param event The GaiaHistoryEvent with data for the deeplink change.
	 * @method onDeeplink
	 */
	public onDeeplink(event:GaiaHistoryEvent):void
	{
	}

	/**
	 * @inheritDoc
	 */
	public destruct():void
	{
		$(this.element).off('.remove');

		if (this.viewModel)
		{
			if (typeof this.viewModel.destruct !== "undefined")
			{
				this.viewModel.destruct();
			}
			this.viewModel = null;
		}

		this.page = null;

		if (this.element)
		{
			ko.cleanNode(this.element);
			$(this.element).remove();
			this.element = null;
		}

		if (this.destructibles)
		{
			this.destructibles.destruct();
			this.destructibles = null;
		}

		super.destruct();
	}
}

export default AbstractPageController;