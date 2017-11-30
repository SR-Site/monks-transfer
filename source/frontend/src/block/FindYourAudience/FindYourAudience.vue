<style src="./FindYourAudience.scss" module lang="scss"></style>
<script src="./FindYourAudience.js"></script>

<template>
	<div :class="$style.findYourAudience">
		<div class="site-frame include-padding" :class="$style.siteFrame">
			<div class="overrule-overlap" :class="$style.content">
				<div :class="$style.navigation" data-sticky-container>
					<ul :class="$style.navigationItems" class="js-sticky">
						<li :class="$style.navigationItem">
							<button
								class="button"
								@click="scrollToComponent('TopPicks')"
								:class="$style.navigationLink"
								v-html="data.topPicks.heading"></button>
						</li>
						<li :class="$style.navigationItem" v-for="(genre, index) in data.genres" :key="index">
							<button
								class="button"
								@click="scrollToComponent(`Genre.${index}`)"
								:class="$style.navigationLink"
								v-html="genre.heading"></button>
						</li>
						<li :class="$style.navigationItem">
							<button
								class="button"
								@click="scrollToComponent('Networks')"
								:class="$style.navigationLink"
								v-html="data.networks.heading"></button>
						</li>
					</ul>
				</div>
				<div :class="$style.items">
					<FindYourAudienceCategory
						@backToTop="handleBackToTop"
						componentId="TopPicks"
						:data="data.topPicks"/>
					<FindYourAudienceCategory
						v-for="(genre, index) in data.genres"
						@backToTop="handleBackToTop"
						:componentId="`Genre.${index}`"
						:key="index"
						ref="genre"
						:data="genre"/>
					<FindYourAudienceCategory
						@backToTop="handleBackToTop"
						componentId="Networks"
						:data="data.networks"/>
				</div>
			</div>
		</div>
	</div>
</template>
