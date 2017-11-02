<style src="./MapSecondary.scss" module lang="scss"></style>
<script src="./MapSecondary.js"></script>

<template>
	<div :class="$style.mapSecondary">
		<div class="site-frame">
			<div :class="$style.aspectRatioWrapper">
				<div :class="$style.mapContent">
					<h2 :class="$style.mainTitle" class="heading heading-06" v-html="data.heading"></h2>
					<h3 :class="$style.subTitle" class="copy copy-02" v-html="data.subHeading"></h3>
					<div :class="$style.description" class="description copy copy-01" v-html="data.paragraph"></div>
					<ButtonPrimary
						componentId="ButtonPrimary"
						v-if="data.link"
						v-track="{
							[TrackingProvider.GOOGLE_ANALYTICS]: {
								category: 'mapSecondary',
								action: 'click',
								label: `${data.heading}|${data.link.title}`
							}
						}"
						:title="data.link.title"
						:label="data.link.label"
						:type="ButtonType.LINK"
						:theme="Theme.DARK"
						:link="{
							type: linkTypeMap[data.link.type],
							target: data.link.target,
						}"/>
				</div>
				<div :class="$style.mapImageWrapper">
					<div :class="$style.mapImage">
						<ResponsiveImage
							v-if="data.sequenceBackground"
							:class="$style.sequenceBackground"
							:image="data.sequenceBackground"/>
						<ImageSequence
							@loaded="handleImageSequenceLoaded"
							@update="handleImageSequenceUpdate"
							:imageSequence="hardcodedImageSequence"
							class="fit-contain abs-fill"
							componentId="ImageSequence"/>
						<div :class="$style.progressBar">
							<div :class="$style.progress" :style="{width: `${sequenceProgress * 100}%`}"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
