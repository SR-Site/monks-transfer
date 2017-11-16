<style src="./SuccessStoryPost.scss" module lang="scss"></style>
<script src="./SuccessStoryPost.js"></script>

<template>
	<div :class="$style.successStoryPost">
		<div class="site-frame is-small include-padding">
			<div class="overrule-overlap">
				<h3
					class="heading heading-07"
					v-html="data.subHeading"
					:class="$style.subHeading"
					ref="subHeading"></h3>
				<h2
					class="heading heading-03"
					v-html="data.heading"
					:class="$style.heading"
					ref="heading"></h2>
				<p
					class="copy copy-01"
					v-html="data.paragraph"
					:class="$style.copy"
					ref="copy"></p>
				<ul :class="$style.details" ref="details">
					<li :class="$style.detail">
						<h3 class="heading heading-07" v-html="data.company.label"></h3>
						<p class="copy copy-01" v-html="data.company.value" :class="$style.detailValue"></p>
					</li>
					<li :class="$style.detail">
						<h3 class="heading heading-07" v-html="data.industry.label"></h3>
						<p class="copy copy-01" v-html="data.industry.value" :class="$style.detailValue"></p>
					</li>
					<li :class="$style.detail">
						<h3 class="heading heading-07" v-html="data.market.label"></h3>
						<p class="copy copy-01" v-html="data.market.value" :class="$style.detailValue"></p>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
