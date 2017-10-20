<style src="./Notification.scss" module lang="scss"></style>
<script src="./Notification.js"></script>

<template>
	<div :class="$style.notification">
		<div :class="$style.contentWrapper">
			<div :class="$style.content" ref="content">
				<Icon v-if="icon" :name="icon" :class="$style.icon" />
				<h3 v-if="heading" class="heading-03" :class="$style.heading">{{ heading }}</h3>
				<p class="copy-02" :class="$style.copy" v-html="paragraph"></p>

				<div v-if="type === notificationTypes.CONFIRMATION" :class="$style.confirmationActions">
					<ButtonSecondary
						componentId="ButtonNo"
						@click="decline"
						:class="[$style.buttonNo, $style.button]"
						:title="noLabel"
						:label="noLabel"
						:type="ButtonType.ACTION"
					/>
					<ButtonSecondary
						componentId="ButtonYes"
						@click="accept"
						:class="[$style.buttonYes, $style.button]"
						:title="yesLabel"
						:label="yesLabel"
						:type="ButtonType.ACTION"
					/>
				</div>
				<div v-if="type === notificationTypes.ALERT" :class="$style.confirmationActions">
					<ButtonSecondary
						componentId="ButtonOk"
						@click="accept"
						:class="[$style.buttonOk, $style.button]"
						:title="okLabel"
						:label="okLabel"
						:type="ButtonType.ACTION"
					/>
				</div>
			</div>
		</div>
	</div>
</template>
