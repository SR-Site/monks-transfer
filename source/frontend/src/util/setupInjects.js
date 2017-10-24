import DeviceStateTracker from 'seng-device-state-tracker';
import { CONFIG_MANAGER, GATEWAY, DEVICE_STATE_TRACKER, TASK_LOADER } from 'data/Injectables';
import config from 'config/config';
import ConfigManager from 'seng-config';
import * as axios from 'axios';
import { URLNames } from 'data/enum/configNames';

import { setValue } from './injector';
import { responseFormatter, errorFormatter } from './gatewayFormatter';
import { mediaQueries, DeviceState } from '../config/deviceStateConfig';
import TaskLoader from './preloading/TaskLoader';

const setupInjects = () => {
	const configManager = new ConfigManager();
	configManager.init(config.config, config.environment);

	const gateway = axios.create({
		baseURL: configManager.getURL(URLNames.API),
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
		showStateIndicator: true,
		reverseDeviceStateOrder: true,
	});

	const taskLoader = new TaskLoader();

	setValue(CONFIG_MANAGER, configManager);
	setValue(GATEWAY, gateway);
	setValue(DEVICE_STATE_TRACKER, deviceStateTracker);
	setValue(TASK_LOADER, taskLoader);
};

export default setupInjects;
