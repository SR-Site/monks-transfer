<style src="./AudienceStatisticsB.scss" module lang="scss"></style>
<script src="./AudienceStatisticsB.js"></script>

<template>
	<div :class="$style.audienceStatisticsB">
		<figure :class="$style.image">
			<ResponsiveImage :image="data.background" class="abs-fill fit-cover"/>
			<div class="primary-gradient-overlay" :class="$style.gradientOverlay"></div>
		</figure>
		<div class="abs-fill" :class="$style.wrapper">
			<div :class="$style.content">
				<h2 class="heading heading-03" v-html="data.heading" :class="$style.heading" ref="heading"></h2>
				<div :class="$style.statistics" ref="statistics">
					<div :class="$style.statistic" v-for="(statistic, index) in data.statistics" :key="index">
						<PercentageLoader
							:componentId="`PercentageLoader${index}`"
							:class="$style.percentageLoader"
							:borderType="PercentageLoaderBorderType.SOLID"
							:labelSize="Size.LARGE"
							:value="statistic.value"
							:total="100"
						/>
						<p class="copy copy-03" v-html="statistic.label"></p>
					</div>
				</div>
				<p class="copy copy-01" v-html="data.paragraph" :class="$style.copy" ref="copy"></p>
			</div>
			<ButtonCircleArrow
				componentId="ButtonCircleArrow"
				:direction="Direction.DOWN"
				:arrowPosition="Alignment.CENTER"
				:title="data.cta"
				:label="data.cta"
				:type="ButtonType.LINK"
				:class="$style.button"
				:link="{
					type: LinkType.SCROLL_TO_NEXT_BLOCK
				}"
				ref="buttonNext"/>
		</div>
	</div>
</template>
