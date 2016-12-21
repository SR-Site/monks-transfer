import EventDispatcher from "lib/temple/event/EventDispatcher";
import DestructibleHelper from "lib/temple/core/DestructibleHelper";
import Log from "lib/temple/util/Log";
import AbstractComponentViewModel from "./AbstractComponentViewModel";

/**
 * Abstract controller class for a component. All component controllers should extend this class.
 *
 * @namespace temple.component
 * @class AbstractComponentController
 * @extend temple.events.EventDispatcher
 */
abstract class AbstractComponentController<TViewModel extends AbstractComponentViewModel<any, any>, TOptions> extends EventDispatcher
{
	/**
	 * @description This string is used to bind the components controller on the knockout element so we can access the
	 * controller based on the html element. This is used for dynamically fetching component timelines.
	 * @type {string}
	 * @property BINDING_NAME
	 */
	public static BINDING_NAME:string = 'knockoutComponent';

	/**
	 * The root element of the template of this component in the DOM.
	 *
	 * @property element
	 */
	public element:HTMLElement;

	/**
	 * A reference to the ViewModel that will be used by knockout to render the template of this component.
	 *
	 * @property viewModel
	 */
	protected viewModel:TViewModel & AbstractComponentViewModel<this, TOptions>;

	/**
	 * An object containing the options that have been passed to this component from the knockout component
	 * binding.
	 *
	 * @property options
	 */
	public options:TOptions;

	/**
	 * A string containing the HTML markup that will be used as template for this component.
	 *
	 * @property template
	 */
	protected template:string;

	/**
	 * Instance of helper class to destruct created objects
	 *
	 * @property destructibles
	 */
	protected destructibles:DestructibleHelper;

	/**
	 * Intro
	 * ==========
	 * Components are a clean way of organizing your UI elements/widgets into self-contained, reusable chunks. Components have
	 * their own controller, viewmodel and template. They are loaded asynchronously, receive options, are evented and
	 * can even be nested. Multiple of the same component may exist on the same page. Components are called using
	 * knockout bindings from your view's template.
	 *
	 * Creating a component
	 * ====================
	 * It is advised to use the create-component Grunt task to automatically create a component. Open a console in the
	 * tools/build directory of your project and run:
	 *
	 *     grunt component --name my-component
	 *
	 * where `my-component` is the name of your component. The task will automatically create a controller, viewmodel,
	 * template and options interface for you. Make sure the given name is hyphen-seperated (not camelcase, or
	 * underscored). It will create a `MyComponentController` class, `my-component.html` template and so forth.
	 *
	 * Using a component
	 * =================
	 * You can initialize a component by adding the following in your view:
	 *
	 *     <!--ko component: 'my-component'--><!--/ko-->
	 *
	 * Components can also be passed options.
	 *
	 *     <!--ko component: {
	 *         name: 'my-component',
	 *         options: {
	 *             foo: 'bar',
	 *             bar: 'baz'
	 *         }
	 *     --><!--/ko-->
	 *
	 * Because components are loaded asynchronously, you should never expect it to be loaded when your parent page's
	 * `init()` function is called. Because of this, you can pass a function to the component which is called when the
	 * component is ready.
	 *
	 *     <!--ko component: {
	 *         name: 'my-component',
	 *         onReady: controller.myComponentReady.bind(controller)
	 *     --><!--/ko-->
	 *
	 * The function `myComponentReady` will be called with the component's controller as the first argument.
	 *
	 *     myComponentReady(component:MyComponentController) {
	 *         // add event listeners to the component
	 *         // or call some methods on the component
	 *         // etc
	 *     }
	 *
	 * Developing components
	 * =====================
	 * Components are structured the same way pages are. They have a controller, viewmodel and template. Additionally,
	 * a component also has an options (`MyComponentOptions`) interface, in which you declare the options that may be
	 * passed to your component (for TypeScript's type checker).
	 *
	 * A SCSS file is also automatically created for styling your component. It can be found in `style/component`.
	 *
	 * ## Wrapping a component around arbitrary HTML
	 * In some cases it will be necessary to create a component that wraps itself around some arbitrary HTML which the
	 * component can transform:
	 *
	 *     <!--ko component: 'my-component'-->
	 *         <p>Hello world!</p>
	 *     <!--/ko-->
	 *
	 * A good example is a custom scrolling wrapper, where the component should handle the
	 * scrollbar, touch support (e.g. Greensock's Draggable) and so forth. For this reason, components may manage the
	 * application of the template themselves to let the author of the component choose what to do.
	 *
	 * AbstractComponentController has a method called `setTemplate`. The component's template is passed as a string. By
	 * default `setTemplate` clears the inner HTML of the virtual element, applies the template and binds the viewmodel
	 * to the template. You can change how this method behaves by overwriting it in your `MyComponentController`.
	 *
	 * Footnotes
	 * =========
	 * * Never call AbstractComponentController/ViewModel manually! A component should extend these classes.
	 * * Components are loaded asynchronously: do NOT expect a component to be loaded when your page's `init()` is called
	 *   always use the callback to run code when the component is available in the view.
	 * * As always, make sure you clean up your variables in the `destruct` method.
	 *
	 * @class AbstractComponentController
	 * @constructor
	 * @param {HTMLElement} element
	 * @param options
	 */
	constructor(element:HTMLElement, options?:TOptions)
	{
		super();

		this.destructibles = new DestructibleHelper();
		this.element = element;

		if(typeof options !== 'undefined')
		{
			this.options = options;
		}
	}

	/**
	 * Subsribes an observable to another observable. Useful for binding observables passed to a component through
	 * options to an observable in the component's viewmodel.
	 *
	 * @method applyThreeWayBinding
	 * @param {KnockoutObservable<any>} source
	 * @param {KnockoutObservable<any>} target
	 */
	public applyThreeWayBinding(source:KnockoutObservable<any>, target:KnockoutObservable<any>)
	{
		if(ko.isObservable(source))
		{
			this.destructibles.addKOSubscription(source.subscribe(target));
		}

		target(ko.unwrap(source));
	}

	/**
	 * Applies the template to the container DOM.
	 * Override this in your controller if you want to use the HTML provided inside the container.
	 *
	 * @method setTemplate
	 * @param {string} template The string containing the HTML template to use
	 */
	public setTemplate(template:string):void
	{
		if(template == void 0)
		{
			return;
		}

		ko.cleanNode(this.element);
		ko.virtualElements.emptyNode(this.element);
		this.template = template;

		let templateNodes = ko.utils.parseHtmlFragment(template)
			.filter((el) => el.nodeType == document.ELEMENT_NODE);

		if(templateNodes.length > 1)
		{
			Log.error('temple.component.AbstractComponentController', 'Component template has multiple root elements. Knockout bindings will only be applied to the first root element!');
		}

		ko.virtualElements.setDomNodeChildren(this.element, templateNodes);

		ko.applyBindings(this.viewModel, ko.virtualElements.firstChild(this.element));

		this.element = <HTMLElement> ko.virtualElements.firstChild(this.element);
	}

	/**
	 * @method setViewModel
	 * @param viewModel
	 */
	public setViewModel(viewModel:TViewModel & AbstractComponentViewModel<this, TOptions>)
	{
		this.viewModel = viewModel;
		this.viewModel.setController(this);
	}

	/**
	 * This method will be called after the component DOM is ready and knockout has applied bindings.
	 *
	 * @method init
	 */
	public abstract init():void;

	/**
	 * @inheritDoc
	 */
	public destruct():void
	{
		if(!this.isDestructed())
		{
			ko.cleanNode(this.element);
		}

		if(this.viewModel)
		{
			this.viewModel.destruct();
			this.viewModel = null;
		}

		if(this.destructibles)
		{
			this.destructibles.destruct();
			this.destructibles = null;
		}

		this.element = null;
		this.options = null;
		this.template = null;
		this.eventNamespace = null;

		super.destruct();
	}
}

export default AbstractComponentController;