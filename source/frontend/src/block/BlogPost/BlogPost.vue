<style src="./BlogPost.scss" module lang="scss"></style>
<script src="./BlogPost.js"></script>

<template>
	<div :class="$style.blogPost">
		<div class="site-frame is-small include-padding">
			<div class="overrule-overlap is-solid">
				<div :class="$style.header" ref="header">
					<p :class="$style.date" class="copy copy-03" v-html="data.date"></p>
					<h2 :class="$style.heading" class="heading heading-04" v-html="data.heading"></h2>
				</div>
				<div :class="$style.content" ref="content">
					<h3 :class="$style.heading" class="heading-06 heading" v-html="data.subHeading"></h3>
					<p class="copy-01 copy" v-html="data.paragraph"></p>
				</div>
			</div>
		</div>
	</div>
</template>
