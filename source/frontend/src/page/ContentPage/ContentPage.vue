<style src="./ContentPage.scss" module lang="scss"></style>
<script src="./ContentPage.js"></script>

<template>
	<div :class="$style.blockWrapper">
		<component
			v-for="(block, index) in blocks"
			@isReady="handleBlockComponentReady"
			@resize="handleResize"
			:class="getBlockClassNames(block.data)"
			:data-scroll-id="block.data.scrollId || null"
			:scrollId="block.scrollId"
			:debugLabel="true"
			:data="block.data"
			:is="block.id"
			:componentId="block.id + '.' + block.blockIndex"
			:key="index" />
	</div>
</template>
