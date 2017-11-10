<style src="./ImageListSlide.scss" module lang="scss"></style>
<script src="./ImageListSlide.js"></script>

<template>
	<div :class="$style.imageListSlide">
		<div class="abs-fill" :class="$style.content">
			<div :class="$style.description">
				<h2 :class="$style.heading" class="heading heading-03" v-html="data.heading"></h2>
				<p :class="$style.copy" class="copy copy-01" v-html="data.paragraph"></p>
				<ButtonCircleIcon
					v-if="data.link"
					componentId="ButtonCircleArrowLink"
					icon="circle-arrow-down"
					:theme="Theme.DARK"
					:iconPosition="Alignment.LEFT"
					:title="data.link.title"
					:label="data.link.label"
					:type="ButtonType.LINK"
					:link="{
						type: BackendLinkTypeMap[data.link.type],
						target: data.link.target,
					}"
					:class="$style.button"
					ref="button"/>
			</div>
			<figure :class="$style.image">
				<ResponsiveImage :image="data.image" class="abs-fill fit-cover"/>
			</figure>
		</div>
	</div>
</template>
