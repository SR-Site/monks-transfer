<style src="./PageNotFound.scss" module lang="scss"></style>
<script src="./PageNotFound.js"></script>

<template>
	<div :class="$style.blockPageNotFound">
		<ResponsiveImage :image="data.image" :class="$style.background" class="fit-cover"/>
		<div :class="$style.message" class="abs-center">
			<h2 :class="$style.heading" class="heading heading-01" v-html="data.heading"></h2>
			<p :class="$style.copy" class="copy copy-01" v-html="data.paragraph"></p>
			<ButtonPrimary
				componentId="ButtonPrimary"
				v-if="data.link"
				:title="data.link.title"
				:label="data.link.label"
				:type="ButtonType.LINK"
				:theme="Theme.LIGHT"
				:link="{
					type: linkTypeMap[data.link.type],
					target: data.link.target,
				}"
				:class="$style.button"/>
		</div>
		<div :class="$style.errorCode" class="abs-center" v-html="data.errorCode"></div>
	</div>
</template>
