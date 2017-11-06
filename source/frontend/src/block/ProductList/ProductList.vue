<style src="./ProductList.scss" module lang="scss"></style>
<script src="./ProductList.js"></script>

<template>
	<div :class="$style.productList">
		<div :class="$style.siteFrame" class="site-frame">
			<div class="overrule-overlap">
				<header :class="$style.header" ref="heading">
					<h2 :class="$style.heading" class="heading heading-03" v-html="data.heading"></h2>
					<ButtonQuaternary
						componentId="ButtonQuaternary"
						v-track="{
							[TrackingProvider.GOOGLE_ANALYTICS]: {
								category: 'productList',
								action: 'click',
								label: data.link.title
							}
						}"
						:title="data.link.title"
						:label="data.link.label"
						:type="ButtonType.LINK"
						:theme="Theme.DARK"
						:link="{
							type: BackendLinkTypeMap[data.link.type],
							target: data.link.target,
						}"
						:class="$style.button"/>
				</header>
				<div :class="$style.draggableContainer" ref="draggableContainer">
					<div :class="$style.products" ref="draggableElement" class="js-draggable-element">
						<ProductTeaser
							v-for="(product, index) in data.products"
							:componentId="`ProductTeaser${index}`"
							:key="index"
							:data="product"
							:class="$style.productTeaser"
							ref="article"
						/>
					</div>
				</div>
				<ScrollBar
					componentId="ScrollBar"
					@update="handleScrollBarUpdate"
					@end="handleScrollBarEnd"
					:class="$style.scrollBar"/>
			</div>
		</div>
	</div>
</template>
