const stripeProps = viewModel => ({
	ref: 'icon',
	class: {
		[viewModel.$style.icon]: true,
	},
	props: {
		name: viewModel.icon,
	},
});

export default stripeProps;
