<style src="./BlogPostB.scss" module lang="scss"></style>
<script src="./BlogPostB.js"></script>

<template>
	<div :class="$style.blogPostB">
		<div class="site-frame">
			<div :class="$style.content" class="overrule-overlap">
				<h2 class="heading heading-06" :class="$style.heading" v-html="data.heading" ref="heading"></h2>
				<div :class="$style.htmlContent" ref="htmlContent">
					<div v-html="data.html" ></div>
				</div>
			</div>
		</div>
	</div>
</template>
