import AbstractBlockComponentController from "../AbstractBlockComponentController";
import BlockProgramModuleTransitionController from "app/component/block/block-program-module/BlockProgramModuleTransitionController";
import IBlockProgramModuleOptions from "app/component/block/block-program-module/IBlockProgramModuleOptions";
import BlockProgramModuleViewModel from "app/component/block/block-program-module/BlockProgramModuleViewModel";
import Log from "lib/temple/util/Log";
import ProgramModuleItemTransitionController from "../../program-module-item/ProgramModuleItemTransitionController";
import Promise = require("bluebird");

class BlockProgramModuleController extends AbstractBlockComponentController<BlockProgramModuleViewModel, IBlockProgramModuleOptions, BlockProgramModuleTransitionController>
{
	private _hoverTimelineResolveMethod: ()=>void;
	private _hoverTimelinePromise: Promise<any>;

	/**
	 *    Instance of Log debug utility for debug logging
	 *    @property _debug
	 *    @private
	 */
	private _debug: Log = new Log('app.component.BlockProgramModule');

	/**
	 *    Overrides AbstractPageController.init()
	 *    @method init
	 */
	public init(): void
	{
		super.init();

		this._debug.log('Init');
	}

	/**
	 * @public
	 * @method openProgramModule
	 */
	public openProgramModule(element: HTMLElement): void
	{
		const component = element.querySelector('.component-program-module-item');
		const transitionController = <ProgramModuleItemTransitionController> this.transitionController.getTransitionController(component);

		if(this._hoverTimelinePromise)
		{
			this._hoverTimelinePromise
				.then(() => transitionController.onMouseEnter());
		}
		else
		{
			transitionController.onMouseEnter();
		}
	}

	/**
	 * @public
	 * @method closeProgramModule
	 */
	public closeProgramModule(element: HTMLElement): void
	{
		this._hoverTimelinePromise = new Promise((resolve: ()=>void) =>
		{
			this._hoverTimelineResolveMethod = resolve;
		});

		const component = element.querySelector('.component-program-module-item');
		const transitionController = <ProgramModuleItemTransitionController> this.transitionController.getTransitionController(component);

		transitionController.onMouseLeave()
			.then(() => this._hoverTimelineResolveMethod());
	}


	/**
	 * @protected
	 * @method allComponentsLoaded
	 */
	protected allComponentsLoaded(): void
	{
		this.transitionController = new BlockProgramModuleTransitionController(this.element, this);

		super.allComponentsLoaded();
	}

	/**
	 *  Overrides AbstractComponentController.destruct()
	 *  @method destruct
	 */
	public destruct(): void
	{
		this._hoverTimelineResolveMethod = null;
		this._hoverTimelinePromise = null;

		// always call this last
		super.destruct();
	}
}

export default BlockProgramModuleController;
