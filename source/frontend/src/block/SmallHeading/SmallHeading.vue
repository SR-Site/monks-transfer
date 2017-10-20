<style src="./SmallHeading.scss" module lang="scss"></style>
<script src="./SmallHeading.js"></script>

<template>
	<div :class="$style.smallHeading" class="site-frame">
		<div :class="$style.overruleOverlap" class="overrule-overlap">
			<h2 class="heading heading-04" v-html="data.heading" ref="heading"></h2>
		</div>
	</div>
</template>
