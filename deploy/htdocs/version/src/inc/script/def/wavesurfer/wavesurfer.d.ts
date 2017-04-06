declare class WaveSurfer
{
	static create(options: WaveSurferOptions): WaveSurfer;

	public destroy(): void;

	public empty(): void;

	public getCurrentTime(): number;

	public getDuration(): number;

	public isPlaying(): boolean;

	public load(url: string): void;

	public loadBlob(url: File|Blob): void;

	public on(eventName: string, callback: Function): void;

	public un(eventName: string, callback: Function): void;

	public unAll(): void;

	public pause(): void;

	public playPause(): void;

	public seekdAndCenter(progress: number): void;

	public seekTo(progress: number): void;

	public setFilter(filters: any): void;

	public setPlaybackRate(rate: number): void;

	public setVolume(newVolume: number): void;

	public skip(offset: number);

	public skipBackward(): void;

	public skipForward(): void;

	public stop(): void;

	public toggleMute(): void;

	public toggleInteraction(): void;

	public toggleScroll(): void;

	public zoom(pxPerSec: number);
}

interface WaveSurferOptions
{
	audioContext?: Object;
	audioRate?: float;
	backend?: string;
	barWidth?: number;
	container?: HTMLElement|string;
	cursorColor?: string;
	cursorWidth?: number;
	fillParent?: boolean;
	height?: number;
	hideScrollbar?: boolean;
	interact?: boolean;
	maxCanvasWidth?: number;
	mediaType?: string;
	minPxPerSec?: number;
	normalize?: boolean;
	pixelRatio?: number;
	progressColor?: string;
	renderer?: string;
	scrollParent?: boolean;
	skipLength?: float;
	waveColor?: string;
	autoCenter?: string;
}
