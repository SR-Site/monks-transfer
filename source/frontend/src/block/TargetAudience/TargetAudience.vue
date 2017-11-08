<style src="./TargetAudience.scss" module lang="scss"></style>
<script src="./TargetAudience.js"></script>

<template>
	<div :class="$style.targetAudience">
		<ResponsiveImage :image="data.backgroundImage" class="abs-fill fit-cover"/>
		<div class="primary-gradient-overlay" :class="$style.gradientOverlay"></div>
		<div class="abs-fill" :class="$style.absFill">
			<div :class="$style.siteFrame" class="site-frame">
				<header :class="$style.header">
					<h2 class="heading heading-03" :class="$style.heading" v-html="data.heading" ref="heading"></h2>
				</header>
				<div :class="$style.draggableContainer" ref="draggableContainer">
					<div :class="$style.devices" ref="draggableElement" class="js-draggable-element">
						<div
							v-for="(device, index) in data.devices"
							ref="device"
							:class="$style.device"
							:style="{width: `${width}px`}"
							:key="index">

							<figure :class="$style.deviceImage">
								<ResponsiveImage :image="device.image" class="abs-fill fit-cover"/>
							</figure>
							<h2 :class="$style.deviceHeading" class="heading heading-07" v-html="device.heading"></h2>
							<p :class="$style.deviceCopy" class="copy copy-03" v-html="device.paragraph"></p>
						</div>
					</div>
				</div>
				<ScrollBar
					v-show="showScrollBar"
					componentId="ScrollBar"
					@update="handleScrollBarUpdate"
					@end="handleScrollBarEnd"
					:theme="Theme.LIGHT"
					:class="$style.scrollBar"/>
			</div>
		</div>
	</div>
</template>
