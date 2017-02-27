import ContactTransitionController from "./ContactTransitionController";
import Log from "../../../../../lib/temple/util/Log";
import {IContactOptions} from "./IContactOptions";
import ContactViewModel from "./ContactViewModel";
import AbstractTransitionComponentController from "../../../../util/component-transition/abstract-transition-component/AbstractTransitionComponentController";
import Loader from "../../../../util/Loader";
import DataManager from "../../../../data/DataManager";
import FixedElementHelper from "../../../../util/FixedElementHelper";
import LocaleManager from "../../../../../lib/temple/locale/LocaleManager";

class ContactController extends AbstractTransitionComponentController<ContactViewModel, IContactOptions, ContactTransitionController>
{
	/**
	 *    Instance of Log debug utility for debug logging
	 *    @property _debug
	 *    @private
	 */
	private _debug: Log = new Log('app.component.Contact');

	private _loader: Loader;
	private _dataManager: DataManager = DataManager.getInstance();
	private _fixedInputElementHelper: FixedElementHelper;


	/**
	 *    Overrides AbstractPageController.init()
	 *    @method init
	 */
	public init(): void
	{
		super.init();

		this._debug.log('Init');

		this._loader = new Loader(this.element);
		this.viewModel.myValidator.applyClassesToParent = true;

		this.transitionController = new ContactTransitionController(this.element, this);

		this._fixedInputElementHelper = new FixedElementHelper(this.element);
	}

	/**
	 * @public
	 * @method onSubmit
	 */
	public onSubmit(): void
	{
		if(this.viewModel.myValidator.validate())
		{
			// Show loader
			this._loader.show()
				.then(() => this._loader.hide())
				.then(() => this._dataManager.panelController.transitionOut())
				.then(() => this._dataManager.notification.showAlert(
					LocaleManager.getInstance().getString('notification.alert.contact_success.heading'),
					LocaleManager.getInstance().getString('notification.alert.contact_success.paragraph')
				))
				.then(() => this.resetForm());
		}
	}

	/**
	 * @private
	 * @method resetForm
	 */
	private resetForm(): void
	{
		// Reset all the values
		this.viewModel.fields.forEach((field) =>
		{
			// Reset the value
			field.observable('');

			// Reset the validation status
			this.viewModel.myValidator.field(field.name).isValid(null);
		})
	}

	/**
	 *  Overrides AbstractComponentController.destruct()
	 *  @method destruct
	 */
	public destruct(): void
	{
		if(this._loader)
		{
			this._loader.destruct();
			this._loader = null;
		}

		if(this._fixedInputElementHelper)
		{
			this._fixedInputElementHelper.destruct();
			this._fixedInputElementHelper = null;
		}

		// always call this last
		super.destruct();
	}
}

export default ContactController;
