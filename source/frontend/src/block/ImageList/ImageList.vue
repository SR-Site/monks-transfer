<style src="./ImageList.scss" module lang="scss"></style>
<script src="./ImageList.js"></script>

<template>
	<div :class="$style.imageList">
		<div class="site-frame" ref="siteFrame" :class="$style.siteFrame">
			<div class="overrule-overlap" :class="$style.row" ref="row">
				<div :class="$style.slides" ref="slides">
					<ImageListSlide
						v-for="(slide, index) in data.slides"
						:componentId="`ImageListSlide${index}`"
						:key="index"
						:class="$style.slide"
						:data="slide"/>
				</div>
				<ul :class="$style.pagination">
					<li
						@click="openSlide(index)"
						v-for="(slide, index) in data.slides"
						:key="index"
						:class="[$style.paginationItem, {[$style.isActive]: index === activeIndex}]"></li>
				</ul>
			</div>
		</div>
	</div>
</template>
