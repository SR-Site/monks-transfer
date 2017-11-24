<style src="./BlogPostB.scss" module lang="scss"></style>
<script src="./BlogPostB.js"></script>

<template>
	<div :class="$style.blogPostB">
		<div class="site-frame">
			<div :class="$style.content" class="overrule-overlap">
				<h2 class="heading heading-06" :class="$style.heading" v-html="data.heading" ref="heading"></h2>
				<ul :class="$style.items" ref="htmlContent">
					<li :class="$style.item" v-for="(item, index) in data.items" :key="index">
						<h2 class="heading heading-07" :class="$style.subHeading" v-html="item.heading"></h2>
						<p class="copy copy-01" v-html="item.paragraph"></p>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
