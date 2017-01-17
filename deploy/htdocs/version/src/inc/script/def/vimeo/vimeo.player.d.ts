/// <reference path="../bluebird/bluebird.d.ts" />

declare module Vimeo
{
	export class Player
	{
		constructor(element:HTMLElement|Node|string|Object, options?:VimeoPlayerOptions)

		/**
		 * Add an event listener for the specified event. Will call the callback with a single parameter, data, that contains the data for that event. See events below for details.
		 * @param event
		 * @param callback
		 */
		on(event:string, callback:(event:IVimeoVideoEvent)=>void):void

		/**
		 * Remove an event listener for the specified event. Will remove all listeners for that event if a callback isn’t passed, or only that specific callback if it is passed.
		 * @param event
		 * @param callback
		 */
		off(event:string, callback?:(event:IVimeoVideoEvent)=>void):void

		/**
		 * Load a new video into this embed. The promise will be resolved if the video is successfully loaded, or it will be rejected if it could not be loaded.
		 * @param id
		 */
		loadVideo(id:number):PromiseBluebird<any>

		/**
		 * Trigger a function when the player iframe has initialized. You do not need to wait for ready to trigger to begin adding event listeners or calling other methods.
		 */
		ready():PromiseBluebird<any>

		/**
		 * Enable the text track with the specified language, and optionally the specified kind (captions or subtitles).
		 * @param language
		 * @param kind
		 */
		enableTextTrack(language:string, kind?:string):PromiseBluebird<any>

		/**
		 * Disable the currently-active text track.
		 */
		disableTextTrack():PromiseBluebird<any>

		/**
		 * Pause the video if it’s playing.
		 */
		pause():PromiseBluebird<any>

		/**
		 * Play the video if it’s paused. Note: on iOS and some other mobile devices, you cannot programmatically trigger play. Once the viewer has tapped on the play button in the player, however, you will be able to use this function.
		 */
		play():PromiseBluebird<any>

		/**
		 * Return the player to its initial state.
		 */
		unload():PromiseBluebird<any>

		/**
		 * Get the autopause behavior for this player.
		 */
		getAutopause():PromiseBluebird<any>

		/**
		 * Enable or disable the autopause behavior of this player. By default, when another video is played in the same browser, this player will automatically pause. Unless you have a specific reason for doing so, we recommend that you leave autopause set to the default (true).
		 * @param autopause
		 */
		setAutopause(autopause:boolean):PromiseBluebird<any>

		/**
		 * Get the color for this player.
		 */
		getColor():PromiseBluebird<any>

		/**
		 * Set the color of this player to a hex or rgb string. Setting the color may fail if the owner of the video has set their embed preferences to force a specific color.
		 * @param color
		 */
		setColor(color:string):PromiseBluebird<any>

		/**
		 * Get the current playback position in seconds.
		 */
		getCurrentTime():PromiseBluebird<any>

		/**
		 * Set the current playback position in seconds. Once playback has started, if the player was paused, it will remain paused. Likewise, if the player was playing, it will resume playing once the video has buffered. Setting the current time before playback has started will cause playback to start.
		 * @param seconds
		 */
		setCurrentTime(seconds:number):PromiseBluebird<any>

		/**
		 * Get the duration of the video in seconds. It will be rounded to the nearest second before playback begins, and to the nearest thousandth of a second after playback begins.
		 */
		getDuration():PromiseBluebird<any>

		/**
		 * Get the ended state of the video. The video has ended if currentTime === duration.
		 */
		getEnded():PromiseBluebird<any>

		/**
		 * Get the loop state of the player.
		 */
		getLoop():PromiseBluebird<any>

		/**
		 * Set the loop state of the player. When set to true, the player will start over immediately once playback ends.
		 * @param loop
		 */
		setLoop(loop:boolean):PromiseBluebird<any>

		/**
		 * Get the paused state of the player.
		 */
		getPaused():PromiseBluebird<any>

		/**
		 * Get an array of the text tracks that exist for the video. For example:
		 */
		getTextTracks():PromiseBluebird<any>

		/**
		 * Get the <iframe> embed code for the video.
		 */
		getVideoEmbedCode():PromiseBluebird<any>

		/**
		 * Get the id of the video.
		 */
		getVideoId():PromiseBluebird<any>

		/**
		 * Get the title of the video.
		 */
		getVideoTitle():PromiseBluebird<any>

		/**
		 * Get the native width of the currently‐playing video. The width of the highest resolution available will be used before playback begins.
		 */
		getVideoWidth():PromiseBluebird<any>

		/**
		 * Get the native height of the currently‐playing video. The height of the highest resolution available will be used before playback begins.
		 */
		getVideoHeight():PromiseBluebird<any>

		/**
		 * Get the vimeo.com url for the video.
		 */
		getVideoUrl():PromiseBluebird<any>

		/**
		 * Get the current volume level of the player on a scale from 0 to 1.
		 */
		getVolume():PromiseBluebird<any>

		/**
		 * Set the volume of the player on a scale from 0 to 1. When set via the API, the volume level will not be synchronized to other players or stored as the viewer’s preference.
		 * @param volume
		 */
		setVolume(volume:number):PromiseBluebird<any>
	}

	interface VimeoPlayerOptions
	{
		/**
		 * Required. Either the id or the url of the video.
		 */
		id:number|string;
		/**
		 * Pause this video automatically when another one plays.
		 */
		autopause?:boolean;
		/**
		 * Automatically start playback of the video. Note that this won’t work on some devices.
		 */
		autoplay?:boolean;
		/**
		 * Show the byline on the video.
		 */
		byline?:boolean;
		/**
		 * Specify the color of the video controls. Colors may be overridden by the embed settings of the video.
		 */
		color?:string;
		/**
		 * The exact height of the video. Defaults to the height of the largest available version of the video.
		 */
		height?:number;
		/**
		 *    Play the video again when it reaches the end.
		 */
		loop?:boolean;
		/**
		 * Same as height, but video will not exceed the native size of the video.
		 */
		maxheight?:number;
		/**
		 * Same as width, but video will not exceed the native size of the video.
		 */
		maxwidth?:number;
		/**
		 *    Show the portrait on the video.
		 */
		portrait?:boolean;
		/**
		 * Show the title on the video.
		 */
		title?:boolean;
		/**
		 * The exact width of the video. Defaults to the width of the largest available version of the video.
		 */
		width?:number;
	}

	export interface IVimeoVideoEvent
	{
		duration:number;
		percent:number;
		seconds:number;
	}
}



