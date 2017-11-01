import VueTypes from 'vue-types';
import { debounce } from 'lodash';
import { AbstractBlockComponent } from 'vue-block-system';
import ProgramModuleTransitionController from './ProgramModuleTransitionController';
import ProgramModuleData from './ProgramModuleData';
import ScrollBar from '../../component/ScrollBar/ScrollBar';
import DraggableInstance from '../../util/draggableInstance/DraggableInstance';
import DraggableInstanceEvent from '../../util/draggableInstance/DraggableInstanceEvent';
import NativeEventListener from '../../util/event/NativeEventListener';
import ProgramTeaser from './ProgramTeaser/ProgramTeaser';

export default {
	name: 'ProgramModule',
	extends: AbstractBlockComponent,
	components: {
		ProgramTeaser,
		ScrollBar,
	},
	data() {
		return {
			activeIndex: 0,
		};
	},
	props: {
		data: VueTypes.shape(ProgramModuleData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new ProgramModuleTransitionController(this);
			this.draggableInstance = new DraggableInstance(
				this.$refs.draggableContainer,
				{
					maxDuration: 0.5,
					invert: true,
				},
			);
			this.draggableCompleteListener = new NativeEventListener(
				this.draggableInstance,
				DraggableInstanceEvent.UPDATE,
				this.handleDraggableUpdate,
			);
			this.resizeListener = new NativeEventListener(
				window,
				'resize',
				debounce(this.handleResize, 250),
			);
			this.scrollBar = this.getChild('ScrollBar');
			this.handleResize();
			this.isReady();
		},
		handleResize() {
			this.draggableInstance.setSnapPosition(
				this.$refs.draggableElement.offsetWidth / this.data.items.length,
			);
		},
		handleDraggableUpdate(event) {
			this.scrollBar.setProgress(event.data.progress);
		},
		handleScrollBarUpdate(progress) {
			this.draggableInstance.update(progress);
		},
		getArticleData(article) {
			const clone = JSON.parse(JSON.stringify(article));

			// Add the required props
			return Object.assign(clone, {
				marginTop: 0,
				windowed: false,
				overlap: false,
			});
		},
	},
	beforeDestroy() {
		this.resizeListener.dispose();
		this.resizeListener = null;
		this.draggableInstance.dispose();
		this.draggableInstance = null;
		this.draggableCompleteListener.dispose();
		this.draggableCompleteListener = null;
	},
};
