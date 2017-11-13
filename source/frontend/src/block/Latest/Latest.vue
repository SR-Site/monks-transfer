<style src="./Latest.scss" module lang="scss"></style>
<script src="./Latest.js"></script>

<template>
	<div :class="$style.latest">
		<div :class="$style.siteFrame" class="site-frame">
			<div class="overrule-overlap">
				<header :class="$style.header" ref="heading">
					<h2 :class="$style.heading" class="heading heading-03" v-html="data.heading"></h2>
					<ButtonQuaternary
						componentId="ButtonQuaternary"
						v-track="{
							[TrackingProvider.GOOGLE_ANALYTICS]: {
								category: 'latest',
								action: 'click',
								label: data.link.title
							}
						}"
						:title="data.link.title"
						:label="data.link.label"
						:type="ButtonType.LINK"
						:theme="Theme.DARK"
						:link="{
							type: BackendLinkTypeMap[data.link.type],
							target: data.link.target,
						}"
						:class="$style.button"/>
				</header>
				<div :class="$style.draggableContainer" ref="draggableContainer">
					<div :class="$style.latestArticles" ref="draggableElement" class="js-draggable-element">
						<ArticleTeaser
							v-for="(article, index) in data.articles"
							:componentId="`ArticleTeaser${index}`"
							:key="index"
							:data="getArticleData(article)"
							:class="$style.articleTeaser"
							ref="article"
						/>
					</div>
				</div>
				<ScrollBar
					componentId="ScrollBar"
					v-show="showScrollBar"
					@update="handleScrollBarUpdate"
					@end="handleScrollBarEnd"
					:class="$style.scrollBar"/>
			</div>
		</div>
	</div>
</template>
