<style src="./Button.scss" module lang="scss"></style>
<script src="./Button.js"></script>

<template>
	<div :class="[$style.button, $style[ClassNameHelper.parseAlignment(this.data.alignment)]]" class="site-frame">
		<div class="overrule-overlap">
			<ButtonPrimary
				componentId="ButtonPrimary"
				v-track="{
					[TrackingProvider.GOOGLE_ANALYTICS]: {
						category: 'button',
						action: 'click',
						label: data.link.title
					}
				}"
				:title="data.link.title"
				:label="data.link.label"
				:type="ButtonType.LINK"
				:theme="Theme.DARK"
				:link="{
					type: linkTypeMap[data.link.type],
					target: data.link.target,
				}"  />
		</div>
	</div>
</template>
