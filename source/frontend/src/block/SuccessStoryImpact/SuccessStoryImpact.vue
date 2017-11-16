<style src="./SuccessStoryImpact.scss" module lang="scss"></style>
<script src="./SuccessStoryImpact.js"></script>

<template>
	<div :class="$style.sucessStoryImpact">
		<div class="site-frame">
			<div class="overrule-overlap" :class="$style.content">
				<div :class="$style.successStoryStatistic" v-for="(statistic, index) in data.statistics" :key="index"
				     ref="statistic">
					<div :class="$style.aspectRatioWrapper">
						<div class="abs-center" :class="$style.statisticDetailWrapper">
							<div :class="$style.statisticDetail">
								<h2 class="heading heading-01" :class="$style.heading" v-html="statistic.value"></h2>
								<p class="copy copy-01" v-html="statistic.label"></p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
