<style src="./ImageWithContent.scss" module lang="scss"></style>
<script src="./ImageWithContent.js"></script>

<template>
	<div :class="[$style.imageWithContent, $style[ClassNameHelper.parseAlignment(data.alignment)]]">
		<div class="site-frame" :class="$style.siteFrame" ref="siteFrame">
			<div class="overrule-overlap" :class="$style.overruleOverlap">
				<ResponsiveImage :image="data.background" :class="$style.image" ref="image"/>
				<div :class="$style.content" ref="content">
					<h4 class="heading heading-06" :class="$style.heading" v-html="data.heading" ref="heading"></h4>
					<p class="copy copy-01" :class="$style.copy" v-html="data.paragraph" ref="copy"></p>
					<ButtonPrimary
						componentId="ButtonPrimary"
						v-if="data.link"
						:title="data.link.title"
						:label="data.link.label"
						:type="ButtonType.LINK"
						:theme="Theme.DARK"
						:link="{
							type: linkTypeMap[data.link.type],
							target: data.link.target,
						}"
						:class="$style.button"/>
				</div>
			</div>
		</div>
	</div>
</template>
