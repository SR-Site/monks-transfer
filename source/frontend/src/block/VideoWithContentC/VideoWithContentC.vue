<style src="./VideoWithContentC.scss" module lang="scss"></style>
<script src="./VideoWithContentC.js"></script>

<template>
	<div :class="$style.videoWithContentC">
		<div class="site-frame is-small include-padding" :class="$style.siteFrame">
			<div class="overrule-overlap">
				<figure :class="$style.image" ref="media">
					<ResponsiveImage :image="data.poster" class="abs-fill fit-cover"></ResponsiveImage>
					<ButtonCirclePlay
						v-if="data.video"
						componentId="ButtonCirclePlay"
						title="play"
						:type="ButtonType.ACTION"
						:theme="Theme.LIGHT"
						:isPlaying="false"
						class="abs-center"
						ref="playButton"
						@click="handleVideoClick"/>
				</figure>
				<div :class="$style.description">
					<div :class="[$style.column, $style.heading]">
						<h2 class="heading heading-07" v-html="data.heading" ref="heading"></h2>
					</div>
					<div :class="[$style.column, $style.content]">
						<p class="copy copy-01" :class="$style.copy" v-html="data.paragraph" ref="copy"></p>
						<ButtonPrimary
							componentId="ButtonPrimary"
							v-if="data.link"
							v-track="{
								[TrackingProvider.GOOGLE_ANALYTICS]: {
									category: 'VideoWithContentC',
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
							}"/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
