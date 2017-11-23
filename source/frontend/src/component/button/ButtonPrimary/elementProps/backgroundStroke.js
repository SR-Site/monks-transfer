const stripeProps = viewModel => ({
	ref: 'backgroundStroke',
	attr: {
		x: 0.5,
		y: 0.5,
		vectorEffect: 'non-scaling-stroke',
	},
	class: {
		[viewModel.$style.backgroundStroke]: true,
	},
});

export default stripeProps;
