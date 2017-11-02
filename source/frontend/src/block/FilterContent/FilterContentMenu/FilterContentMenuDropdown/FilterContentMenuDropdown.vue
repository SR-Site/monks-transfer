<style src="./FilterContentMenuDropdown.scss" module lang="scss"></style>
<script src="./FilterContentMenuDropdown.js"></script>

<template>
	<div :class="$style.filterContentMenuDropdown">
		<div :class="$style.wrapper">
			<div :class="$style.filters">
				<button
					v-for="(option, index) in options"
					:class="[$style.filter, {[$style.isActive]: isActive(option)}]"
					@click="handleOptionClick(option)">
					{{ option.label }}
				</button>
			</div>
			<ButtonCircleClose
				componentId="ButtonCircleClose"
				title="Close"
				:size="Size.SMALL"
				:type="ButtonType.ACTION"
				:class="$style.button"
				@click="handleClose"/>
		</div>
	</div>
</template>
