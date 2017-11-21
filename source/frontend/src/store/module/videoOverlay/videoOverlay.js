export const SHOW = 'show';

const defaultState = {
	isActive: false,
	video: null,
	title: null,
	poster: null,
	loop: false,
	controls: false,
	resolve: null,
};

/**
 *
 * Example:
 *
 * this.$store.dispatch(NotificationMutationTypes.SHOW, {
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
			let videoOverlayResult = null;
			return new Promise(resolve =>
				context.commit(
					SHOW,
					Object.assign(
						{
							isActive: true,
						},
						payload,
						{
							resolve,
						},
					),
				),
			)
				.then(result => {
					videoOverlayResult = result;
				})
				.then(() => context.commit(SHOW, Object.assign({}, defaultState)))
				.then(() => Promise.resolve(videoOverlayResult));
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
