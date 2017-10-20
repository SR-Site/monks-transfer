export const SHOW = 'show';

const defaultState = {
	isActive: false,
	type: null,
	icon: null,
	heading: null,
	paragraph: null,
	yes: null,
	no: null,
	ok: null,
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
		show(context, payload) {
			let notificationResult = null;
			return new Promise(resolve => context.commit(SHOW, Object.assign({ isActive: true }, payload, { resolve })))
				.then(result => {
					notificationResult = result;
				})
				.then(() => context.commit(SHOW, Object.assign({}, defaultState)))
				.then(() => Promise.resolve(notificationResult));
		},
	},
	mutations: {
		show: (state, payload) => {
			Object.keys(state).forEach(key => {
				state[key] = payload[key];
			});
		},
	},
};
