import DeviceStateTracker from 'seng-device-state-tracker';
import { CONFIG_MANAGER, GATEWAY, DEVICE_STATE_TRACKER, TASK_LOADER, TRACKING_MANAGER } from 'data/Injectables';
import config from 'config/config';
import ConfigManager from 'seng-config';
import * as axios from 'axios';
import { URLNames } from 'data/enum/configNames';

import { setValue } from './injector';
import { responseFormatter, errorFormatter } from './gatewayFormatter';
import { mediaQueries, DeviceState } from '../config/deviceStateConfig';
import TaskLoader from './preloading/TaskLoader';
import TrackingManager from './tracking/TrackingManager';
import GoogleAnalyticsProvider from './tracking/tracking-provider/google-analytics/GoogleAnalyticsProvider';
import FacebookTrackingPixelProvider from './tracking/tracking-provider/facebook-tracking-pixel/FacebookTrackingPixelProvider';
import TwitterTrackingPixelProvider from './tracking/tracking-provider/twitter-tracking-pixel/TwitterTrackingPixelProvider';
import TrackingProvider from 'util/tracking/TrackingProvider';
import { PropertyNames } from '../data/enum/configNames';
import HotjarProvider from './tracking/tracking-provider/hotjar/HotjarProvider';
import LinkedInTrackingPixelProvider from './tracking/tracking-provider/linkedin-tracking-pixel/LinkedInTrackingPixelProvider';
import ForensicsProvider from './tracking/tracking-provider/forensics/ForensicsProvider';

const setupInjects = () => {
	const configManager = new ConfigManager();
	configManager.init(config.config, config.environment);

	const gateway = axios.create(
		{
			baseURL: configManager.getURL(URLNames.API),
			headers: {
				Accept: 'application/json',
			},
			responseType: 'json',
		},
	);

	gateway.interceptors.response.use(
		response => responseFormatter(response),
		error => Promise.reject(errorFormatter(error)),
	);

	const deviceStateTracker = new DeviceStateTracker(
		{
			mediaQueries,
			deviceState: DeviceState,
			showStateIndicator: true,
			reverseDeviceStateOrder: true,
		},
	);

	const taskLoader = new TaskLoader();

	const trackingManager = new TrackingManager(
		{
			providers:
				{
					[TrackingProvider.GOOGLE_ANALYTICS]: new GoogleAnalyticsProvider(
						{
							trackingId: configManager.getProperty(PropertyNames.GOOGLE_ANALYTICS),
						},
					),
					[TrackingProvider.FACEBOOK_PIXEL]: new FacebookTrackingPixelProvider(
						{
							trackingPixelId: configManager.getProperty(PropertyNames.FACEBOOK_PIXEL),
						},
					),
					[TrackingProvider.TWITTER_PIXEL]: new TwitterTrackingPixelProvider(
						{
							trackingPixelId: configManager.getProperty(PropertyNames.TWITTER_PIXEL),
						},
					),
					[TrackingProvider.LINKEDIN_PIXEL]: new LinkedInTrackingPixelProvider(
						{
							trackingPixelId: configManager.getProperty(PropertyNames.LINKEDIN_PIXEL),
						},
					),
					[TrackingProvider.HOTJAR]: new HotjarProvider(
						{
							trackingId: configManager.getProperty(PropertyNames.HOTJAR),
						},
					),
					[TrackingProvider.FORENSICS]: new ForensicsProvider(
						{
							trackingId: configManager.getProperty(PropertyNames.FORENSICS),
						},
					),
				},
		});

	setValue(CONFIG_MANAGER, configManager);
	setValue(GATEWAY, gateway);
	setValue(DEVICE_STATE_TRACKER, deviceStateTracker);
	setValue(TASK_LOADER, taskLoader);
	setValue(TRACKING_MANAGER, trackingManager);
};

export default setupInjects;
