<style src="./Map.scss" module lang="scss"></style>
<script src="./Map.js"></script>

<template>
	<div :class="$style.map">
		<div class="site-frame">
			<div :class="$style.wrapper">
				<div :class="$style.solidBackground"></div>
				<div :class="$style.innerWrapper">
					<div :class="$style.slideBackground">
						<ResponsiveImage
							v-if="hardcodedSequenceBackground"
							componentId="ResponsiveImage"
							class="fit-contain abs-fill"
							:image="data.sequenceBackground"/>
						<ImageSequence
							:imageSequence="hardcodedImageSequence"
							:initializeManually="true"
							class="fit-contain abs-fill"
							componentId="ImageSequence"/>
					</div>
					<div :class="$style.slides">
						<SlideText
							v-for="(step, index) in data.steps"
							@isReady="component => handleSlideReady(component, index)"
							:class="$style.slide"
							:key="index"
							:componentId="`SlideText${index}`"
							:index="index + 1"
							:heading="step.heading"
							:paragraph="step.paragraph"
						/>
					</div>
				</div>
				<div :class="$style.paginator">
					<MapPaginator
						componentId="MapPaginator"
						@paginatorClick="handlePaginatorClick"
						:activeIndex="activeIndex"
						:items="data.steps"
					/>
				</div>
			</div>
		</div>
	</div>
</template>
