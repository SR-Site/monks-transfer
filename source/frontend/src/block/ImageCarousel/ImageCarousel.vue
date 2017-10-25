<style src="./ImageCarousel.scss" module lang="scss"></style>
<script src="./ImageCarousel.js"></script>

<template>
	<div :class="$style.imageCarousel">
		<div class="overrule-overlap">
			<div :class="$style.sliderViewport" class="infinite-carousel" ref="sliderViewport">
				<ul :class="$style.slides" class="slides" ref="slides">
					<li
						v-for="(slide, index) in data.slides"
						:key="index"
						:class="$style.slide"
						class="slide"
						ref="slide"
					>
						<div class="abs-fill" :class="$style[ClassNameHelper.parseTheme(slide.theme)]">
							<figure class="abs-fill">
								<ResponsiveImage :componentId="`ResponsiveImage${index}`" :image="slide.image"/>
								<ButtonCirclePlay
									v-if="slide.video"
									:componentId="`ButtonCirclePlay${index}`"
									title="play"
									:type="ButtonType.ACTION"
									:theme="Theme.DARK"
									:isPlaying="false"
									:class="$style.button"
									ref="playButton"
									@click="handleVideoClick(slide)"/>
								<figcaption v-if="slide.heading">
									<p :class="$style.copy" class="copy copy-01" v-html="slide.heading"></p>
								</figcaption>
							</figure>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<div :class="$style.pagination "class="site-frame">
			<DashedPaginator
				componentId="DashedPaginator"
				@paginatorClick="handlePaginatorClick"
				:activeIndex="activeIndex"
				:orientation="Orientation.HORIZONTAL"
				:items="data.slides" />
		</div>
	</div>
</template>
