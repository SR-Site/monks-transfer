<style src="./Button.scss" module lang="scss"></style>
<script src="./Button.js"></script>

<template>
	<div :class="[$style.button, $style[mappedAlignment]]" class="site-frame">
		<div class="overrule-overlap">
			<ButtonPrimary
				componentId="ButtonPrimary"
				:title="data.link.title"
				:label="data.link.label"
				:type="ButtonType.LINK"
				:theme="Theme.DARK"
				:link="{
					type: linkTypeMap[data.link.type],
					target: data.link.target,
				}" />
		</div>
	</div>
</template>
