import NotificationTypes from 'data/enum/NotificationTypes';
import get from 'lodash/get';
import has from 'lodash/has';

export const SHOW = 'show';
export const SHOW_SERVER_ERROR = 'showServerError';

const defaultState = {
	isActive: false,
	type: null,
	icon: null,
	heading: null,
	paragraph: null,
	yes: null,
	no: null,
	ok: null,
	send: null,
	resolve: null,
};

/**
 *
 * Example:
 *
 * this.$store.dispatch(NotificationMutationTypes.SHOW, {
 * 		type: NotificationTypes.CONFIRMATION,
 * 		heading: 'Title goes here',
 * 		paragraph: 'message goes here',
 * 	}).then(result => console.log(result));
 *
 */
export default {
	namespaced: true,
	state: Object.assign({}, defaultState),
	actions: {
		[SHOW](context, payload) {
			let notificationResult = null;
			return new Promise(resolve =>
				context.commit(
					SHOW,
					Object.assign({ isActive: true }, payload, {
						resolve,
					}),
				),
			)
				.then(result => {
					notificationResult = result;
				})
				.then(() => context.commit(SHOW, Object.assign({}, defaultState)))
				.then(() => Promise.resolve(notificationResult));
		},
		[SHOW_SERVER_ERROR](context, errorCode) {
			let heading;
			let paragraph;
			const { translation } = context.rootGetters;
			const headingPath = `notification.alert.server_message.${errorCode}.heading`;
			const paragraphPath = `notification.alert.server_message.${errorCode}.paragraph`;

			if (has(translation, headingPath) && has(translation, paragraphPath)) {
				heading = get(translation, headingPath);
				paragraph = get(translation, paragraphPath);
			} else {
				heading = get(translation, 'notification.alert.something_went_wrong.heading');
				paragraph = get(translation, 'notification.alert.something_went_wrong.paragraph');
			}

			return context.dispatch(SHOW, {
				heading,
				paragraph,
				type: NotificationTypes.ALERT,
			});
		},
	},
	mutations: {
		[SHOW]: (state, payload) => {
			Object.keys(state).forEach(key => {
				state[key] = payload[key];
			});
		},
	},
};
