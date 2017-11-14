<style src="./MainProductNav.scss" module lang="scss"></style>
<script src="./MainProductNav.js"></script>

<template>
	<div :class="$style.mainProductNav">
		<div class="site-frame" :class="$style.siteFrame">
			<header :class="$style.header" ref="heading">
				<h2 :class="$style.heading" class="heading heading-03" v-html="data.heading"></h2>
				<p class="copy copy-01" v-html="data.paragraph"></p>
			</header>
			<div class="overrule-overlap" :class="$style.sliderViewpor" ref="sliderViewport">
				<div :class="$style.items" ref="slides">
					<div v-for="(item, index) in data.items" ref="item" :class="$style.item" class="slide">
						<MainProductNavItem
							:key="index"
							:data="item"
							:componentId="`MainProductNavItem${index}`"/>
					</div>
				</div>
			</div>
			<DashedPaginator
				componentId="DashedPaginator"
				@paginatorClick="handlePaginatorClick"
				:class="$style.paginator"
				:activeIndex="activeIndex"
				:orientation="Orientation.HORIZONTAL"
				:items="data.items" />
		</div>
	</div>
</template>
