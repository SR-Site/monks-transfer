<style src="./Latest.scss" module lang="scss"></style>
<script src="./Latest.js"></script>

<template>
	<div :class="$style.latest">
		<div :class="$style.siteFrame" class="site-frame">
			<div class="overrule-overlap">
				<header :class="$style.header">
					<h2 :class="$style.heading" class="heading heading-03" v-html="data.heading"></h2>
					<ButtonPrimary
						componentId="ButtonPrimary"
						:title="data.link.title"
						:label="data.link.label"
						:type="ButtonType.LINK"
						:theme="Theme.DARK"
						:link="{
							type: linkTypeMap[data.link.type],
							target: data.link.target,
						}"
						:class="$style.button"/>
				</header>
				<div :class="$style.latestArticles">
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
		</div>
	</div>
</template>
