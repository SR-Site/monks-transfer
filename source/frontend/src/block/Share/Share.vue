<style src="./Share.scss" module lang="scss"></style>
<script src="./Share.js"></script>

<template>
	<div :class="[
		$style.share,
		{[$style.twitter]: data.twitter},
		{[$style.facebook]: data.facebook},
		{[$style.linkedIn]: data.linkedIn},
	]">
		<social-sharing :url="url" inline-template>
			<ul class="networks">
				<li class="facebook">
					<network network="facebook">
						<Icon name="share-facebook"/>
					</network>
				</li>
				<li class="linked-in">
					<network network="linkedin">
						<Icon name="share-linkedin"/>
					</network>
				</li>
				<li class="twitter">
					<network network="twitter">
						<Icon name="share-twitter"/>
					</network>
				</li>
			</ul>
		</social-sharing>
	</div>
</template>
