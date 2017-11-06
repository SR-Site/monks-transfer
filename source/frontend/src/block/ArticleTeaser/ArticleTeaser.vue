<style src="./ArticleTeaser.scss" module lang="scss"></style>
<script src="./ArticleTeaser.js"></script>

<template>
	<article :class="[$style.articleTeaser, $style[ClassNameHelper.parseTheme(data.theme)]]">
		<a
			v-link="{path: data.target}"
			v-track="{
				[TrackingProvider.GOOGLE_ANALYTICS]: {
					category: 'articleTeaser',
					action: 'click',
					label: data.heading,
				}
			}"
		   :class="[$style.link, {'is-hover': isHover}]"
		   @mouseenter="handleMouseEnter"
		   @mouseleave="handleMouseLeave">
			<div class="abs-fill" :class="$style.wrapper">
				<figure :class="$style.image" ref="image">
					<ResponsiveImage :class="$style.image" :image="data.image" class="fit-cover"/>
				</figure>
				<div :class="$style.description" ref="description">
					<div :class="$style.top">
						<div :class="$style.tags" v-if="data.tags" ref="tags">
							<ButtonTag
								v-for="(tag, index) in data.tags"
								:key="index"
								:componentId="`ButtonTag${index}`"
								:title="tag.title"
								:label="tag.label"
								:type="ButtonType.LINK"
								:link="{
									type: BackendLinkTypeMap[tag.type],
									target: tag.target,
								}"
								:class="$style.tag"/>
						</div>
						<h2 :class="$style.heading" class="heading heading-07" v-html="data.heading" ref="heading"></h2>
						<div :class="$style.copy" class="copy copy-03" v-html="truncatedParagraph" ref="copy"></div>
					</div>
					<ButtonQuaternary
						componentId="ButtonQuaternary"
						:title="$t('global.cta.read_more')"
						:label="$t('global.cta.read_more')"
						:type="ButtonType.LINK"
						:theme="Theme.DARK"
						:link="{
							type: LinkType.INTERNAL,
							target: data.target,
						}"
						:class="$style.button"/>
				</div>
			</div>
		</a>
	</article>
</template>
