<style src="./DashedPaginator.scss" module lang="scss"></style>
<script src="./DashedPaginator.js"></script>

<template>
	<div :class="[$style.dashedPaginator, $style[ClassNameHelper.parseOrientation(orientation)]]">
		<button
			v-for="(item, index) in items"
			@click="handlePaginatorClick(index)"
			:key="index"
			:class="[
				$style.paginationItem,
				{[$style.isActive]: index === activeIndex}
			]"
			class="button">
			<span :class="$style.nr"></span>
		</button>
	</div>
</template>
