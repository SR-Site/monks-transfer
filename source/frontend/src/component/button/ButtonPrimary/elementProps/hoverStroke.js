const stripeProps = viewModel => ({
	ref: 'hoverStroke',
	attr: {
		x: 0.5,
		y: 0.5,
		vectorEffect: 'non-scaling-stroke',
	},
	class: {
		[viewModel.$style.hoverStroke]: true,
	},
});

export default stripeProps;
