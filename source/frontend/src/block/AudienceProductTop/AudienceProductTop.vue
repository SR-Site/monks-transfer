<style src="./AudienceProductTop.scss" module lang="scss"></style>
<script src="./AudienceProductTop.js"></script>

<template>
	<div :class="$style.audienceProductTop">
		<div class="site-frame" :class="$style.siteFrame">
			<div class="overrule-overlap" :class="$style.wrapper">
				<div :class="[$style.column, $style.left]">
					<div :class="$style.content">
						<h2 class="heading heading-02" v-html="data.heading" :class="$style.heading" ref="heading"></h2>
						<p class="copy copy-01" v-html="data.paragraph" :class="$style.copy" ref="copy"></p>
					</div>
					<div :class="$style.card" ref="box">
						<h3 class="heading heading-07" v-html="data.card.heading" :class="$style.cardHeading"
						    ref="boxHeading"></h3>
						<p class="copy copy-03" v-html="data.card.paragraph" :class="$style.cardCopy" ref="boxCopy"></p>
					</div>
				</div>
				<div :class="[$style.column, $style.right]" >
					<figure :class="$style.image" ref="image">
						<ResponsiveImage :image="data.image" class="abs-fill fit-cover"/>
					</figure>
				</div>
			</div>
		</div>
	</div>
</template>
