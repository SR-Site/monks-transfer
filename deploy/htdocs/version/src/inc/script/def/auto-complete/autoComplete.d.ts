declare class autoComplete
{
	constructor(options: autoCompleteOptions);

	public destroy(): void;

}

interface autoCompleteOptions
{
	selector: string|HTMLElement;
	source: (term: string, suggest: (suggestions: Array<any>) => void) => void;
	minChars?: number;
	delay?: number;
	offsetLeft?: number;
	offsetTop?: number;
	cache?: boolean;
	menuClass?: string;
	renderItem?: (item, searchQuery:string) => void;

	onSelect?: (event: any, term: string, item: HTMLElement) => void;
}
