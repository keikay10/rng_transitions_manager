import * as _gvRngTransitionManager from "../GcRngTransitionManager/GcRngTransitionManager.ts";

import * as _gvEnums from "./Enums.ts";
import type * as _gvInterfaces from "./Interfaces.ts";

export class GcProgram implements _gvInterfaces.GiProgram {
	// #region
		_IvGcRngTransitionManager = new _gvRngTransitionManager.GcRngTransitionManager( );
		// Config.
		// Data.
			IvDependencies: _gvInterfaces.GiProgram[ ] = [
				this._IvGcRngTransitionManager
			];

			IvProgramDependencyInjected: boolean = false;
	// #endregion

	constructor( ) {
	}
	ImProgramDependencyInject( ): void {
		this._IvGcRngTransitionManager.ImProgramDependencyInject(  );

		let vDependency: _gvInterfaces.GiProgram;
		for ( vDependency of this.IvDependencies )
			if ( ! vDependency.IvProgramDependencyInjected )
				throw new Error( _gvEnums.GeErrors.DependencyNotInjected );

		this.IvProgramDependencyInjected = true;
	}

	ImProgramExecute( ): void {
		this.ImProgramDependencyInject( );

		this._IvGcRngTransitionManager.ImProgramExecute( );
	}
}
