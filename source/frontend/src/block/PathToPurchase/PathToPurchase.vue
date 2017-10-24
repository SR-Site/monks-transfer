<style src="./PathToPurchase.scss" module lang="scss"></style>
<script src="./PathToPurchase.js"></script>

<template>
	<div :class="$style.pathToPurchase">
		<div class="abs-fill" :class="$style.innerWrapper">
			<div :class="$style.backgroundImage" class="abs-fill">
				<ResponsiveImage
					v-for="(step, index) in data.steps"
					class="abs-fill"
					:image="step.background"
					:key="index"
					:class="[$style.image, {[$style.isActive]: activeIndex === index}]"
					:componentId="`ResponsiveImage`"/>
			</div>
		</div>
		<div :class="$style.sliderViewport" class="infinite-carousel" ref="image-carousel">
			<ul class="site-frame" :class="$style.steps" ref="slides">
				<li
					@click="handleStepClick(index)"
					v-for="(step, index) in data.steps"
					:key="index"
					:class="[$style.stepWrapper, {[$style.isActive]: activeIndex === index}]"
					ref="slide"
				>
					<div :class="$style.step">
						<div :class="$style.stepContent">
							<span class="pagination-number" v-html="padStart(index + 1)"></span>
							<h2 :class="$style.heading" class="heading heading-07" v-html="step.heading"></h2>
							<p :class="$style.copy" class="copy copy-01" v-html="step.paragraph"></p>
							<div :class="$style.secondaryContent">
								<p :class="$style.copy" class="copy copy-01"
								   v-html="truncate(step.secondaryParagraph, 150)"></p>
							</div>
						</div>
						<div :class="$style.stepEdge"></div>
					</div>
				</li>
			</ul>
		</div>
		<DashedPaginator
			componentId="DashedPaginator"
			v-if="isSmall"
			@paginatorClick="handleMobilePaginatorClick"
			:class="$style.dashedPaginator"
			:activeIndex="activeIndex"
			:orientation="Orientation.HORIZONTAL"
			:items="data.steps" />
	</div>
</template>
