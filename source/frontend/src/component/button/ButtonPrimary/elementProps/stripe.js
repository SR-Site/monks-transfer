const stripeProps = viewModel => ({
	ref: 'stripe',
	class: {
		[viewModel.$style.stripe]: true,
	},
});

export default stripeProps;
