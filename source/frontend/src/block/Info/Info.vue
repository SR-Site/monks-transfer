<style src="./Info.scss" module lang="scss"></style>
<script src="./Info.js"></script>

<template>
	<div :class="[$style.info, {[$style.isNested]: isNested}]">
		<div :class="$style.innerContent">
			<div :class="$style.description">
				<h2 :class="$style.heading" class="heading-06 heading" v-html="data.heading" ref="heading"></h2>
				<p :class="$style.copy" class="copy-02 copy" v-html="data.paragraph" ref="copy"></p>
			</div>
			<ButtonPrimary
				componentId="ButtonPrimary"
				v-if="data.link"
				v-track="{
					[TrackingProvider.GOOGLE_ANALYTICS]: {
						category: 'info',
						action: 'click',
						label: `${data.heading}|${data.link.title}`
					}
				}"
				:title="data.link.title"
				:label="data.link.label"
				:type="ButtonType.LINK"
				:theme="Theme.LIGHT"
				:link="{
					type: linkTypeMap[data.link.type],
					target: data.link.target,
				}"/>
		</div>
		<div :class="$style.clipMask" ref="clipMask"></div>
	</div>
</template>
