<style src="./VideoWithContentB.scss" module lang="scss"></style>
<script src="./VideoWithContentB.js"></script>

<template>
	<div :class="[$style.videoWithContentB, $style[ClassNameHelper.parseAlignment(data.alignment)]]">
		<div class="site-frame" :class="$style.siteFrame">
			<div class="overrule-overlap" :class="$style.overruleOverlap">
				<div :class="$style.videoWrapper" ref="videoWrapper">
					<div :class="$style.video">
						<figure class="abs-fill" :class="$style.videoPoster">
							<ResponsiveImage :image="data.poster" ref="videoPoster" class="abs-fill" />
							<ButtonCirclePlay
								componentId="ButtonCirclePlay"
								class="abs-center"
								v-track="{
									[TrackingProvider.GOOGLE_ANALYTICS]: {
										category: 'videoWithContent',
										action: 'click',
										label: `play|${data.heading}`
									}
								}"
								:title="data.heading"
								:type="ButtonType.ACTION"
								:theme="Theme.LIGHT"
								:isPlaying="false"
								:class="$style.playButton"
								ref="playButton"
								@click="handleVideoClick"/>
						</figure>
					</div>
				</div>
				<div :class="$style.videoDescription">
					<h4 :class="$style.heading" class="heading heading-03" v-html="data.heading" ref="heading"></h4>
					<p :class="$style.copy" class="copy copy-01" v-html="data.paragraph" ref="copy"></p>
					<ButtonQuaternary
						v-if="data.link"
						ref="link"
						componentId="ButtonQuaternary"
						v-track="{
							[TrackingProvider.GOOGLE_ANALYTICS]: {
								category: 'videoWithContentB',
								action: 'click',
								label: `${data.heading}|${data.link.title}`
							}
						}"
						:title="data.link.title"
						:label="data.link.label"
						:class="$style.button"
						:type="ButtonType.LINK"
						:theme="Theme.DARK"
						:link="{
							type: BackendLinkTypeMap[data.link.type],
							target: data.link.target,
						}"  />
				</div>
			</div>
		</div>
	</div>
</template>
