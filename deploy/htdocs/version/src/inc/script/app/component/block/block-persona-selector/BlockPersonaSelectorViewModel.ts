import DefaultComponentViewModel from "../DefaultComponentViewModel";
import BlockPersonaSelectorController from 'app/component/block/block-persona-selector/BlockPersonaSelectorController';
import IBlockPersonaSelectorOptions from 'app/component/block/block-persona-selector/IBlockPersonaSelectorOptions';

import ko = require('knockout');
import StringUtils from "../../../../lib/temple/util/type/StringUtils";
import PersonaType from "../../../data/enum/type/PersonaType";
import MouseEventHelper from "../../../util/MouseEventHelper";

class BlockPersonaSelectorViewModel extends DefaultComponentViewModel<BlockPersonaSelectorController, IBlockPersonaSelectorOptions>
{
	public StringUtils: Class = StringUtils;
	public PersonaType: Enum = PersonaType;
	public MouseEventHelper:Class = MouseEventHelper;


	public activeIndex:KnockoutObservable<number> = ko.observable(0);

	/**
	 * @public
	 * @method handleMouseEnter
	 */
	public handleMouseEnter(index:number):void
	{
		// Change the active index
		this.activeIndex(index);

		// Transition the background
		this.controller.changeBackgroundImage(index);
	}

	/**
	 * @public
	 * @method handleMouseLeave
	 */
	public handleMouseLeave():void
	{
		console.log('mouse leave');
	}

	/**
	 *  Overrides AbstractComponentViewModel.destruct()
	 *  @method destruct
	 */
	public destruct(): void
	{
		this.StringUtils = null;
		this.PersonaType = null;
		this.MouseEventHelper = null;


		this.activeIndex = null;

		// always call this last
		super.destruct();
	}
}

export default BlockPersonaSelectorViewModel;
