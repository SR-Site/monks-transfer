import configManagerInstance from "lib/temple/config/configManagerInstance";
import IGateway from "app/net/gateway/IGateway";

import Gateway from "app/net/gateway/Gateway";
import RESTOutputHandler from "app/net/gateway/output/RESTOutputHandler";
import RESTInputHandler from "app/net/gateway/input/RESTInputHandler";
import {URLNames, PropertyNames} from "./enum/ConfigNames";
import SettingsModel from "./model/SettingsModel";
import ServiceModel from "./model/ServiceModel";
import ContentService from "./service/ContentService";
import DeviceStateTracker from "../../lib/temple/util/DeviceStateTracker";
import PageLoaderController from "../component/page-loader/PageLoaderController";
import GlobalSlideoutPanelController from "../component/slideout-panel/global-slideout-panel/GlobalSlideoutPanelController";
import VideoOverlayController from "../component/video-overlay/VideoOverlayController";
import Theme from "./enum/style/Theme";
import NotificationController from "../component/notification/NotificationController";
import UserService from "./service/UserService";


/**
 * @namespace app.data
 * @class DataManager
 */
class DataManager
{
	private static _instance: DataManager;

	public deviceStateTracker: DeviceStateTracker = new DeviceStateTracker();

	public pageLoader: PageLoaderController;
	public panelController: GlobalSlideoutPanelController;
	public notification: NotificationController;

	/**
	 * @property gateway
	 * @type Gateway
	 */
	public gateway: IGateway;

	/**
	 * Global observables
	 */
	public headerTheme: KnockoutObservable<Theme> = ko.observable(Theme.LIGHT);
	public hideContactButton: KnockoutObservable<boolean> = ko.observable(false);
	public currentRoute:KnockoutObservable<string> = ko.observable('');

	/**
	 * Models
	 */
	public settingsModel: SettingsModel = new SettingsModel();
	public serviceModel: ServiceModel = new ServiceModel();

	public videoOverlay: VideoOverlayController;


	/**
	 * Returns a instance of the datamanager
	 *
	 * @method getInstance
	 * @returns {DataManager}
	 */
	public static getInstance(): DataManager
	{
		if(!DataManager._instance)
		{
			DataManager._instance = new DataManager();
			window['dataManager'] = DataManager._instance;
		}

		return DataManager._instance;
	}

	/**
	 * Set up gateway, services and models.
	 * Called from the StartUp
	 *
	 * @method setupGateway
	 */
	public setupGateway(): void
	{
		this.gateway = new Gateway({
			// the base url
			url: configManagerInstance.getURL(configManagerInstance.getProperty(PropertyNames.MOCK_CONTENT) ? URLNames.MOCK_API : URLNames.API),
			headers: {
				'X-Force-Status-Code-200': 1
			},
			// the default output handler (can be changed to PostOutputHandler or JSONOutputHandler for the 'old gateway', or to RESTOutputHandler for the 'new style'
			outputHandler: new RESTOutputHandler(),
			inputHandler: new RESTInputHandler()
		}, true);
	}

	/**
	 * @public
	 * @method setupServices
	 */
	public setupServices(): void
	{
		this.serviceModel.contentService = new ContentService(this.gateway, false);
		this.serviceModel.userService = new UserService(this.gateway, false);
	}

	/**
	 * @class DataManager
	 * @constructor
	 */
	constructor()
	{
	}
}

export default DataManager;
