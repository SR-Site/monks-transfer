<style src="./AudienceTopProgramming.scss" module lang="scss"></style>
<script src="./AudienceTopProgramming.js"></script>

<template>
	<div :class="[
		$style.audienceTopProgramming,
		$style[ClassNameHelper.parseAlignment(data.alignment)],
	]">
		<div class="site-frame" :class="$style.siteFrame">
			<header :class="$style.header">
				<h2 class="heading heading-02" v-html="data.heading" ref="heading" :class="$style.heading"></h2>
				<p class="copy copy-01" v-html="data.paragraph" ref="copy" :class="$style.copy"></p>
			</header>
			<div :class="$style.carousel">
				<button
					@click="handlePrevious"
					ref="previous"
					class="button"
					:class="[$style.navigationButton, $style.navigationPrevious]">
					<Icon name="arrow-left" :class="$style.icon"></Icon>
				</button>
				<div :class="$style.viewport" class="infinite-carousel">
					<div class="slides" ref="slides">
						<div
							v-for="(slide, index) in data.slides"
							class="slide"
							ref="slide"
							:key="index"
							:class="$style.slide" >
							<AudienceTopProgrammingSlide
								:componentId="`AudienceTopProgrammingSlide${index}`"
								:data="slide"/>
						</div>
					</div>
				</div>
				<button
					@click="handleNext"
					class="button"
					ref="next"
					:class="[$style.navigationButton, $style.navigationNext]">
					<Icon name="arrow-right" :class="$style.icon"></Icon>
				</button>
			</div>
			<DashedPaginator
				componentId="DashedPaginator"
				@paginatorClick="handlePaginatorClick"
				:class="$style.paginator"
				:activeIndex="activeIndex"
				:orientation="Orientation.HORIZONTAL"
				:items="data.slides" />
		</div>
	</div>
</template>
