<style src="./FilterContent.scss" module lang="scss"></style>
<script src="./FilterContent.js"></script>

<template>
	<div :class="$style.filterContent">
		<div class="site-frame">
			<FilterContentMenu
				componentId="FilterContentMenu"
				@update="handleFilterMenuUpdate"
				ref="filterContentMenu"
				:closeLabel="data.closeLabel"
				:filterLabel="data.filterLabel"
				:class="$style.filterMenu"
				:filters="data.filters"/>
			<div :class="$style.filterResult">
				<component
					v-for="(block, index) in blocks"
					@isReady="handleFilterBlockReady"
					:class="$style.block"
					:data-scroll-id="block.data.scrollId || null"
					:scrollId="block.scrollId"
					:data="block.data"
					:debugLabel="true"
					:is="block.id"
					:componentId="`FilterBlock${index}`"
					:key="index"/>
			</div>
			<DashedPaginator
				componentId="DashedPaginator"
				@paginatorClick="handlePaginatorClick"
				:activeIndex="index"
				:orientation="Orientation.HORIZONTAL"
				:items="paginatorItems" />
			<Spinner componentId="Spinner"/>
		</div>
	</div>
</template>
