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
		<PersonaSelectorMobileCarousel
			componentId="PersonaSelectorMobileCarousel"
			@carouselChange="handleMobileCarouselChange"
			v-if="isSmall"
			:data="data.personas"
		/>
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
		<DashedPaginator
			componentId="DashedPaginator"
			v-if="isSmall"
			@paginatorClick="handleMobilePaginatorClick"
			:activeIndex="activeIndex"
			:orientation="Orientation.HORIZONTAL"
			:items="data.personas" />
	</div>
</template>
