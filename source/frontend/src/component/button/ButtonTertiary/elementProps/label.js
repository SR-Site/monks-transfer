const stripeProps = viewModel => ({
	ref: 'label',
	class: {
		[viewModel.$style.label]: true,
	},
	domProps: {
		innerHTML: viewModel.label,
	},
});

export default stripeProps;
