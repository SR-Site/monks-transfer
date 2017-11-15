<style src="./AudienceQuote.scss" module lang="scss"></style>
<script src="./AudienceQuote.js"></script>

<template>
	<div :class="$style.audienceQuote">
		<div class="site-frame">
			<div :class="$style.content" ref="box">
				<p class="copy copy-01" v-html="data.subHeading" :class="$style.subHeading" ref="subHeading"></p>
				<h2 class="heading heading-03" v-html="data.heading" :class="$style.heading" ref="heading"></h2>
			</div>
		</div>
		<figure :class="$style.image" ref="image">
			<ResponsiveImage :image="data.image" class="abs-fill fit-cover"/>
		</figure>
	</div>
</template>
