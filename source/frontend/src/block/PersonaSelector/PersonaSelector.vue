<style src="./PersonaSelector.scss" module lang="scss"></style>
<script src="./PersonaSelector.js"></script>

<template>
	<div :class="$style.personaSelector">
		<div :class="$style.backgroundImage" class="abs-fill" v-if="!isSmall">
			<ResponsiveImage
				v-for="(persona, index) in data.personas"
				class="fit-cover"
				:key="index"
				:class="[
					$style.image,
					{[$style.isActive]: activeIndex === index}
				]"
				:componentId="`BackgroundResponsiveImage${index}`"
				:image="persona.image"/>
		</div>
		<!--<div :class="$style.slider">-->
			<!--<div :class="$style.sliderViewport" class="abs-fill infinite-carousel" ref="imageCarousel">-->
				<!--<ul :class="$style.slides" ref="slides">-->
					<!--<li-->
						<!--v-for="(persona, index) in data.personas"-->
						<!--:key="index"-->
						<!--:class="$style.slide"-->
						<!--ref="slide">-->
						<!--<figure class="abs-fill">-->
							<!--<ResponsiveImage :componentId="`CarouselResponsiveImage${index}`" :image="persona.image"/>-->
						<!--</figure>-->
					<!--</li>-->
				<!--</ul>-->
			<!--</div>-->
		<!--</div>-->
		<div :class="$style.personaContentWrapper" class="abs-fill">
			<div :class="$style.backgroundTriangle"></div>
			<div :class="$style.personaContent">
				<PersonaSelectorSlide
					v-for="(persona, index) in data.personas"
					@isReady="component => handleSlideReady(component, index)"
					:data="persona"
					:key="index"
					:componentId="`PersonaSelectorSlide${index}`"/>
			</div>
		</div>
		<PersonaSelectorOptions
			componentId="PersonaSelectorOptions"
			@personaClick="openPersona"
			:enableInteraction="enableInteraction"
			:data="data.personas"/>
	</div>
</template>
