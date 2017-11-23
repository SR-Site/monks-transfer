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
		[viewModel.$style.buttonCircleIcon]: true,
		[viewModel.$style[ClassNameHelper.parseTheme(viewModel.theme)]]: true,
		[viewModel.$style[ClassNameHelper.parseAlignment(viewModel.iconPosition)]]: true,
	},
});

export default baseProps;
