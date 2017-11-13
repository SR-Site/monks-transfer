<style src="./ShowDetail.scss" module lang="scss"></style>
<script src="./ShowDetail.js"></script>

<template>
	<div :class="$style.showDetail">
		<div class="site-frame">
			<div class="overrule-overlap" :class="$style.content">
				<h2 class="heading heading-02" v-html="data.heading" :class="$style.heading" ref="header"></h2>
				<p class="copy copy-01" v-html="data.paragraph" :class="$style.copy" ref="copy"></p>
				<ul :class="$style.details">
					<li :class="$style.detail" ref="network">
						<h3 class="heading heading-07" v-html="data.network.label" :class="$style.detailHeading"></h3>
						<figure :class="$style.detailImage">
							<ResponsiveImage :image="data.network.image" class="abs-fill fit-cover"/>
						</figure>
					</li>
					<li :class="$style.detail" ref="airTime">
						<h3 class="heading heading-07" v-html="data.airTime.label" :class="$style.detailHeading"></h3>
						<p class="copy copy-01" :class="$style.detailValue" v-html="data.airTime.value"></p>
					</li>
					<li :class="$style.detail" ref="ageRestriction">
						<h3 class="heading heading-07" v-html="data.ageRestriction.label" :class="$style.detailHeading"></h3>
						<figure :class="$style.detailImage">
							<ResponsiveImage :image="data.ageRestriction.image" class="abs-fill fit-cover" />
						</figure>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
