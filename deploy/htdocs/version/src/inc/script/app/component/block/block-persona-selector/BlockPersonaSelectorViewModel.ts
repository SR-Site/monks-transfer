import DefaultComponentViewModel from "../DefaultComponentViewModel";
import BlockPersonaSelectorController from 'app/component/block/block-persona-selector/BlockPersonaSelectorController';
import IBlockPersonaSelectorOptions from 'app/component/block/block-persona-selector/IBlockPersonaSelectorOptions';

import ko = require('knockout');
import StringUtils from "../../../../lib/temple/util/type/StringUtils";
import PersonaType from "../../../data/enum/type/PersonaType";

class BlockPersonaSelectorViewModel extends DefaultComponentViewModel<BlockPersonaSelectorController, IBlockPersonaSelectorOptions>
{
	public StringUtils: Class = StringUtils;
	public PersonaType: Enum = PersonaType;

	/**
	 *  Overrides AbstractComponentViewModel.destruct()
	 *  @method destruct
	 */
	public destruct(): void
	{
		this.StringUtils = null;
		this.PersonaType = null;

		// always call this last
		super.destruct();
	}
}

export default BlockPersonaSelectorViewModel;
