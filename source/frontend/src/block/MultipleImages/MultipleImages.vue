<style src="./MultipleImages.scss" module lang="scss"></style>
<script src="./MultipleImages.js"></script>

<template>
	<div :class="$style.multipleImages">
		<div class="site-frame" :class="$style.siteFrame">
			<div class="overrule-overlap" :class="$style.columns">
				<div :class="$style.column">
					<MultipleImagesMedia
						componentId="MultipleImagesMedia1"
						:data="data.primaryItem"
						:class="$style.primaryItem"/>
					<MultipleImagesMedia
						componentId="MultipleImagesMedia2"
						:data="data.secondaryItem"
						:class="$style.secondaryItem"/>
				</div>
				<div :class="$style.column">
					<MultipleImagesSkills
						componentId="MultipleImagesSkills"
						:data="data.tertiaryItem"
	                    :class="$style.tertiaryItem"/>
					<MultipleImagesMedia
						componentId="MultipleImagesMedia3"
						:data="data.quaternaryItem"
						:class="$style.quaternaryItem"/>
					<MultipleImagesCallToAction
						componentId="MultipleImagesCallToAction"
						:data="data.quinaryItem"
						:class="$style.quinaryItem"/>
				</div>
			</div>
		</div>
	</div>
</template>
