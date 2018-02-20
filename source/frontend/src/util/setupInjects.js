import * as axios from 'axios';
import config from 'config/config';
import { PropertyNames, URLNames, VariableNames } from 'data/enum/configNames';
import { CONFIG_MANAGER, DEVICE_STATE_TRACKER, GATEWAY, TASK_LOADER, TRACKING_MANAGER } from 'data/Injectables';
import ConfigManager from 'seng-config';
import DeviceStateTracker from 'seng-device-state-tracker';
import { DeviceState, mediaQueries } from '../config/deviceStateConfig';
import { errorFormatter, responseFormatter } from './gatewayFormatter';
import { setValue } from './injector';
import TaskLoader from './preloading/TaskLoader';
// eslint-disable-next-line
import FacebookTrackingPixelProvider from './tracking/tracking-provider/facebook-tracking-pixel/FacebookTrackingPixelProvider';
import ForensicsProvider from './tracking/tracking-provider/forensics/ForensicsProvider';
import GoogleAnalyticsProvider from './tracking/tracking-provider/google-analytics/GoogleAnalyticsProvider';
// eslint-disable-next-line
import LinkedInTrackingPixelProvider from './tracking/tracking-provider/linkedin-tracking-pixel/LinkedInTrackingPixelProvider';
// eslint-disable-next-line
import TwitterTrackingPixelProvider from './tracking/tracking-provider/twitter-tracking-pixel/TwitterTrackingPixelProvider';
import PardotProvider from './tracking/tracking-provider/pardot/PardotProvider';
import TrackingManager from './tracking/TrackingManager';
import TrackingProvider from './tracking/TrackingProvider';

const setupInjects = () => {
	const configManager = new ConfigManager();
	configManager.init(config.config, config.environment);

	const gateway = axios.create({
		baseURL:
			(configManager.getVariable(VariableNames.MOCK_ENABLED) ? '/static' : '') +
			configManager.getURL(URLNames.API),
		headers: {
			Accept: 'application/json',
		},
		responseType: 'json',
	});

	gateway.interceptors.response.use(
		response => responseFormatter(response),
		error => Promise.reject(errorFormatter(error)),
	);

	const deviceStateTracker = new DeviceStateTracker({
		mediaQueries,
		deviceState: DeviceState,
		showStateIndicator: configManager.getVariable(VariableNames.DEBUG_LABEL_ENABLED),
		reverseDeviceStateOrder: true,
	});

	const taskLoader = new TaskLoader();

	const trackingManager = new TrackingManager({
		providers: {
			[TrackingProvider.GOOGLE_ANALYTICS]: new GoogleAnalyticsProvider({
				trackingId: configManager.getProperty(PropertyNames.GOOGLE_ANALYTICS),
			}),
			[TrackingProvider.FACEBOOK_PIXEL]: new FacebookTrackingPixelProvider({
				trackingPixelId: configManager.getProperty(PropertyNames.FACEBOOK_PIXEL),
			}),
			[TrackingProvider.FACEBOOK_PIXEL_2]: new FacebookTrackingPixelProvider({
				trackingPixelId: configManager.getProperty(PropertyNames.FACEBOOK_PIXEL_2),
			}),
			[TrackingProvider.TWITTER_PIXEL]: new TwitterTrackingPixelProvider({
				trackingPixelId: configManager.getProperty(PropertyNames.TWITTER_PIXEL),
			}),
			[TrackingProvider.LINKEDIN_PIXEL]: new LinkedInTrackingPixelProvider({
				trackingPixelId: configManager.getProperty(PropertyNames.LINKEDIN_PIXEL),
			}),
			[TrackingProvider.FORENSICS]: new ForensicsProvider({
				trackingId: configManager.getProperty(PropertyNames.FORENSICS),
			}),
      [TrackingProvider.PARDOT]: new PardotProvider({
        clientId: configManager.getProperty(PropertyNames.PARDOT_CLIENT),
				applicationId: configManager.getProperty(PropertyNames.PARDOT_APP),
				hostname: 'pi.pardot.com',
      }),
		},
	});

	setValue(CONFIG_MANAGER, configManager);
	setValue(GATEWAY, gateway);
	setValue(DEVICE_STATE_TRACKER, deviceStateTracker);
	setValue(TASK_LOADER, taskLoader);
	setValue(TRACKING_MANAGER, trackingManager);
};

export default setupInjects;
