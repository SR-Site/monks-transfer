<style src="./NetworkOverview.scss" module lang="scss"></style>
<script src="./NetworkOverview.js"></script>

<template>
	<div :class="$style.networkOverview">
		<div :class="$style.siteFrame" class="site-frame">
			<div class="overrule-overlap">
				<header :class="$style.header">
					<h2 :class="$style.heading" class="heading heading-06" v-html="data.heading"></h2>
				</header>
				<div :class="$style.draggableContainer" ref="draggableContainer">
					<div :class="$style.networks" ref="draggableElement" class="js-draggable-element">
						<div
							v-for="(network, index) in data.items"
							:class="$style.network" >
							<figure class="abs-center" :class="$style.image">
								<ResponsiveImage :image="network.image" class="abs-fill fit-contain"/>
							</figure>
						</div>
					</div>
				</div>
				<ScrollBar componentId="ScrollBar" @update="handleScrollBarUpdate" :class="$style.scrollBar"/>
			</div>
		</div>
	</div>
</template>
