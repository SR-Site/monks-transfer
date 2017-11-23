<style src="./FindYourAudienceTeaser.scss" module lang="scss"></style>
<script src="./FindYourAudienceTeaser.js"></script>

<template>
	<article :class="$style.findYourAudienceTeaser">
		<div :class="$style.content">
			<figure :class="$style.image" ref="image">
				<ResponsiveImage :image="data.image" class="abs-fill fit-cover"/>
				<div class="primary-gradient-overlay" :class="$style.gradientOverlay"></div>
				<ButtonCirclePlay
					v-if="data.video"
					componentId="ButtonCirclePlay"
					title="play"
					:type="ButtonType.ACTION"
					:theme="Theme.LIGHT"
					:isPlaying="false"
					:class="$style.button"
					:size="Size.SMALL"
					ref="playButton"
					@click="handleVideoClick"/>
			</figure>
			<div :class="$style.description">
				<a :class="$style.top" v-link="{ path: data.target, type: 0 }">
					<h2 class="heading heading-07" v-html="data.heading" :class="$style.heading" ref="heading"></h2>
					<p class="copy copy-01" v-html="data.subHeading" :class="$style.subHeading" ref="subHeading"></p>
					<p class="copy copy-01" v-html="data.paragraph" :class="$style.copy" ref="copy"></p>
				</a>
				<div :class="$style.bottom" ref="bottom">
					<h3 class="heading heading-07" :class="$style.reachHeading">Reaches</h3>
					<ul :class="$style.reaches">
						<li
							v-for="(reach, index) in data.reaches"
							v-html="reach"
							class="copy copy-03"
							:key="index"
							:class="$style.reach"></li>
					</ul>
				</div>
			</div>
		</div>
	</article>
</template>
