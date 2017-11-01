<style src="./BlogPost.scss" module lang="scss"></style>
<script src="./BlogPost.js"></script>

<template>
	<div :class="$style.blogPost">
		<div class="site-frame is-small">
			<div :class="$style.header" ref="header">
				<p :class="$style.date" class="copy copy-03" v-html="data.date"></p>
				<h2 :class="$style.heading" class="heading heading-04" v-html="data.heading"></h2>
			</div>
			<div :class="$style.footer" ref="footer">
				<p :class="$style.author" class="copy copy-01" v-html="data.author.name"></p>
				<div :class="$style.details">
					<ul :class="$style.stats">
						<li :class="$style.stat" class="copy copy-01">
							{{ data.time }} {{ readTimeLabel }}
						</li>
						<li :class="$style.stat" class="copy copy-01">
							{{ viewCount }} {{ viewCountLabel }}
						</li>
						<li :class="$style.stat" class="copy copy-01">
							{{ data.shares }} {{ shareCountLabel }}
						</li>
					</ul>
					<div :class="$style.tags">
						<ButtonTag
							v-for="(tag, index) in data.tags"
							:key="index"
							:componentId="`ButtonTag${index}`"
							:title="tag.title"
							:label="tag.label"
							:type="ButtonType.LINK"
							:link="{
									type: linkTypeMap[tag.type],
									target: tag.target,
								}"
							:class="$style.tag"/>
					</div>
				</div>
			</div>
			<div :class="$style.content" ref="content">
				<h3 :class="$style.heading" class="heading-06 heading" v-html="data.subHeading"></h3>
				<p class="copy-01 copy" v-html="data.paragraph"></p>
			</div>
		</div>
	</div>
</template>
