<style src="./MarketImages.scss" module lang="scss">
</style>
<script src="./MarketImages.js">
</script>

<template>
	<div :class="$style.wrapper">
		<h3 :class="['heading', 'heading-06', $style.heading]" v-if="data.heading">{{data.heading}}</h3>
		<h3 :class="['heading', 'heading-07', $style.subHeading]" v-if="data.subHeading">{{data.subHeading}}</h3>
		<div :class="$style.images">
			<div :class="$style.image" v-for="(image, index) in data.images" :key="index">
				<ResponsiveImage class="abs-fill fit-contain" :image="image"/>
			</div>
		</div>
	</div>
</template>
