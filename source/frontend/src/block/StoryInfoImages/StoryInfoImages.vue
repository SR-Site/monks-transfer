<style src="./StoryInfoImages.scss" module lang="scss"></style>
<script src="./StoryInfoImages.js"></script>

<template>
	<div :class="$style.storyInfoImages">
		<div :class="$style.storyWrapper" class="abs-fill">
			<div :class="$style.storyImages">
				<div
					v-for="(story, index) in data.stories"
					class="abs-fill"
					:class="[$style.imageWrapper, {[$style.isActive]: index === activeIndex}]"
					:key="index">
					<div :class="$style.defaultImage">
						<ResponsiveImage :image="story.background" :class="$style.image"/>
					</div>
					<div :class="$style.blurredImage">
						<ResponsiveImage :image="story.backgroundBlurred" :class="$style.image"/>
					</div>
				</div>
			</div>
			<div :class="$style.storyContent">
				<article
					v-for="(story, index) in data.stories"
					@mouseenter="handleMouseEnter(index)"
					:key="index"
					:class="[
						$style.story,
						$style[ClassNameHelper.parseTheme(story.theme)],
						{[$style.isActive]: index === activeIndex}
					]
				">
					<span class="pagination-number" v-html="padStart(index + 1)"></span>
					<h2 class="heading heading-06" v-html="story.heading"></h2>
					<p class="copy copy-01" v-html="truncate(story.paragraph)"></p>
				</article>
			</div>
		</div>
	</div>
</template>
