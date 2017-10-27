<style src="./QuoteSecondary.scss" module lang="scss"></style>
<script src="./QuoteSecondary.js"></script>

<template>
	<div :class="$style.quoteSecondary">
		<div class="site-frame" :class="$style.siteFrame">
			<div :class="$style.content">
				<h2 :class="$style.heading" class="heading heading-06" v-html="data.quote"></h2>
				<p :class="$style.copy" class="copy copy-03" v-html="data.author"></p>
			</div>
		</div>
	</div>
</template>
