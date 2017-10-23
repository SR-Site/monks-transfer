<style src="./HeroMain.scss" module lang="scss"></style>
<script src="./HeroMain.js"></script>

<template>
	<div :class="[
		$style.heroMain,
		{
			[$style.hasStatistics]: hasStatistics,
		}
	]">
		<MediaCrossFader
			componentId="MediaCrossFader"
			class="abs-fill"
			:class="$style.mediaCrossFader"/>
		<div :class="$style.imageCrossFader" class="abs-fill"></div>
		<div :class="$style.slideContentWrapper" class="abs-fill">
			<PrimaryTriangle componentId="PrimaryTriangle" :class="$style.primaryBackgroundTriangle"/>
			<SecondaryTriangle componentId="SecondaryTriangle" :class="$style.secondaryBackgroundTriangle"/>
			<TertiaryTriangle
				componentId="TertiaryTriangle"
				:class="$style.tertiaryBackgroundTriangle"
				v-if="!hasStatistics"
			/>
			<div :class="$style.slides">
				<HeroMainSlide
					@isReady="component => handleSlideReady(component, index)"
					@next="handleNextClick"
					v-for="(slide, index) in data.slides"
					:componentId="`HeroMainSlide${index}`"
					:key="index"
					:heading="slide.heading"
					:paragraph="slide.paragraph"
					:link="slide.link"
					:statistics="slide.statistics"
					:slideCount="data.slides.length"
					:hasStatistics="hasStatistics"
				/>
			</div>
		</div>
	</div>
</template>
