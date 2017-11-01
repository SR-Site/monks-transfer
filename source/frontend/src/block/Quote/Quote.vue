<style src="./Quote.scss" module lang="scss"></style>
<script src="./Quote.js"></script>

<template>
	<div :class="$style.quote">
		<div class="site-frame">
			<div :class="$style.content">
				<h2 :class="$style.heading" class="heading heading-06" ref="quote">
					“<span v-html="data.quote"></span>”
				</h2>
				<div :class="$style.author">
					<p :class="$style.name" class="copy copy-03" v-html="data.author" ref="name"></p>
					<p :class="$style.position" class="copy copy-03" v-html="data.position" ref="position"></p>
				</div>
			</div>
		</div>
	</div>
</template>
