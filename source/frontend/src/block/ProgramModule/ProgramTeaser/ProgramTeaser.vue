<style src="./ProgramTeaser.scss" module lang="scss"></style>
<script src="./ProgramTeaser.js"></script>

<template>
	<article :class="$style.programTeaser">
		<div :class="$style.content">
			<figure :class="$style.image" ref="image">
				<a :class="$style.description" v-link="{path: data.target, type: 0}">
					<ResponsiveImage componentId="ResponsiveImage" :image="data.image" class="abs-fill fit-cover"/>
					<div class="primary-gradient-overlay" :class="$style.gradientOverlay"></div>
				</a>
				<ButtonCirclePlay
					v-if="data.video"
					componentId="ButtonCirclePlay"
					title="play"
					:type="ButtonType.ACTION"
					:theme="Theme.LIGHT"
					:isPlaying="false"
					:class="$style.playButton"
					:size="Size.SMALL"
					ref="playButton"
					@click="handleVideoClick"/>
			</figure>
			<a :class="$style.description" v-link="{path: data.target, type: 0}">
				<div>
					<div :class="$style.titleWrapper">
						<h2 :class="$style.heading" class="heading-07" v-html="data.heading" ref="header"></h2>
						<div :class="$style.logo" v-if="data.logo" ref="logo">
							<ResponsiveImage :image="data.logo[0]" class="abs-fill fit-contain" v-if="data.logo.length === 1"/>
							<div :class="['abs-fill', $style.multipleImages]"  v-if="data.logo.length > 1">
								<span class="abs-center">Multiple networks</span>
							</div>
						</div>
					</div>
					<p :class="$style.copy" class="copy copy-03" v-html="truncatedParagraph" ref="paragraph"></p>
				</div>
				<div ref="statistics" v-if="data.stats">
					<div :class="$style.percentage">
						<span :class="$style.value" v-if="data.stats.percentage" v-html="data.stats.percentage"></span>
						<span :class="$style.label" class="copy">{{ $t('global.show.percent') }}</span>
					</div>
					<p :class="$style.demographic" class="copy copy-06" v-html="data.stats.demographic"></p>
				</div>
			</a>
		</div>
	</article>
</template>
