<style src="./SuccessStoryTeaser.scss" module lang="scss"></style>
<script src="./SuccessStoryTeaser.js"></script>

<template>
	<a
		:class="[$style.successStoryTeaser, {'is-hover': isHover}]"
		@mouseenter="handleMouseEnter"
		@mouseleave="handleMouseLeave"
		v-link="{path: data.target, type: 0}">
		<figure :class="$style.image">
			<ResponsiveImage :image="data.image" class="abs-fill fit-cover"/>
			<div class="primary-gradient-overlay" :class="$style.gradientOverlay"></div>
		</figure>
		<h2 class="heading heading-07" :class="$style.heading" v-html="data.heading" ref="heading"></h2>
		<ButtonQuaternary
			componentId="ButtonQuaternary"
			:title="$t('global.cta.read_more')"
			:label="$t('global.cta.read_more')"
			:type="ButtonType.LINK"
			:theme="Theme.LIGHT"
			:link="{
				type: LinkType.INTERNAL,
				target: data.target,
			}"
			:class="$style.button"/>
	</a>
</template>
