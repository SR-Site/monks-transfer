<style src="./MainProductNavItem.scss" module lang="scss"></style>
<script src="./MainProductNavItem.js"></script>

<template>
	<div :class="$style.mainProductNavItem">
		<div :class="$style.aspectRatioWrapper">
			<div class="abs-fill">
				<figure :class="$style.image" ref="image">
					<ResponsiveImage :image="data.background" class="abs-fill fit-cover"/>
					<div class="primary-gradient-overlay" :class="$style.gradientOverlay"></div>
				</figure>
				<div :class="$style.description">
					<h2 class="heading heading-06" v-html="data.heading" ref="heading" :class="$style.heading"></h2>
					<p class="copy copy-03" v-html="data.paragraph" ref="copy" :class="$style.copy"></p>
					<ButtonQuaternary
						componentId="ButtonQuaternary"
						ref="button"
						:title="data.link.title"
						:label="data.link.label"
						:type="ButtonType.LINK"
						:theme="Theme.LIGHT"
						:link="{
							type: data.link.type,
							target: data.link.target,
						}"
						:class="$style.button"/>
				</div>
			</div>
		</div>
	</div>
</template>
