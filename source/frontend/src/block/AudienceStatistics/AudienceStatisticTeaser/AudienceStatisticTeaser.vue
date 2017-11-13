<style src="./AudienceStatisticTeaser.scss" module lang="scss"></style>
<script src="./AudienceStatisticTeaser.js"></script>

<template>
	<a
		:class="[$style.audienceStatisticTeaser, {'is-hover': isHover}]"
		@mouseenter="handleMouseEnter"
		@mouseleave="handleMouseLeave"
		v-link="{path: data.link.target, type: 0}">
		<figure :class="$style.itemImage">
			<ResponsiveImage :image="data.background" class="abs-fill fit-cover"/>
			<div class="primary-gradient-overlay" :class="$style.gradientOverlay"></div>
			<span :class="$style.triangle"></span>
		</figure>
		<span :class="$style.itemDescription">
				<h3 class="heading heading-01" v-html="data.value" :class="$style.heading" ref="heading"></h3>
				<p class="copy copy-01" v-html="data.label" ref="copy" :class="$style.copy"></p>
			</span>
		<ButtonQuaternary
			componentId="ButtonQuaternary"
			:title="data.link.title"
			:label="data.link.label"
			:type="ButtonType.LINK"
			:theme="Theme.LIGHT"
			:link="{
					type: LinkType.INTERNAL,
					target: data.link.target,
				}"
			:class="$style.button"/>

	</a>
</template>
