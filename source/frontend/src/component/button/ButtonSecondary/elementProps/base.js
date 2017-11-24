const baseProps = viewModel => ({
	domProps: {
		title: viewModel.title,
	},
	on: {
		click: viewModel.handleClick,
	},
	class: {
		button: true,
		[viewModel.$style.buttonSecondary]: true,
		[viewModel.$style[viewModel.ClassNameHelper.parseTheme(viewModel.theme)]]: true,
	},
});

export default baseProps;
