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
						<li :class="$style.navigationItem">
							<button
								class="button"
								@click="scrollToComponent('Series')"
								:class="$style.navigationLink"
								v-html="data.series.heading"></button>
						</li>
						<li :class="$style.navigationItem">
							<button
								class="button"
								@click="scrollToComponent('AwardsAndSpecials')"
								:class="$style.navigationLink"
								v-html="data.awardsAndSpecials.heading"></button>
						</li>
						<li :class="$style.navigationItem">
							<button
								class="button"
								@click="scrollToComponent('Sports')"
								:class="$style.navigationLink"
								v-html="data.sports.heading"></button>
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
					<FindYourAudienceCategory componentId="TopPicks" :data="data.topPicks"/>
					<FindYourAudienceCategory componentId="Series" :data="data.series"/>
					<FindYourAudienceCategory componentId="AwardsAndSpecials" :data="data.awardsAndSpecials"/>
					<FindYourAudienceCategory componentId="Sports" :data="data.sports"/>
					<FindYourAudienceCategory componentId="Networks" :data="data.networks"/>
				</div>
			</div>
		</div>
	</div>
</template>
