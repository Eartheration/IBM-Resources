define( function() {
"use strict";

function SaveAsCsv()
{
};

SaveAsCsv.prototype.draw = function( oControlHost )
{
	oControlHost.container.innerHTML = '<button>Save CSV</button>';
	oControlHost.container.firstChild.onclick = this.doSave.bind( this, oControlHost );
};

SaveAsCsv.prototype.doSave = function( oControlHost )
{
	var bIsIE = ( ( ( navigator.userAgent.toLowerCase().search(/trident\/([0-9]+\.[0-9]+)/) != -1 ) ? parseFloat( RegExp.$1 ) : 0 ) >= 7.0 );
	if ( bIsIE )
	{
		alert( "This example does not support IE" );
		return;
	}

	var o = oControlHost.configuration;
	var oControl = ( o && o["Control name"] ) ? oControlHost.page.getControlByName( o["Control name"] ) : oControlHost.control;
	var oDataStore = ( o && o["Data store name"] ) ? [oControl.getDataStore( o["Data store name"] )] : oControl.dataStores[0];
	var sFileName = ( o ? o["File name"] : "" ) || "FileName";
	if ( !sFileName.match( /\.csv$/i ) )
	{
		sFileName += ".csv";
	}

	var elAnchor = document.createElement( "A" );
	elAnchor.style.display = "none";
	elAnchor.download = sFileName;
	elAnchor.href = "data:text/csv," + encodeURIComponent( this.f_getDataStoreAsCsv( oDataStore ) );
	document.body.appendChild( elAnchor );
	elAnchor.click();
	elAnchor.parentNode.removeChild( elAnchor );
};

SaveAsCsv.prototype.f_getDataStoreAsCsv = function( oDataStore )
{
	var a = [];
	var aNames = oDataStore.columnNames;
	var iColumnsCount = aNames.length;
	for ( var i = 0; i < iColumnsCount; i++ )
	{
		if ( i > 0 )
		{
			a.push( "," );
		}
		this.pushCsvField( a, aNames[i] );
	}
	a.push( "\r\n" );
	var iRowCount = oDataStore.rowCount;
	for ( var iRow = 0; iRow < iRowCount; iRow++ )
	{
		for ( var iColumn = 0; iColumn < iColumnsCount; iColumn++ )
		{
			if ( iColumn > 0 )
			{
				a.push( "," );
			}
			this.pushCsvField( a, oDataStore.getCellValue( iRow, iColumn ) );
		}
		a.push( "\r\n" );
	}
	return a.join( "" );
};

SaveAsCsv.prototype.pushCsvField = function( a, sValue )
{
	if ( typeof sValue != "string" )
	{
		a.push( sValue );
		return;
	}
	a.push( '"' + ( ( sValue.indexOf( '"' ) == -1 ) ? sValue : sValue.replace( /"/g, '""' ) ) + '"' );
};

return SaveAsCsv;
});
