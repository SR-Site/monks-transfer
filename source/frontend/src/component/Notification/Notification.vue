<style src="./Notification.scss" module lang="scss">
</style>
<script src="./Notification.js">
</script>

<template>
	<div :class="$style.notification">
		<div :class="$style.contentWrapper">
			<div :class="$style.content" ref="content">
				<ButtonCircleClose
					@click="decline"
					title="Close"
					componentId="ButtonCircleClose"
					:type="ButtonType.ACTION"
					:class="$style.closeButton"
				/>
				<Icon v-if="icon" :name="icon" :class="$style.icon" />
				<h3 v-if="heading" class="heading-06" :class="$style.heading">{{ heading }}</h3>
				<p class="copy-03" :class="$style.copy" v-html="paragraph"></p>
				<div v-if="type === notificationTypes.CONFIRMATION" :class="$style.confirmationActions">
					<ButtonSecondary
						componentId="ButtonNo"
						@click="decline"
						:theme="Theme.DARK"
						:class="[$style.buttonNo, $style.button]"
						:title="noLabel"
						:label="noLabel"
						:type="ButtonType.ACTION"
					/>
					<ButtonSecondary
						componentId="ButtonYes"
						@click="accept"
						:class="[$style.buttonYes, $style.button]"
						:theme="Theme.DARK"
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
						:theme="Theme.DARK"
						:title="okLabel"
						:label="okLabel"
						:type="ButtonType.ACTION"
					/>
				</div>
				<div v-if="type === notificationTypes.MEDIA_KIT_DOWNLOAD" :class="$style.confirmationActions">
					<form :class="$style.downloadForm" novalidate @submit.prevent="submit">
						<div class="text-input-holder" v-for="(field, index) in downloadFields" :key="index">
							<div class="input-text input-text-main" :class="[$style.input, {'is-invalid': errors.has(field.name) }]"
								 v-focus-border>
								<input
										v-validate="field.validationRules"
										autocomplete="off"
										@input="event => handleInputChange(event, field)"
										:value="field.value"
										:class="{'has-value': field.value}"
										:type="field.type"
										:name="field.name"
										:id="field.name" />
								<span class="placeholder-label">
									{{ $t(`global.form.placeholder.${field.localeKey}`) }}
								</span>
							</div>
						</div>
						<ButtonSecondary
								componentId="ButtonOk"
								@click="submit"
								:class="[$style.buttonOk, $style.button]"
								:theme="Theme.DARK"
								:title="sendLabel"
								:label="sendLabel"
								:type="ButtonType.ACTION"
						/>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>
