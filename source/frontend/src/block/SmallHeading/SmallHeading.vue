<style src="./SmallHeading.scss" module lang="scss"></style>
<script src="./SmallHeading.js"></script>

<template>
	<div :class="$style.smallHeading">
		<div class="site-frame is-small include-padding">
			<div :class="$style.overruleOverlap" class="overrule-overlap">
				<h2 class="heading heading-04" v-html="data.heading" ref="heading"></h2>
			</div>
		</div>
	</div>
</template>
