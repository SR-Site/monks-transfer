<style src="./PersonaSelectorMobileCarousel.scss" module lang="scss"></style>
<script src="./PersonaSelectorMobileCarousel.js"></script>

<template>
	<div :class="$style.personaSelectorMobileCarousel" class="slider">
		<div :class="$style.sliderViewport" ref="sliderWrapper" class="abs-fill infinite-carousel">
			<ul :class="$style.slides" ref="slides" class="slides">
				<li
					v-for="(persona, index) in data"
					:key="index"
					:class="$style.slide"
					class="slide"
					ref="slide">
					<figure class="abs-fill">
						<ResponsiveImage
							:componentId="`CarouselResponsiveImage${index}`"
							:image="persona.image"
							class="fit-cover"/>
					</figure>
				</li>
			</ul>
		</div>
	</div>
</template>
