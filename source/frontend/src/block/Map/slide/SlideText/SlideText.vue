<style src="./SlideText.scss" module lang="scss"></style>
<script src="./SlideText.js"></script>

<template>
	<div :class="$style.slideText" class="abstract-map-slide abs-fill">
		<div :class="$style.slideTitle" class="slide-title">
			<span class="pagination-number">{{ paddedIndex }}</span>
			<h3 :class="$style.heading" class="heading heading-01" v-html="heading"></h3>
			<p class="copy copy-03" v-html="paragraph"></p>
		</div>
	</div>
</template>
