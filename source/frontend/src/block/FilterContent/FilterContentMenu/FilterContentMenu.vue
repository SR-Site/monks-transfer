<style src="./FilterContentMenu.scss" module lang="scss"></style>
<script src="./FilterContentMenu.js"></script>

<template>
	<div :class="[$style.filterContentMenu, {[$style.isActive]: mobileMenuActive}]">
		<div :class="$style.menu">
			<button @click="handleFilterToggleClick" class="button" :class="[$style.button, $style.mainButton]">
				<span :class="$style.label">{{ activeFilterLabel }}</span>
				<Icon :name="activeFilterIcon" :class="$style.icon"/>
			</button>
			<div :class="$style.filters">
				<div :class="$style.filter" v-for="(filter, index) in filters" :key="index">
					<button
						@click="handleFilterClick(index)"
						class="button"
						:class="[$style.button, $style.filterButton, {[$style.isActive]: index === activeIndex }]">
						<span :class="$style.label">{{filter.label}}</span>
						<span :class="$style.details">
							<span :class="$style.badge" v-if="chosenOptionCount(filter.type) > 0">
								{{ chosenOptionCount(filter.type) }}
							</span>
							<Icon name="circle-arrow-down" :class="$style.icon"/>
						</span>
					</button>
					<FilterContentMenuDropdown
						@close="handleClose"
						@select="handleFilterOptionSelect"
						v-if="deviceState <= DeviceState.SMALL"
						:disableTransitionIn="true"
						:class="$style.dropdown"
						:filter="filter.type"
						:chosenOptions="chosenOptions"
						:options="filter.options"
						:componentId="`FilterContentMenuDropdown${index}`"/>
				</div>
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
