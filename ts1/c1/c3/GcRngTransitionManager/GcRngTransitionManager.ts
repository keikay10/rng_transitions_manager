import * as _gvExtensions from "../../c1/GcsExtensions.ts";

import type * as _gvInterfaces from "../GcProgram/Interfaces";

export class GcRngTransitionManager implements _gvInterfaces.GiProgram {
	// #region
		// Config.
			static CvRangeLengthMax: number = 4;
		// Data.
			IvElementTransitions: HTMLDivElement = null!;
			IvElementTransitionsChildren: HTMLCollection = null!;
			IvElementTransitionsSelect: HTMLInputElement = null!;
			IvElementTransitionsDeleteSelected: HTMLButtonElement = null!;
			IvElementTransitionsDeleteAll: HTMLButtonElement = null!;
			IvElementTransitionsDeleteAllConfirm: HTMLInputElement = null!;
			IvElementTransitionsConcatenated: HTMLInputElement = null!;
			IvElementTransitionsGenerateDuplicates: HTMLInputElement = null!;
			IvElementTransitionsConcatenatedCopy: HTMLButtonElement = null!;
			IvElementTransitionsConcatenatedPaste: HTMLButtonElement = null!;
			IvElementTransitionsOutcomesCopy: HTMLButtonElement = null!;
			IvElementTransitionsCopyAll: HTMLButtonElement = null!;
			IvElementTransitionsImport: HTMLButtonElement = null!;
			IvElementTransitionsGenerate: HTMLButtonElement = null!;
			IvElementTransitionsGenerateClear: HTMLButtonElement = null!;
			IvElementTransitionsOutcomes: HTMLTextAreaElement = null!;

			IvTransitionsImportRegex: RegExp = /(?: *([^,]*?) *) +(?:\d+ *- *\d+ +)?(?:\( *(\d+) *\)|\d+)(?:[^,]*,|[^,]*$)/g;

			IvDragObject: any = null!;
			IvTransitionOutcomes: Set< number > = new Set( );

			IvProgramDependencyInjected: boolean = false;
	// #endregion

	// #region
		get IpSelect( ): boolean {
			return this.IvElementTransitionsSelect.checked;
		}
		get IpTransitions( ): HTMLCollection {
			return this.IvElementTransitionsChildren;
		}
	// #endregion

	constructor( ) {
	}
	ImProgramDependencyInject( ): void {
		this.IvProgramDependencyInjected = true;
	}

	ImProgramExecute( ): void {
		this.IvElementTransitionsImport = document.getElementById( "ITransitionsImport" )! as HTMLButtonElement;
		this.IvElementTransitionsImport.addEventListener( "click", this.ImOnClick_TransitionsImport.bind( this ) );

		this.IvElementTransitions = document.getElementById( "ITransitions" )! as HTMLDivElement;
		this.IvElementTransitionsChildren = this.IvElementTransitions.children;

		this.IvElementTransitionsSelect = document.getElementById( "ITransitionsSelect" )! as HTMLInputElement;
		this.IvElementTransitionsSelect.addEventListener( "click", this.ImOnCheckbox_TransitionsSelect.bind( this ) );

		this.IvElementTransitionsDeleteSelected = document.getElementById( "ITransitionsDeleteSelected" )! as HTMLButtonElement;
		this.IvElementTransitionsDeleteSelected.addEventListener( "click", this.ImOnClick_TransitionsDeleteSelected.bind( this ) );

		this.IvElementTransitionsDeleteAllConfirm = document.getElementById( "ITransitionsDeleteAllConfirm" )! as HTMLInputElement;
		this.IvElementTransitionsDeleteAllConfirm.addEventListener( "click", this.ImOnCheckbox_TransitionsDeleteAllConfirm.bind( this ) );

		this.IvElementTransitionsDeleteAll = document.getElementById( "ITransitionsDeleteAll" )! as HTMLButtonElement;
		this.IvElementTransitionsDeleteAll.addEventListener( "click", this.ImOnClick_TransitionsDeleteAll.bind( this ) );

		this.IvElementTransitionsConcatenated = document.getElementById( "ITransitionsConcatenated" )! as HTMLInputElement;
		this.IvElementTransitionsConcatenated.addEventListener( "input", this.ImOnInput_TransitionsConcatenated.bind( this ) );
	
		this.IvElementTransitionsConcatenatedCopy = document.getElementById( "ITransitionsConcatenatedCopy" )! as HTMLButtonElement;
		this.IvElementTransitionsConcatenatedCopy.addEventListener( "click", this.ImOnClick_TransitionsConcatenatedCopy.bind( this ) );
	
		this.IvElementTransitionsConcatenatedPaste = document.getElementById( "ITransitionsConcatenatedPaste" )! as HTMLButtonElement;
		this.IvElementTransitionsConcatenatedPaste.addEventListener( "click", this.ImOnClick_TransitionsConcatenatedPaste.bind( this ) );
	
		this.IvElementTransitionsOutcomesCopy = document.getElementById( "ITransitionsOutcomesCopy" )! as HTMLButtonElement;
		this.IvElementTransitionsOutcomesCopy.addEventListener( "click", this.ImOnClick_TransitionsOutcomesCopy.bind( this ) );
	
		this.IvElementTransitionsCopyAll = document.getElementById( "ITransitionsCopyAll" )! as HTMLButtonElement;
		this.IvElementTransitionsCopyAll.addEventListener( "click", this.ImOnClick_TransitionsCopyAll.bind( this ) );
	
		this.IvElementTransitionsGenerate = document.getElementById( "ITransitionsGenerate" )! as HTMLButtonElement;
		this.IvElementTransitionsGenerate.addEventListener( "click", this.ImOnClick_TransitionsGenerate.bind( this ) );
		
		this.IvElementTransitionsGenerateClear = document.getElementById( "ITransitionsGenerateClear" )! as HTMLButtonElement;
		this.IvElementTransitionsGenerateClear.addEventListener( "click", this.ImOnClick_TransitionsGenerateClear.bind( this ) );

		this.IvElementTransitionsOutcomes = document.getElementById( "ITransitionsOutcomes" )! as HTMLTextAreaElement;

		this.IvElementTransitionsGenerateDuplicates = document.getElementById( "ITransitionsGenerateDuplicates" )! as HTMLInputElement;

		this.ImSetStateTransitionsDeleteSelected( false );
		this.ImSetStateTransitionsDeleteAll( this.IvElementTransitionsDeleteAllConfirm.checked );
		this.ImSetStateTransitionsImport( false );
		this.ImSetStateTransitionsConcatenatedCopy( false );
		this.ImSetStateTransitionsOutcomesCopy( false );
		this.ImSetStateTransitionsCopyAll( false );

		if ( ! this.IpTransitions.length )
			this.ImInsertTransition( null, true );
	}

	ImInsertTransition( aLi: HTMLLIElement | null, aFocus: boolean, aRange: number | null = null, aText: string | null = null ): void {
		let vLi: HTMLLIElement = document.createElement( "li" );
		// vLi.classList.add( "CTransitionListItem" );

		let vCheckbox: HTMLInputElement = document.createElement( "input" );
		vCheckbox.type = "checkbox";
			vCheckbox.disabled = ! this.IpSelect;
		vCheckbox.classList.add( "CTransitionCheckbox" );
		vCheckbox.addEventListener( "click", this.ImOnCheckbox_TransitionSelect.bind( this ) );

		let vCheckboxB: HTMLSpanElement = document.createElement( "span" );
		vCheckboxB.classList.add( "CCheckbox" );

		vCheckboxB.appendChild( vCheckbox );
		vLi.appendChild( vCheckboxB );

		let vDraggable: HTMLSpanElement = document.createElement( "span" );
		vDraggable.draggable = true;
		vDraggable.classList.add( "CTransitionDraggable" );
		vDraggable.addEventListener( "dblclick", this.ImOnDoubleClick_TransitionDraggable.bind( this ) );
		vDraggable.addEventListener( "dragstart", this.ImOnDragStart_TransitionDraggable.bind( this ) );
		vDraggable.addEventListener( "dragover", this.ImOnDragOver_TransitionDraggable.bind( this ) );
		vDraggable.addEventListener( "drop", this.ImOnDrop_TransitionDraggable.bind( this ) );
		vLi.appendChild( vDraggable );

		let vRange: HTMLInputElement = document.createElement( "input" );
		vRange.type = "number";
		vRange.required = true;
		vRange.classList.add( "CTransitionRange" );
		vRange.addEventListener( "input", this.ImOnInput_TransitionRange.bind( this ) );
		vRange.addEventListener( "keyup", this.ImOnKeyUp_TransitionRange.bind( this ) );
		if ( aRange )
			vRange.valueAsNumber = aRange;
		vLi.appendChild( vRange );

		let vText: HTMLInputElement = document.createElement( "input" );
		vText.type = "text"
		vText.required = true;
		vText.classList.add( "CTransitionText" );
		vText.addEventListener( "input", this.ImOnInput_TransitionText.bind( this ) );
		vText.addEventListener( "keyup", this.ImOnKeyUp_TransitionText.bind( this ) );
		if ( aText )
			vText.value = aText;
		vLi.appendChild( vText );

		let vPercent: HTMLProgressElement = document.createElement( "progress" );
		vPercent.setAttribute( "min", "0" );
		vPercent.setAttribute( "max", "1" );
		vPercent.value = 0;
		vPercent.classList.add( "CTransitionPercent" );
		vLi.appendChild( vPercent );

		this.ImTransitionsDisplayHide( );
		this.ImUpdate( );
		this.ImTransitionsDisplayShow( );

		if ( aLi )
			aLi.after( vLi );
		else
			this.IvElementTransitions.appendChild( vLi );

		if ( aFocus )
			vRange.focus( );
	}
	ImTransitionsDisplayHide( ): void {
		this.IvElementTransitions.style.display = "none";
	}
	ImTransitionsDisplayShow( ): void {
		this.IvElementTransitions.style.display = "";
	}
	ImSetStateTransitionsDeleteSelected( aState: boolean ): void {
		this.IvElementTransitionsDeleteSelected.disabled = ! aState;
	}
	ImSetStateTransitionsConcatenatedCopy( aState: boolean ): void {
		this.IvElementTransitionsConcatenatedCopy.disabled = ! aState;
	}
	ImSetStateTransitionsOutcomesCopy( aState: boolean ): void {
		this.IvElementTransitionsOutcomesCopy.disabled = ! aState;
	}
	ImSetStateTransitionsCopyAll( aState: boolean ): void {
		this.IvElementTransitionsCopyAll.disabled = ! aState;
	}
	ImSetStateTransitionsDeleteAll( aState: boolean ): void {
		this.IvElementTransitionsDeleteAll.disabled = ! aState;
	}
	ImSetStateTransitionCheckbox( aState: boolean ): void {
		if ( aState ) {
			let vElement: any;
			for ( vElement of this.IpTransitions ) {
				((vElement.children[ 0 ] as HTMLSpanElement).children[ 0 ] as HTMLInputElement).disabled = false;
			}
		} else {
			let vElement: any;
			for ( vElement of this.IpTransitions )
				((vElement.children[ 0 ] as HTMLSpanElement).children[ 0 ] as HTMLInputElement).disabled = true;
		}
	}
	ImSetStateTransitionsImport( aState: boolean ): void {
		this.IvElementTransitionsImport.disabled = ! aState;
	}
	ImUpdate( ): void {
		let vTexts = [ ],
			vValueLength = 0,
			vElementInputRange: HTMLInputElement,
			vElementInputText: HTMLInputElement,
			vElement: any,
			vRangeTotal: number = 1,
			vRangeTotalNext: number = 0,
			vErrorRange = false,
			vErrorText = false;

		for ( vElement of this.IpTransitions ) {
			vElementInputRange = vElement.children[ 2 ] as HTMLInputElement;
			vElementInputText = (vElement as HTMLLIElement).children[ 3 ] as HTMLInputElement;

			if ( ! vErrorRange ) {
				if ( vElementInputRange.validity.valid )
					vRangeTotalNext += vElementInputRange.valueAsNumber;
				else
					vErrorRange = true;

				if ( ! vErrorText ) {
					if ( vElementInputText.validity.valid ) {
						if ( vRangeTotalNext - vRangeTotal === 0 )
							vTexts.push( vElementInputText.value + " " + vRangeTotal );
						else
							vTexts.push( vElementInputText.value + " " + vRangeTotal + "-" + vRangeTotalNext + " (" + ( vRangeTotalNext - vRangeTotal + 1) + ")" );
					} else
						vErrorText = true;
				}

				vRangeTotal = vRangeTotalNext + 1;
			}

			if ( vValueLength < vElementInputText.value.length )
				vValueLength = vElementInputText.value.length;
		}

		for ( vElement of this.IpTransitions ) {
			if ( vErrorRange )
				( vElement.children[ 4 ] as HTMLProgressElement ).value = 0;
			else
				( vElement.children[ 4 ] as HTMLProgressElement ).value = ( (vElement.children[ 2 ] as HTMLInputElement)).valueAsNumber / vRangeTotalNext;

			((vElement as HTMLLIElement).children[ 3 ] as HTMLInputElement).style.width = vValueLength + "ch";
		}

		this.ImSetStateTransitionsImport( false );
		this.IvElementTransitionsDeleteAllConfirm.checked = false;
		this.ImSetStateTransitionsDeleteAll( false );

		if ( vErrorRange
				|| vErrorText )
			this.IvElementTransitionsConcatenated.value = "";
		else
			this.IvElementTransitionsConcatenated.value = vTexts.join( ", " );

		this.ImClearOutcomes( );

		this.ImSetStateTransitionsConcatenatedCopy( this.IvElementTransitionsConcatenated.value.length !== 0 );
		this.ImSetStateTransitionsOutcomesCopy( false );
		this.ImSetStateTransitionsCopyAll( false );
	}
	ImClearOutcomes( ): void {
		this.IvElementTransitionsOutcomes.value = "";
		this.ImSetStateTransitionsOutcomesCopy( false );
		this.ImSetStateTransitionsCopyAll( false );
		if ( this.IvTransitionOutcomes.size )
			this.IvTransitionOutcomes.clear( );
	}

	ImOnDoubleClick_TransitionDraggable( aE: MouseEvent ): void {
		this.ImTransitionsDisplayHide( );
		this.ImInsertTransition( (aE.target as HTMLSpanElement).parentElement as HTMLLIElement, true );
		this.ImUpdate( );
		this.ImTransitionsDisplayShow( );
	}
	ImOnCheckbox_TransitionsSelect( aE: InputEvent | MouseEvent ): void {
		this.ImTransitionsDisplayHide( );
		this.ImSetStateTransitionCheckbox( (aE.target as HTMLInputElement).checked );
		this.ImTransitionsDisplayShow( );
	}
	ImOnCheckbox_TransitionsDeleteAllConfirm( aE: InputEvent | MouseEvent ): void {
		this.ImSetStateTransitionsDeleteAll( (aE.target as HTMLInputElement).checked );
	}
	ImOnCheckbox_TransitionSelect( aE: InputEvent | MouseEvent ): void {
		if ( ! this.IpSelect )
			return;

		let vElement: any;
		for ( vElement of this.IpTransitions )
			if ( (((vElement as HTMLLIElement).children[ 0 ] as HTMLSpanElement).children[ 0 ] as HTMLInputElement).checked ) {
				this.ImSetStateTransitionsDeleteSelected( true );
				return;
			}

		this.ImSetStateTransitionsDeleteSelected( false );
	}
	ImOnClick_TransitionsDeleteSelected( aE: MouseEvent ): void {
		if ( ! this.IpSelect )
			return;
		let vTransitions: Array< HTMLLIElement > = [ ],
			vElement: any;
		for ( vElement of this.IpTransitions ) {
			if ( ((vElement.children[ 0 ] as HTMLSpanElement).children[ 0 ] as HTMLInputElement).checked )
				vTransitions.push( vElement );
		}

		this.ImTransitionsDisplayHide( );

		for ( vElement of vTransitions )
			vElement.remove( );

		if ( ! this.IpTransitions.length )
			this.ImInsertTransition( null, true );

		this.ImUpdate( );
		this.ImSetStateTransitionsDeleteSelected( false );

		this.ImTransitionsDisplayShow( );
	}
	ImOnClick_TransitionsDeleteAll( aE: MouseEvent ): void {
		this.ImSetStateTransitionsImport( false );

		this.ImTransitionsDisplayHide( );

		this.IvElementTransitions.replaceChildren( );

		if ( ! this.IpTransitions.length )
			this.ImInsertTransition( null, true );

		this.ImUpdate( );
		this.ImSetStateTransitionsDeleteSelected( false );
		this.ImTransitionsDisplayShow( );
	}
	ImOnDragStart_TransitionDraggable( aE: DragEvent ): void {
		this.IvDragObject = aE.target;
	}
	ImOnDragOver_TransitionDraggable( aE: DragEvent ): void {
		if ( ! this.IvDragObject )
			return;
		if ( this.IvDragObject !== aE.target )
			aE.preventDefault( );
	}
	ImOnDrop_TransitionDraggable( aE: DragEvent ): void {
		if ( ! this.IvDragObject )
			return;
		if ( this.IvDragObject !== aE.target )
			aE.preventDefault( );
		let vLiA = ((this.IvDragObject as HTMLSpanElement).parentElement as HTMLLIElement),
			vLiB = ((aE.target as HTMLSpanElement).parentElement as HTMLLIElement);
		this.ImTransitionsDisplayHide( );
		if ( _gvExtensions.GcsExtensions.CmElementBefore( vLiA, vLiB ) )
			vLiB.after( vLiA );
		else
			vLiB.before( vLiA );
		this.ImUpdate( );
		this.ImTransitionsDisplayShow( );
	}
	ImOnInput_TransitionRange( aE: Event ): void {
		let vElementInput = aE.target as HTMLInputElement;
		
		if ( vElementInput.validity.valid
				&& ( vElementInput.value.length > GcRngTransitionManager.CvRangeLengthMax ) )
			vElementInput.value = vElementInput.value.substring( 0, GcRngTransitionManager.CvRangeLengthMax )
		this.ImTransitionsDisplayHide( );
		this.ImUpdate( );
		this.ImTransitionsDisplayShow( );
	}
	ImOnKeyUp_TransitionRange( aE: KeyboardEvent ): void {
		if ( aE.key === "Enter" ) {
			aE.preventDefault( );
			this.ImTransitionsDisplayHide( );
			this.ImInsertTransition( (aE.target as HTMLInputElement).parentElement as HTMLLIElement, true );
			this.ImUpdate( );
			this.ImTransitionsDisplayShow( );
		}
	}
	ImOnKeyUp_TransitionText( aE: KeyboardEvent ): void {
		if ( aE.key === "Enter" ) {
			aE.preventDefault( );
			this.ImTransitionsDisplayHide( );
			this.ImInsertTransition( (aE.target as HTMLInputElement).parentElement as HTMLLIElement, true );
			this.ImUpdate( );
			this.ImTransitionsDisplayShow( );
		}
	}
	ImOnInput_TransitionText( aE: Event ): void {
		this.ImTransitionsDisplayHide( );
		this.ImUpdate( );
		this.ImTransitionsDisplayShow( );
	}
	ImOnClick_TransitionsImport( aE: MouseEvent ): void {
		this.ImSetStateTransitionsImport( false );

		this.IvTransitionsImportRegex.lastIndex = 0;

		this.ImTransitionsDisplayHide( );

		this.IvElementTransitions.replaceChildren( );

		let vText = this.IvElementTransitionsConcatenated.value,
			vMatch: RegExpExecArray | null = this.IvTransitionsImportRegex.exec( vText );

		while ( vMatch !== null ) {
			if ( vMatch[ 2 ] )
				this.ImInsertTransition( null, false, parseInt( vMatch[ 2 ] ), vMatch[ 1 ] );
			else
				this.ImInsertTransition( null, false, 1, vMatch[ 1 ] );
			vMatch = this.IvTransitionsImportRegex.exec( vText );
		}

		if ( ! this.IpTransitions.length )
			this.ImInsertTransition( null, true );

		this.ImUpdate( );
		this.ImTransitionsDisplayShow( );
	}
	ImOnInput_TransitionsConcatenated( aE: Event ): void {
		let vLength = this.IvElementTransitionsConcatenated.value.length;
		this.ImSetStateTransitionsImport( vLength !== 0 );
		this.ImSetStateTransitionsConcatenatedCopy( vLength !== 0 );
	}
	ImOnClick_TransitionsGenerate( aE: Event ): void {
		let vElementInputRange: HTMLInputElement,
			vElementInputText: HTMLInputElement,
			vElement: any,
			vRangeTotal: number = 0,
			vRangeTotalB: number,
			vRangeTotalBNext: number,
			vErrorRange: boolean = false,
			vErrorText: boolean = false,
			vOutcome: number = 0,
			vCount: number = 0,
			vDuplicates: boolean = this.IvElementTransitionsGenerateDuplicates.checked;

		for ( vElement of this.IpTransitions ) {
			vElementInputRange = vElement.children[ 2 ] as HTMLInputElement;
			vElementInputText = (vElement as HTMLLIElement).children[ 3 ] as HTMLInputElement;

			if ( ! vErrorRange ) {
				if ( vElementInputRange.validity.valid ) {
					vRangeTotal += vElementInputRange.valueAsNumber;
					vCount++;
				} else
					vErrorRange = true;

				if ( ! vErrorText ) {
					if ( ! vElementInputText.validity.valid )
						vErrorText = true;
				}
			}
		}

		if ( vErrorRange
				|| vErrorText ) {
			this.ImClearOutcomes( );
			return;
		}

		if ( vCount )
			while ( true ) {
				vOutcome = _gvExtensions.GcsExtensions.CmGetRandomIntInclusive( 1, vRangeTotal );

				vRangeTotalB = 1;
				vRangeTotalBNext = 0;

				for ( vElement of this.IpTransitions ) {
					vElementInputRange = vElement.children[ 2 ] as HTMLInputElement;
					vRangeTotalBNext += vElementInputRange.valueAsNumber;

					if ( ( vRangeTotalB <= vOutcome )
							&& ( vOutcome <= vRangeTotalBNext ) ) {
						if ( !vDuplicates ) {
							if ( this.IvTransitionOutcomes.has( vRangeTotalB ) )
								break;
							else
								this.IvTransitionOutcomes.add( vRangeTotalB );
						}
						if ( this.IvElementTransitionsOutcomes.value?.length )
							this.IvElementTransitionsOutcomes.value += ", " + vOutcome.toString( ) + " " + (vElement.children[ 3 ] as HTMLInputElement).value;
						else
							this.IvElementTransitionsOutcomes.value = vOutcome.toString( ) + " " + (vElement.children[ 3 ] as HTMLInputElement).value;
						this.ImSetStateTransitionsOutcomesCopy( true );
						this.ImSetStateTransitionsCopyAll( this.IvElementTransitionsConcatenated.value.length !== 0 );
						return;
					}
					vRangeTotalB = vRangeTotalBNext + 1;
				}
				if ( this.IvTransitionOutcomes.size >= vCount )
					return;
			}

		this.ImClearOutcomes( );
	}
	ImOnClick_TransitionsGenerateClear( aE: Event ): void {
		this.ImClearOutcomes( );
	}
	ImOnClick_TransitionsConcatenatedCopy( aE: Event ): void {
		navigator.clipboard.writeText( this.IvElementTransitionsConcatenated.value );
	}
	ImOnClick_TransitionsConcatenatedPaste( aE: Event ): void {
		navigator.clipboard.readText( ).then( ( aValue: string ) => {
			this.IvElementTransitionsConcatenated.value = aValue;
			this.ImSetStateTransitionsConcatenatedCopy( this.IvElementTransitionsConcatenated.value.length !== 0 );
		} );
	}
	ImOnClick_TransitionsOutcomesCopy( aE: Event ): void {
		navigator.clipboard.writeText( this.IvElementTransitionsOutcomes.value );
	}
	ImOnClick_TransitionsCopyAll( aE: Event ): void {
		navigator.clipboard.writeText( this.IvElementTransitionsConcatenated.value + "\n" + this.IvElementTransitionsOutcomes.value );
	}
}
