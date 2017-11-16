<style src="./DoubleImage.scss" module lang="scss"></style>
<script src="./DoubleImage.js"></script>

<template>
	<div :class="$style.doubleImage">
		<div class="site-frame" :class="$style.content">
			<figure :class="$style.primaryImage" ref="primaryImage">
				<div :class="$style.image">
					<ResponsiveImage class="abs-fill fit-cover" :image="data.primaryImage"/>
				</div>
			</figure>
			<figure :class="$style.secondaryImage" ref="secondaryImage">
				<div :class="$style.image">
					<ResponsiveImage class="abs-fill fit-cover" :image="data.secondaryImage"/>
				</div>
			</figure>
		</div>
	</div>
</template>
