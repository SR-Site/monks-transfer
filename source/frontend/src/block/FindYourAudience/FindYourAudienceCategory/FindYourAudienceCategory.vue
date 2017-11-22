<style src="./FindYourAudienceCategory.scss" module lang="scss"></style>
<script src="./FindYourAudienceCategory.js"></script>

<template>
	<div :class="$style.findYourAudienceCategory">
		<header :class="$style.header">
			<h2 class="heading heading-02" v-html="data.heading" ref="heading" :class="$style.heading"></h2>
			<p class="copy copy-01" v-html="data.paragraph" ref="copy" :class="$style.copy"></p>
		</header>
		<div :class="$style.items">
			<FindYourAudienceTeaser
				v-for="(item, index) in data.items"
				ref="item"
				:class="$style.item"
				:key="index"
				:data="item"
				:componentId="`FindYourAudienceTeaser${index}`"/>
		</div>
		<div :class="$style.callToActions">
			<ButtonCircleArrow
				@click="handleBackToTop"
				componentId="ButtonCircleArrow"
				:direction="Direction.UP"
				:arrowPosition="Alignment.LEFT"
				:size="Size.SMALL"
				:theme="Theme.DARK"
				:title="$t('global.cta.back_to_top')"
				:label="$t('global.cta.back_to_top')"
				:type="ButtonType.ACTION"
				:class="$style.button"
				ref="buttonLink"/>
		</div>
	</div>
</template>
