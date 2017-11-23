const baseProps = viewModel => ({
	domProps: {
		title: viewModel.title,
	},
	on: {
		click: viewModel.handleClick,
	},
	class: {
		button: true,
		[viewModel.$style.buttonTag]: true,
		[viewModel.$style.isInactive]: viewModel.isInactive,
	},
});

export default baseProps;
