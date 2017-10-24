<style src="./ArticleTeaser.scss" module lang="scss"></style>
<script src="./ArticleTeaser.js"></script>

<template>
	<article :class="[
		$style.articleTeaser,
		$style[ClassNameHelper.parseTheme(data.theme)],
		{
			[$style.transitionInComplete]: transitionInComplete
		}]">
		<a href="#" v-link="{path: data.target}">
			<figure :class="$style.image" class="abs-fill" ref="image">
				<ResponsiveImage :class="$style.responsiveImage" :image="data.image"/>
				<h2 :class="$style.hoverHeading" v-html="data.heading"></h2>
				<Icon :class="$style.hoverIcon" name="circle-arrow-right"/>
			</figure>
			<div :class="$style.description" ref="description">
				<h2 :class="$style.heading" class="heading heading-07" v-html="data.heading" ref="heading"></h2>
				<div :class="$style.copy" class="copy copy-01" v-html="truncatedParagraph" ref="copy"></div>
				<div class="tags">
					<ButtonTag
						v-for="(tag, index) in data.tags"
						:key="index"
						:componentId="`ButtonTag${index}`"
						:title="tag.title"
						:label="tag.label"
						:type="ButtonType.LINK"
						:link="{
							type: linkTypeMap[tag.type],
							target: tag.target,
						}"
						ref="tag"
						:class="$style.tag"/>
				</div>
			</div>
		</a>
	</article>
</template>
