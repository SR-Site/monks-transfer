<style src="./AudienceStatistics.scss" module lang="scss"></style>
<script src="./AudienceStatistics.js"></script>

<template>
	<div :class="$style.audienceStatistics">
		<div class="site-frame">
			<figure :class="$style.image">
				<ResponsiveImage :image="data.background" class="abs-fill fit-cover"/>
				<div class="primary-gradient-overlay"></div>
				<div :class="$style.description">
					<h2 class="heading heading-06" :class="$style.heading" v-html="data.heading"></h2>
					<p class="copy copy-01" :class="$style.copy" v-html="data.paragraph"></p>
				</div>
			</figure>
			<div :class="$style.draggableContainer" ref="draggableContainer">
				<div :class="$style.items" ref="draggableElement" class="js-draggable-element">
					<AudienceStatisticTeaser
						v-for="(item, index) in data.items"
						:data="item"
						:key="index"
						:class="$style.item"
						ref="statistic"
						:componentId="`AudienceStatisticTeaser${index}`"/>
				</div>
			</div>
			<ScrollBar
				componentId="ScrollBar"
				@update="handleScrollBarUpdate"
				@end="handleScrollBarEnd"
				:class="$style.scrollBar"/>
		</div>
	</div>
</template>
