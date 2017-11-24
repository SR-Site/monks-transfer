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
		[viewModel.$style[viewModel.ClassNameHelper.parseTheme(viewModel.theme)]]: true,
		[viewModel.$style[viewModel.ClassNameHelper.parseAlignment(viewModel.iconPosition)]]: true,
	},
});

export default baseProps;
