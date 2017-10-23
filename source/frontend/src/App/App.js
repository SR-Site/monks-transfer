import { DeviceStateEvent } from 'seng-device-state-tracker';
import SiteHeader from '../component/layout/SiteHeader/SiteHeader';
import SiteFooter from '../component/layout/SiteFooter/SiteFooter';
import Notification from '../component/Notification/Notification';

export default {
	name: 'App',
	components: {
		SiteHeader,
		SiteFooter,
		Notification,
	},
	mounted() {
		this.$deviceState.addEventListener(DeviceStateEvent.STATE_UPDATE, event => {
			console.log(event);
		});
	},
};
