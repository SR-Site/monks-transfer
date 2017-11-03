import { AbstractTransitionComponent, TransitionEvent } from 'vue-transition-component';
import SlideoutPanelTransitionController from './SlideoutPanelTransitionController';
import PanelContact from './panel/PanelContact/PanelContact';
import SlideoutPanelType from 'data/enum/SlideoutPanelType';
import keyCode from 'key-code';
import NativeEventListener from '../../util/event/NativeEventListener';
import Scrollbar from '../../util/ScrollBar';
import PanelContactKernel from './panel/PanelContactKernel/PanelContactKernel';

export default {
	name: 'SlideoutPanel',
	extends: AbstractTransitionComponent,
	components: {
		PanelContact,
		PanelContactKernel,
	},
	data() {
		return {
			spinnerActive: false,
		};
	},
	created() {
		this.type = SlideoutPanelType;
		this.panels = {};
		this.activePanel = null;
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new SlideoutPanelTransitionController(this);
			this.transitionInListener = new NativeEventListener(
				this.transitionController,
				TransitionEvent.TRANSITION_IN_COMPLETE,
				this.handleTransitionInComplete,
			);
			this.transitionOutListener = new NativeEventListener(
				this.transitionController,
				TransitionEvent.TRANSITION_OUT_START,
				() => {
					if (this.keyDownEventListener) {
						this.keyDownEventListener.dispose();
						this.keyDownEventListener = null;
					}
				},
			);
			this.scrollBar = new Scrollbar(
				this.$refs.scrollWrapper,
			);

			this.isReady();
		},
		handleTransitionInComplete() {
			// Crete a listener for closing the popup with the escape key
			this.keyDownEventListener = new NativeEventListener(document, 'keyup', this.handleKeyUp.bind(this));
			this.scrollBar.update();
		},
		handleKeyUp(event) {
			if (!this.spinnerActive && event.keyCode === keyCode.ESC) {
				this.close();
			}
		},
		handlePanelReady(component, id) {
			console.log('panel ready', id);
			this.panels[id] = component;
		},
		handleShowSpinner() {
			this.spinnerActive = true;
			this.getChild('Spinner').transitionIn();
		},
		handleHideSpinner() {
			this.spinnerActive = false;
			this.getChild('Spinner').transitionOut();
		},
		transitionIn(id) {
			return this.allComponentsReady
			.then(() => {
				if (this.activePanel && this.activePanel !== id) {
					return this.panels[id].transitionOut();
				} else {
					return Promise.resolve();
				}
			})
			.then(() => this.transitionController.transitionIn())
			.then(() => this.panels[id].transitionIn())
			.then(() => {
				this.activePanel = id;
			});
		},
		close() {
			this.transitionOut()
			.then(() => this.panels[this.activePanel].transitionOut())
			.then(() => this.activePanel = null);
		},
	},
	beforeDestroy() {
		this.transitionInListener.dispose();
		this.transitionInListener = null;

		this.transitionOutListener.dispose();
		this.transitionOutListener = null;
	},
};
