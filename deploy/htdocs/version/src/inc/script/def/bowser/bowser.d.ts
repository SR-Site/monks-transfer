declare class bowser
{
	/**
	 * Browser flags
	 */
	public static name: string;
	public static version: string;
	public static chrome: boolean;
	public static firefox: boolean;
	public static msie: boolean;
	public static msedge: boolean;
	public static safari: boolean;
	public static opera: boolean;
	public static samsungBrowser: boolean;
	public static phantom: boolean;
	public static silk: boolean;
	public static ucbrowser: boolean;
	public static qupzilla: boolean;
	public static vivaldi: boolean;
	public static sleipnir: boolean;
	public static kMeleon: boolean;

	/**
	 * OS Flags
	 */
	public static mac: boolean;
	public static windows: boolean;
	public static windowsphone: boolean;
	public static linux: boolean;
	public static chromeos: boolean;

	/**
	 * Device flags
	 */
	public static mobile:boolean;
	public static tablet:boolean;
	public static ipad:boolean;

	/**
	 * Shared Browser/OS Flags
	 */
	public static ios: boolean;
	public static android: boolean;
	public static blackberry: boolean;
	public static webos: boolean;
	public static tizen: boolean;
	public static seamonkey: boolean;
	public static sailfish: boolean;
	public static bada: boolean;

	/**
	 * Version number
	 */
	public static osversion: string;

	/**
	 * Browser capability grading
	 */
	public static a: boolean;
	public static c: boolean;
	public static x: boolean;

	/**
	 * Methods
	 */
	public static check(data: Object, strictMode?: boolean, userAgent?: string):boolean;
	public static compareVersions(versions: Array<string>):number;
	public static isUnsupportedBrowser(minVersions: Object):boolean;
}

declare module "bowser" {
	export = bowser;
}