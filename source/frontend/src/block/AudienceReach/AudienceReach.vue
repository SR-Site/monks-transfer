<style src="./AudienceReach.scss" module lang="scss"></style>
<script src="./AudienceReach.js"></script>

<template>
	<div :class="$style.audienceReach">
		<div class="site-frame">
			<div class="overrule-overlap">
				<header :class="$style.heading" ref="header">
					<h2 class="heading heading-03" v-html="data.heading"></h2>
				</header>
				<ul :class="$style.channels">
					<li :class="$style.channel" v-for="(channel, index) in data.channels" :key="index" ref="item">
						<figure :class="$style.image">
							<ResponsiveImage :image="channel.image" class="abs-center fit-cover"/>
						</figure>
						<div :class="$style.description">
							<h3 :class="$style.descriptionHeading" class="heading heading-07" v-html="channel.heading"></h3>
							<ul
								:class="$style.statistics"
								v-for="(statistic, index) in channel.statistics"
							    :key="index">
								<li class="copy copy-03" :class="$style.statistic" v-html="statistic.value"></li>
							</ul>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
