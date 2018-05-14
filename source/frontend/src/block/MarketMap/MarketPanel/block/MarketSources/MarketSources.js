import { AbstractTransitionComponent } from 'vue-transition-component';
import VueTypes from 'vue-types';
import NotificationTypes from '../../../../../data/enum/NotificationTypes';
import UserService from '../../../../../net/service/UserService';
import { NotificationMutationTypes } from '../../../../../store/module/notification';
import MarketSourcesTransitionController from './MarketSourcesTransitionController';

export default {
	name: 'MarketSources',
	extends: AbstractTransitionComponent,
	props: {
		marketId: VueTypes.string.isRequired,
		data: VueTypes.shape({
			credits: VueTypes.arrayOf(VueTypes.shape({
				source: VueTypes.string.isRequired
			})).isRequired,
			heading: VueTypes.string,
		}),
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new MarketSourcesTransitionController(this);
			this.isReady();
		},
	},
};
