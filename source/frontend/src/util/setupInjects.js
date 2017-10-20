import { CONFIG_MANAGER, GATEWAY } from 'data/Injectables';
import config from 'config/config';
import ConfigManager from 'seng-config';
import * as axios from 'axios';
import { URLNames } from 'data/enum/configNames';

import { setValue } from './injector';
import { responseFormatter, errorFormatter } from './gatewayFormatter';
import { DEVICE_STATE_TRACKER } from '../data/Injectables';
import DeviceStateTracker from 'seng-device-state-tracker';
import { mediaQueries, deviceState } from '../config/deviceStateConfig';

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
			deviceState,
			showStateIndicator: true,
			reverseDeviceStateOrder: false,
		},
	);

	setValue(CONFIG_MANAGER, configManager);
	setValue(GATEWAY, gateway);
	setValue(DEVICE_STATE_TRACKER, deviceStateTracker);
};

export default setupInjects;
