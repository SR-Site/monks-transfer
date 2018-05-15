<style src="./Search.scss" module lang="scss">
</style>
<script src="./Search.js">
</script>

<template>
	<div :class="$style.wrapper">
		<form action="#" :class="$style.searchForm" @submit.prevent="handleFormSubmit">
			<input
					@focus="handleFocus"
					@blur="handleBlur"
					v-model="query"
					type="text"
					:class="$style.input" placeholder="Where do you want to advertise"
			>
		</form>
		<div class="scroll-wrapper" :class="$style.searchResults" ref="scrollWrapper" v-show="showResults">
			<div class="scroll-content" data-scroll-content :class="$style.scrollContent">
				<div data-content-inner>
					<ul :class="$style.markets">
						<li :class="$style.market" v-for="(result, index) in results" :key="index">
							<a @click="handleMarketClick(result)" :class="$style.marketLink">
								{{ result.city}}, {{result.statePostalCode}}
							</a>
						</li>
					</ul>
				</div>
			</div>
			<div class="scroll-bar" data-scroll-bar>
				<span class="knob" data-scroll-knob></span>
			</div>
		</div>
	</div>
</template>
