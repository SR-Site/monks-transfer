<style src="./ProductList.scss" module lang="scss"></style>
<script src="./ProductList.js"></script>

<template>
	<div :class="[$style.productList, $style[ClassNameHelper.parseAlignment(data.alignment)]]">
		<div :class="$style.siteFrame" class="site-frame">
			<div class="overrule-overlap">
				<header :class="$style.header" ref="heading">
					<h2 :class="$style.heading" class="heading heading-03" v-html="data.heading"></h2>
					<h2 :class="$style.copy" class="copy copy-01" v-html="data.paragraph"></h2>
				</header>
				<div :class="$style.draggableContainer" ref="draggableContainer">
					<div :class="$style.products" ref="draggableElement" class="js-draggable-element">
						<ProductTeaser
							v-for="(product, index) in data.products"
							:componentId="`ProductTeaser${index}`"
							:key="index"
							:data="product"
							:class="$style.productTeaser"
							ref="product"
						/>
					</div>
				</div>
				<ScrollBar
					componentId="ScrollBar"
					v-show="showScrollBar"
					@update="handleScrollBarUpdate"
					@end="handleScrollBarEnd"
					:class="$style.scrollBar"/>
			</div>
		</div>
	</div>
</template>
