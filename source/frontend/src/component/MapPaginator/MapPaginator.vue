<style src="./MapPaginator.scss" module lang="scss"></style>
<script src="./MapPaginator.js"></script>

<template>
	<div :class="$style.mapPaginator">
		<button
			@click="handlePreviousClick"
			class="button"
			:class="[$style.navigationButton, {[$style.isActive]: activeIndex > 0}]">
			<Icon name="circle-arrow-left" class="abs-center" :class="$style.icon"></Icon>
		</button>
		<div :class="$style.wrapper">
			<span :class="$style.progress"></span>
			<ul :class="$style.slides">
				<li
					@click="handlePaginatorClick(index)"
					v-for="(item, index) in items"
					v-if="deviceState > DeviceState.SMALL || index === activeIndex"
					:key="index"
					:class="[$style.slide, {[$style.isActive]: index === activeIndex}]">
					{{ padStart(index + 1)}}
				</li>
			</ul>
		</div>
		<button
			@click="handleNextClick"
			class="button"
			:class="[$style.navigationButton, {[$style.isActive]: activeIndex < items.length - 1}]">
			<Icon name="circle-arrow-right" class="abs-center" :class="$style.icon"></Icon>
		</button>
	</div>
</template>
