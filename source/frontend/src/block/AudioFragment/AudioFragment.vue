<style src="./AudioFragment.scss" module lang="scss"></style>
<script src="./AudioFragment.js"></script>

<template>
	<div :class="$style.audioFragment">
		<div class="site-frame">
			<h2 class="heading heading-05" :class="$style.heading" v-html="data.heading" ref="heading"></h2>
			<div :class="$style.details" ref="details">
				<figure :class="$style.profileImage">
					<ResponsiveImage componentId="ResponsiveImage" :image="data.image"/>
				</figure>
				<p class="copy copy-01" :class="$style.copy" v-html="data.description"></p>
			</div>
			<AudioPlayer componentId="AudioPlayer" :file="data.file" :title="data.heading"/>
		</div>
	</div>
</template>
