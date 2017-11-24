const baseProps = viewModel => ({
	domProps: {
		title: viewModel.title,
	},
	on: {
		click: viewModel.handleClick,
		mouseover: viewModel.handleMouseEnter,
		mouseleave: viewModel.handleMouseLeave,
	},
	class: {
		button: true,
		[viewModel.$style.buttonPrimary]: true,
		[viewModel.$style[
			viewModel.ClassNameHelper.parseTheme(viewModel.theme) + (viewModel.solid ? '-solid' : '')
		]]: true,
	},
});

export default baseProps;
