define( function() {
"use strict";

var g_aDataStores = [];

function C_DataStoreViewer()
{
};

C_DataStoreViewer.prototype.draw = function( oControlHost )
{
	var aDataStores = g_aDataStores;
	var o = oControlHost.configuration;
	if ( o && o["Control name"] )
	{
		var oControl = oControlHost.page.getControlByName( o["Control name"] );
		aDataStores = o["Data store name"] ? [oControl.getDataStore( o["Data store name"] )] : oControl.dataStores;
	}

	var aHtml = [];
	aHtml.push( '<table style="border-spacing:2px;"><tr style="vertical-align:top;">' );
	for ( var i = 0; i < aDataStores.length; i++ )
	{
		aHtml.push( '<td>' );
		this.drawDataStore( aDataStores[i], aHtml );
		aHtml.push( '</td>' );
	}
	aHtml.push( '</tr></table>' );
	var el = oControlHost.container;
	el.innerHTML = aHtml.join( "" );
	var nl = el.querySelectorAll( ".DataStoreViewerScrollableDiv" );
	for ( var i = 0; i < nl.length; i++ )
	{
		var div = nl.item( i );
		if ( div.offsetHeight > 400 )
		{
			div.style.height = "400px";
		}
	}
};

C_DataStoreViewer.prototype.drawDataStore = function( oDataStore, aHtml )
{
	var iColCount = oDataStore.columnCount;
	var iRowCount = oDataStore.rowCount;
	aHtml.push( '<table><tr><td style="background-color:#6793CB; padding:4px;">' );
	aHtml.push( '<table style="color:#EAEAEA; font-size:14pt; width:100%">' );
	aHtml.push( '<tr><td style="width:100%;"><span style="font-weight:bold">' + ( this.F_HTMLEncode( oDataStore.name ) || 'DataStore' ) + '</span></td><td>[' + oDataStore.index + ']</td></tr>' );
	aHtml.push( '</table>' );
	aHtml.push( '<div style="padding:0px 0px 6px 6px;"><span style="font-size:10pt; vertical-align:middle; color:#CCCCCC;"> # of rows:' + iRowCount + '</span></div>' );
	aHtml.push( '<div class="DataStoreViewerScrollableDiv" style="width:100%; overflow-y:auto; overflow-x:hidden;">' );
	aHtml.push( '<table class="ls" style="border-collapse:collapse; background-color:white;">' );

	var aDataTypes = [];
	var bHasDataTypes = false;
	for ( var iCol = 0; iCol < iColCount; iCol++ )
	{
		var sDataType = oDataStore.dataTypes[iCol];
		aDataTypes.push( sDataType );
		if ( sDataType )
		{
			bHasDataTypes = true;
		}
	}
	if ( bHasDataTypes )
	{
		aHtml.push( '<tr>' );
		for ( var iCol = 0; iCol < iColCount; iCol++ )
		{
			aHtml.push( '<td class="lt" style="color:#CCCCCC; background-color:#6793CB; font-weight:bold; border-left-style:none; border-top-style:none; border-right-style:none;">' + aDataTypes[iCol] + '</td>' );
		}
		aHtml.push( '</tr>' );
	}

	aHtml.push( '<tr style="font-weight:bold;">' );
	for ( var iCol = 0; iCol < iColCount; iCol++ )
	{
		aHtml.push( '<td class="lt">' + this.F_HTMLEncode( oDataStore.columnNames[iCol] ) + '</td>' );
	}
	aHtml.push( '</tr>' );

	for ( var iRow = 0; iRow < iRowCount; iRow++ )
	{
		aHtml.push( '<tr>' );
		for ( var iCol = 0; iCol < iColCount; iCol++ )
		{
			var sValue = oDataStore.getCellValue( iRow, iCol );
			var sFormattedValue = oDataStore.getFormattedCellValue( iRow, iCol );
			var sDataType = oDataStore.dataTypes[iCol];
			aHtml.push( '<td class="' + ( ( sDataType == "number" ) ? 'lm' : 'lc' ) + '">' );
			aHtml.push( this.F_HTMLEncode( sFormattedValue ) );
			if ( sFormattedValue != sValue )
			{
				aHtml.push( ' (' + this.F_HTMLEncode( sValue ) + ')' );
			}
			aHtml.push( '</td>' );
		}
		aHtml.push( '</tr>' );
	}
	aHtml.push( '</table>' );
	aHtml.push( '</div>' );
	aHtml.push( '</td></tr></table>' );
};

C_DataStoreViewer.prototype.setData = function( oControlHost, oDataStore )
{
	g_aDataStores[oDataStore.index] = oDataStore;
};

C_DataStoreViewer.prototype.F_HTMLEncode = function( s )
{
	return String( s ).replace( /&/g, "&amp;" ).replace( /</g, "&lt;" ).replace( />/g, "&gt;" );
};

return C_DataStoreViewer;
});
