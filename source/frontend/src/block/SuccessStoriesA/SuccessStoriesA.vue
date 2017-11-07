<style src="./SuccessStoriesA.scss" module lang="scss"></style>
<script src="./SuccessStoriesA.js"></script>

<template>
	<div :class="$style.successStoriesA">
		<div class="site-frame" :class="$style.sizeFrame">
			<div class="overrule-overlap" :class="$style.overruleOverlap">
				<div :class="$style.storyHighlight" ref="videoWrapper">
					<h3
						:class="$style.heading"
						class="heading heading-07"
						v-html="data.heading"
						ref="heading"></h3>
					<h2
						:class="$style.heading"
						class="heading heading-06"
						v-html="data.subHeading"
					    ref="subHeading"></h2>
				</div>
				<div :class="$style.storyDescription">
					<p :class="$style.copy" class="copy copy-01" v-html="data.paragraph" ref="copy"></p>
					<ButtonPrimary
						componentId="ButtonPrimary"
						v-track="{
							[TrackingProvider.GOOGLE_ANALYTICS]: {
								category: 'successStoriesA',
								action: 'click',
								label: data.link.title
							}
						}"
						:solid="true"
						:title="data.link.title"
						:label="data.link.label"
						:type="ButtonType.LINK"
						:theme="Theme.LIGHT"
						:link="{
							type: BackendLinkTypeMap[data.link.type],
							target: data.link.target,
					}"  />
				</div>
			</div>
		</div>
	</div>
</template>
