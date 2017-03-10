import IAbstractButtonOptions from "./IAbstractButtonOptions";
import AbstractButtonController from "./AbstractButtonController";
import ButtonSize from "../../data/enum/layout/ButtonSize";
import IMethod from "../../data/interface/action/IMethod";
import ILink from "../../data/interface/action/ILink";
import DefaultComponentTransitionViewModel from "../../util/component-transition/abstract-transition-component/AbstractTransitionComponentViewModel";

abstract class AbstractButtonViewModel<
	TController extends AbstractButtonController<any, any, any>,
	TOptions extends IAbstractButtonOptions
> extends DefaultComponentTransitionViewModel<TController, TOptions>
{
	public disabled: KnockoutObservable<boolean> = ko.observable(false);
	public css: KnockoutComputed<string>;

	/**
	 * @public
	 * @method handleClick
	 */
	public handleClick(event:MouseEvent): void
	{
		event.preventDefault();

		// Do not execute method when is-disabled is set to button.
		if(this.controller.element.classList.contains('is-disabled')) return;

		if((<IMethod>this.data.action).event !== void 0)
		{
			this.controller.triggerMethod();
		}
		else if((<ILink>this.data.action).target !== void 0)
		{
			this.controller.openLink()
		}
		else
		{
			console.warn('[DefaultButtonViewModel] Unknown action:', this.data.action)
		}
	}

	/**
	 * @public
	 * @method  get size
	 * @returns {string}
	 */
	public get size(): string
	{
		return ButtonSize[this.data.size !== void 0 ? this.data.size : ButtonSize.LARGE].toLowerCase();
	}

	/**
	 * @public
	 * @method get label
	 * @returns {String}
	 */
	public get label(): string
	{
		return this.data.action.label;
	}

	/**
	 * @public
	 * @method  get title
	 * @returns {any}
	 */
	public get title():string
	{
		return (<ILink>this.data.action).title
	}
}

export default AbstractButtonViewModel;
