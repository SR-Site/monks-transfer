<style src="./MarketImage.scss" module lang="scss"></style>
<script src="./MarketImage.js"></script>

<template>
	<div :class="$style.wrapper">
		<h3 :class="['heading', 'heading-06', $style.heading]" v-if="data.heading">{{data.heading}}</h3>
		<div :class="$style.image">
			<ResponsiveImage :image="data.image" class="abs-fill fit-cover"/>
		</div>
	</div>
</template>
