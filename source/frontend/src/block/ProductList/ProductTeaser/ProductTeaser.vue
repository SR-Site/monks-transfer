<style src="./ProductTeaser.scss" module lang="scss"></style>
<script src="./ProductTeaser.js"></script>

<template>
	<a
		:class="[$style.productTeaser, {'is-hover': isHover}]"
		@mouseenter="handleMouseEnter"
		@mouseleave="handleMouseLeave"
		v-link="{path: data.target, type: 0}">
		<div :class="$style.content">

			<figure :class="$style.image">
				<ResponsiveImage :image="data.image" class="abs-fill fit-cover"/>
				<div class="primary-gradient-overlay" :class="$style.gradientOverlay"></div>
			</figure>
			<div :class="$style.description">
				<div>
					<h2 :class="$style.heading" class="heading heading-07" v-html="data.heading" ref="heading"></h2>
					<div :class="$style.copy" class="copy copy-03" v-html="truncatedParagraph" ref="copy"></div>
				</div>
				<ButtonQuaternary
					componentId="ButtonQuaternary"
					:title="$t('global.cta.read_more')"
					:label="$t('global.cta.read_more')"
					:type="ButtonType.LINK"
					:theme="Theme.DARK"
					:link="{
						type: LinkType.INTERNAL,
						target: data.target,
					}"
					:class="$style.button"/>
			</div>
		</div>
	</a>
</template>
