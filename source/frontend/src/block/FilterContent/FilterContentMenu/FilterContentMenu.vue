<style src="./FilterContentMenu.scss" module lang="scss"></style>
<script src="./FilterContentMenu.js"></script>

<template>
	<div :class="$style.filterContentMenu">
		<div :class="$style.menu">
			<button class="button" :class="[$style.button, $style.mainButton]">
				<span :class="$style.label">Filters</span>
				<Icon name="filter" :class="$style.icon"/>
			</button>
			<div :class="$style.filters">
				<button
					@click="handleFilterClick(index)"
					class="button"
					v-for="(filter, index) in filters"
					:key="index"
					:class="[$style.button, $style.filterButton, {[$style.isActive]: index === activeIndex }]">
					<span :class="$style.label">{{filter.label}}</span>
					<span :class="$style.details">
						<span :class="$style.badge" v-if="chosenOptionCount(filter.type) > 0">
							{{ chosenOptionCount(filter.type) }}
						</span>
						<Icon name="circle-arrow-down" :class="$style.icon"/>
					</span>
				</button>
			</div>
		</div>
		<FilterContentMenuDropdown
			@close="handleClose"
			@select="handleFilterOptionSelect"
			:class="$style.dropdown"
			:filter="activeFilter"
			:chosenOptions="chosenOptions"
			:options="activeFilterOptions"
			componentId="FilterContentMenuDropdown"/>
	</div>
</template>
