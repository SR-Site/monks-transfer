<style src="./TwitterFeed.scss" module lang="scss"></style>
<script src="./TwitterFeed.js"></script>

<template>
	<div :class="$style.twitterFeed">
		<div class="site-frame">
			<div class="overrule-overlap" :class="$style.wrapper">
				<div class="abs-fill" :class="$style.content">
					<div :class="$style.viewport" class="infinite-carousel">
						<div class="slides" ref="slides">
							<div
								class="slide"
								ref="slide"
								v-for="(tweet, index) in data.items"
								:key="index"
								:class="$style.tweet">
								<p class="copy copy-01" v-html="tweet.handle" :class="$style.handle"></p>
								<h2 class="heading heading-02" v-html="tweet.text" :class="$style.text"></h2>
								<p class="copy copy-03" v-html="tweet.date" :class="$style.date"></p>
							</div>
						</div>
					</div>
					<Icon name="twitter" :class="$style.icon"/>
				</div>
			</div>
			<div :class="$style.navigationArrows">
				<ButtonCircleIcon
					@click="handlePrevious"
					componentId="ButtonPrevious"
					icon="circle-arrow-left"
					:theme="Theme.DARK"
					:iconPosition="Alignment.LEFT"
					title="previous"
					:type="ButtonType.ACTION"
					:class="$style.navigationButton"
				/>
				<ButtonCircleIcon
					@click="handleNext"
					componentId="ButtonNext"
					icon="circle-arrow-right"
					:theme="Theme.DARK"
					:iconPosition="Alignment.LEFT"
					title="next"
					:type="ButtonType.ACTION"
					:class="$style.navigationButton"
				/>
			</div>
			<ul :class="$style.pagination">
				<li
					@click="handlePaginationClick(index)"
					v-for="(tweet, index) in data.items"
					:key="index"
					:class="[$style.paginationBullet, {[$style.isActive]: index === activeIndex}]"
				></li>
			</ul>
		</div>
	</div>
</template>
