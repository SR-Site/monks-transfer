import ClassNameHelper from 'util/ClassNameHelper';

const baseProps = viewModel => ({
	domProps: {
		title: viewModel.title,
	},
	on: {
		click: viewModel.handleClick,
	},
	class: {
		button: true,
		[viewModel.$style.buttonQuaternary]: true,
		[viewModel.$style[ClassNameHelper.parseTheme(viewModel.theme)]]: true,
	},
});

export default baseProps;
