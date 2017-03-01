import DefaultComponentTransitionViewModel from "../../util/component-transition/abstract-transition-component/AbstractTransitionComponentViewModel";
import PercentageLoaderController from 'app/component/percentage-loader/PercentageLoaderController';
import IPercentageLoaderOptions from 'app/component/percentage-loader/IPercentageLoaderOptions';

import ko = require('knockout');
import PercentageLoaderBorderType from "./enum/PercentageLoaderBorderType";

class PercentageLoaderViewModel extends DefaultComponentTransitionViewModel<PercentageLoaderController, IPercentageLoaderOptions>
{
	public amount: KnockoutObservable<number> = ko.observable(0);
	public label:KnockoutObservable<string> = ko.observable('');

	public PercentageLoaderBorderType: Enum = PercentageLoaderBorderType;

	/**
	 *  Overrides AbstractComponentViewModel.destruct()
	 *  @method destruct
	 */
	public destruct(): void
	{
		this.amount = null;
		this.PercentageLoaderBorderType = null;

		// always call this last
		super.destruct();
	}
}

export default PercentageLoaderViewModel;
