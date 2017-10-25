import getRouter from 'router';
import { getValue } from 'util/injector';
import { TRACKING_MANAGER } from 'data/Injectables';
import Params from 'data/enum/Params';
import { replace } from 'lodash';
import TrackingProvider from 'util/tracking/TrackingProvider';
import { trackingApartments } from 'data/enum/Apartments';

/**
 * @description Method that actually triggers the page view on the tracking manager
 * @param page
 */
const handlePageChange = pageData => {
	let page = pageData.meta.trackingName;
	// Only track if a label is provided
	if (page) {
		// Replace the url params in the tracking name
		Object.keys(Params).forEach(key => {
			const paramKey = Params[key];
			let paramValue = pageData.params[Params[key]];

			if (paramKey === Params.APARTMENT_ID && paramValue) {
				paramValue = trackingApartments[paramValue.toLowerCase()];
			}
			page = replace(page, `{${paramKey}}`, paramValue);
		});

		// Trigger the page view
		getValue(TRACKING_MANAGER).trackPageView({
			[TrackingProvider.UTM]: {
				page,
			},
		});
	}
};

/**
 * @description Method that enables a global after each listener to trigger the page view events
 */
const enablePageTracking = () => {
	const router = getRouter();

	// After each change trigger the listener
	getRouter().afterEach((to, from) => handlePageChange(to));

	// Listen on init as well
	handlePageChange(router.currentRoute);
};

export default enablePageTracking;
