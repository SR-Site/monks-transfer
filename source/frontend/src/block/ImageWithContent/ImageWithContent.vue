<style src="./ImageWithContent.scss" module lang="scss"></style>
<script src="./ImageWithContent.js"></script>

<template>
	<div :class="[$style.imageWithContent, $style[ClassNameHelper.parseAlignment(data.alignment)]]">
		<div class="site-frame" ref="siteFrame" :class="$style.siteFrame">
			<div class="overrule-overlap" :class="$style.row">
				<div :class="$style.content" ref="content">
					<div>
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
				<div :class="$style.image">
					<figure class="abs-fill" ref="image">
						<ResponsiveImage :image="data.background" class="fit-cover" />
					</figure>
				</div>


				<!--<div class="abs-center" :class="$style.image" ref="image">-->
				<!--<ResponsiveImage :image="data.background" class="fit-cover" />-->
				<!--</div>-->
				<!--<div :class="$style.content" ref="content">-->

				<!--</div>-->
			</div>
		</div>
	</div>
</template>
