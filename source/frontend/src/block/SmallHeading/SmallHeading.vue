<style src="./SmallHeading.scss" module lang="scss"></style>
<script src="./SmallHeading.js"></script>

<template>
	<div :class="$style.smallHeading">
		<div class="site-frame is-small include-padding">
			<div :class="$style.overruleOverlap" class="overrule-overlap">
				<div :class="$style.heading" v-html="data.heading" ref="heading"></div>
			</div>
		</div>
	</div>
</template>
