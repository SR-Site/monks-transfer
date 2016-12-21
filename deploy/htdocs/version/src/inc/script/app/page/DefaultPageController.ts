import AbstractPageController from "lib/gaia/asset/AbstractPageController";
import AbstractPageViewModel from "../../lib/gaia/asset/AbstractPageViewModel";

/**
 * Base class for all page controllers. App-specific functionality that should be present on all page controllers
 * can be added here.
 *
 * @namespace app.page
 * @class DefaultPageController
 * @extend gaia.assets.AbstractPageController
 */
class DefaultPageController<T extends AbstractPageViewModel<any>> extends AbstractPageController<T>
{
}

export default DefaultPageController;