<style src="./ImageWithContentB.scss" module lang="scss"></style>
<script src="./ImageWithContentB.js"></script>

<template>
	<div :class="[$style.imageWithContentB, $style[ClassNameHelper.parseAlignment(data.alignment)]]">
		<div class="site-frame" ref="siteFrame" :class="$style.siteFrame">
			<div class="overrule-overlap" :class="$style.row">
				<div class="abs-fill">
					<figure :class="$style.image" class="abs-fill" ref="image">
						<ResponsiveImage :image="data.background" class="fit-cover"/>
						<div :class="$style.triangleBackground" ref="background"></div>
					</figure>
					<div :class="$style.content">
						<h4 class="heading heading-06" :class="$style.heading" v-html="data.heading" ref="heading"></h4>
						<p class="copy copy-01" :class="$style.copy" v-html="data.paragraph" ref="copy"></p>
						<ButtonPrimary
							componentId="ButtonPrimary"
							v-if="data.link"
							v-track="{
								[TrackingProvider.GOOGLE_ANALYTICS]: {
									category: 'imageWithContentB',
									action: 'click',
									label: `${data.heading}|${data.link.title}`,
								}
							}"
							:title="data.link.title"
							:label="data.link.label"
							:type="ButtonType.LINK"
							:theme="Theme.LIGHT"
							:solid="true"
							:link="{
								type: BackendLinkTypeMap[data.link.type],
								target: data.link.target,
							}"
							:class="$style.button"/>
					</div>
				</div>
				<!--<div :class="$style.content" ref="content">-->
					<!--<div :class="$style.content">-->

						<!--<ButtonPrimary-->
							<!--componentId="ButtonPrimary"-->
							<!--v-if="data.link"-->
							<!--v-track="{-->
								<!--[TrackingProvider.GOOGLE_ANALYTICS]: {-->
									<!--category: 'imageWithContent',-->
									<!--action: 'click',-->
									<!--label: `${data.heading}|${data.link.title}`,-->
								<!--}-->
							<!--}"-->
							<!--:title="data.link.title"-->
							<!--:label="data.link.label"-->
							<!--:type="ButtonType.LINK"-->
							<!--:theme="Theme.DARK"-->
							<!--:link="{-->
								<!--type: BackendLinkTypeMap[data.link.type],-->
								<!--target: data.link.target,-->
							<!--}"-->
							<!--:class="$style.button"/>-->
					<!--</div>-->
				<!--</div>-->
			</div>
		</div>
	</div>
</template>
