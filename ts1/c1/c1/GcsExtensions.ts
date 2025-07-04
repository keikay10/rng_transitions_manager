export class GcsExtensions {
	static CmElementBefore( el1: HTMLElement, el2: HTMLElement ) {
		return ( ( el1.compareDocumentPosition( el2 ) & Node.DOCUMENT_POSITION_FOLLOWING ) !== 0 );
	}

	static CmElementAfter( el1: HTMLElement, el2: HTMLElement ) {
		return ( ( el1.compareDocumentPosition( el2 ) & Node.DOCUMENT_POSITION_PRECEDING ) !== 0 );
	}
	static CmBankersRound( n: number, d:number = 0 ) {
		var x = n * Math.pow(10, d);
		var r = Math.round(x);
		var br = Math.abs(x) % 1 === 0.5 ? (r % 2 === 0 ? r : r-1) : r;
		return br / Math.pow(10, d);
	}
	static CmGetRandomIntInclusive( min: number, max: number ) {
		const minCeiled = Math.ceil(min);
		const maxFloored = Math.floor(max);
		return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
	}
}