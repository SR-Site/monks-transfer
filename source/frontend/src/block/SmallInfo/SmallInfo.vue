<style src="./SmallInfo.scss" module lang="scss"></style>
<script src="./SmallInfo.js"></script>

<template>
	<div :class="$style.smallInfo">
		<div class="site-frame" :class="$style.siteFrame">
			<div class="overrule-overlap" :class="$style.overruleOverlap">
				<div :class="$style.introduction">
					<h4 :class="$style.heading" class="heading heading-04" v-html="data.heading" ref="heading"></h4>
				</div>
				<div :class="$style.description">
					<p :class="$style.copy" class="copy copy-01" v-html="data.paragraph" ref="copy"></p>
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
