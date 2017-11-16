<style src="./AudienceTopProgrammingSlide.scss" module lang="scss"></style>
<script src="./AudienceTopProgrammingSlide.js"></script>

<template>
	<div :class="$style.audienceTopProgrammingSlide">
		<figure :class="$style.image">
			<ResponsiveImage :image="data.background" class="abs-fill fit-cover"/>
		</figure>
		<div :class="$style.triangle"></div>
		<div :class="$style.description">
			<div :class="$style.top">
				<h2 class="heading heading-06" v-html="data.heading" :class="$style.heading" ref="heading"></h2>
				<p class="copy copy-01" v-html="truncatedParagraph" :class="$style.copy" ref="copy"></p>
			</div>
			<div :class="$style.bottom">
				<p class="copy copy-01" v-html="data.network" :class="$style.network" ref="network"></p>
				<ButtonCircleArrow
					@click="handleVideoClick"
					componentId="ButtonCircleArrowNext"
					v-if="data.video"
					:direction="Direction.RIGHT"
					:arrowPosition="Alignment.LEFT"
					:title="data.playVideoLabel"
					:label="data.playVideoLabel"
					:type="ButtonType.ACTION"
					:class="$style.button"
				/>
			</div>
		</div>
	</div>
</template>
