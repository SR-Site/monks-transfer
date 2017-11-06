import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import ProductListTransitionController from './ProductListTransitionController';
import ProductListData from './ProductListData';
import ProductTeaser from './ProductTeaser/ProductTeaser';
import ScrollBar from '../../component/ScrollBar/ScrollBar';
import DraggableInstance from '../../util/draggableInstance/DraggableInstance';
import DraggableInstanceEvent from '../../util/draggableInstance/DraggableInstanceEvent';
import NativeEventListener from '../../util/event/NativeEventListener';
import { debounce } from 'lodash';

export default {
	name: 'ProductList',
	extends: AbstractBlockComponent,
	components: {
		ProductTeaser,
		ScrollBar,
	},
	props: {
		data: VueTypes.shape(ProductListData).isRequired,
	},
	data() {
		return {
			activeIndex: 0,
		};
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new ProductListTransitionController(this);
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
				this.$refs.draggableElement.offsetWidth / this.data.products.length,
			);
		},
		handleDraggableUpdate(event) {
			this.scrollBar.setProgress(event.data.progress);
		},
		handleScrollBarUpdate(progress) {
			clearTimeout(this.scrollBarEndTimeout);
			this.draggableInstance.update(progress);
		},
		handleScrollBarEnd() {
			clearTimeout(this.scrollBarEndTimeout);
			this.scrollBarEndTimeout = setTimeout(() => this.draggableInstance.snapToNearestPoint(), 10);
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
