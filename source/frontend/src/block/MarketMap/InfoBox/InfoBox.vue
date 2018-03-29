<style src="./InfoBox.scss" module lang="scss">
</style>
<script src="./InfoBox.js">
</script>

<template>
	<div :class="[$style.wrapper , {[$style.isActive]: isActive}]">
		<button :class="['button', $style.toggle]" @click="handleToggle">
			<span class="icon">?</span>
		</button>
		<div :class="$style.box">
			<ButtonCircleClose
				componentId="ButtonCircleClose"
				title="Close"
				:size="Size.LARGE"
				:type="ButtonType.ACTION"
				:class="$style.close"
				@click="handleToggle"
			/>
			<h3 :class="['heading', 'heading-06', $style.heading]" v-html="data.heading"></h3>
			<p class="copy copy-03">{{data.copy}}</p>
		</div>
	</div>
</template>
