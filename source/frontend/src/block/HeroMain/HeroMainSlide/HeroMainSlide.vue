<style src="./HeroMainSlide.scss" module lang="scss"></style>
<script src="./HeroMainSlide.js"></script>

<template>
	<div :class="$style.heroMainSlide">
		<div :class="$style.content">
			<h1 :class="$style.heading" class="heading heading-01" v-html="heading" ref="heading"></h1>
			<p :class="$style.copy" class="copy copy-01" v-html="paragraph" ref="copy"></p>

			<ButtonCircleArrow
				componentId="ButtonCircleArrowLink"
				v-if="link"
				:direction="Direction.DOWN"
				:arrowPosition="Alignment.LEFT"
				:title="link.title"
				:label="link.label"
				:type="ButtonType.LINK"
				:link="{
					type: linkTypeMap[link.type],
					target: link.target,
				}"
				:class="$style.button"
				ref="buttonLink"/>

			<ButtonCircleArrow
				componentId="ButtonCircleArrowNext"
				v-if="slideCount > 1"
				@click="handleNextClick"
				:direction="Direction.RIGHT"
				:arrowPosition="Alignment.LEFT"
				:title="$t('global.cta.next')"
				:label="$t('global.cta.next')"
				:type="ButtonType.ACTION"
				:class="$style.button"
				ref="buttonNext"/>
		</div>
		<div :class="$style.statisticsWrapper" v-if="statistics">
			<h3
			    class="heading heading-07"
			    ref="statisticHeading"
				:class="$style.statisticsHeading"
				v-html="statistics.heading"
			></h3>
			<div :class="$style.statistics">
				<div :class="$style.statistic" v-for="(stat, index) in statistics.stats" :key="index" ref="statistic">
					<h4 :class="$style.heading" class="heading heading-08">
						<span v-html="stat.heading"></span><br/>
						<strong v-html="stat.description"></strong>
					</h4>
					<PercentageLoader
						:componentId="`PercentageLoader${index}`"
						:class="$style.percentageLoader"
						:borderType="PercentageLoaderBorderType.SOLID"
						:value="stat.value"
						:total="100"
					/>
				</div>
			</div>
		</div>
	</div>
</template>
