import AbstractPageViewModel from "lib/gaia/asset/AbstractPageViewModel";
import AbstractPageController from "../../lib/gaia/asset/AbstractPageController";

/**
 * Base class for all page ViewModels. App-specific data that has to be present on all page viewModels
 * can be added here.
 *
 * @class DefaultPageViewModel
 * @extend gaia.assets.AbstractPageViewModel
 */
class DefaultPageViewModel<T extends AbstractPageController<any>> extends AbstractPageViewModel<T>
{
}

export default DefaultPageViewModel;