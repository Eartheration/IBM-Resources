define( ["https://www.gstatic.com/charts/loader.js"], function() {
"use strict";

function Control()
{
};

Control.prototype.initialize = function( oControlHost, fnDoneInitializing )
{
	this.m_oControlHost = oControlHost;
	this.m_sChartType = this.getConfigurationValue( "Chart type", "bar" );
	fnDoneInitializing();
};

Control.prototype.destroy = function( oControlHost )
{
	this.m_oControlHost = null;
};

Control.prototype.getConfigurationValue = function( sName, sDefaultValue )
{
	var o = this.m_oControlHost.configuration;
	return ( o && ( o[sName] !== undefined ) ) ? o[sName] : sDefaultValue;
};

Control.prototype.draw = function( oControlHost )
{
	var oPackages = ( this.m_sChartType == "orgchart" ) ? ["orgchart"] : ["corechart", "bar"];
	google.charts.load( "current", { packages : oPackages } );
	google.charts.setOnLoadCallback( this.drawChart.bind( this ) );
};

Control.prototype.drawChart = function()
{
	switch ( this.m_sChartType )
	{
		case "bar":
			this.drawBarChart();
			break;

		case "orgchart":
			this.drawOrgChart();
			break;
	}
};

Control.prototype.drawBarChart = function()
{
	this.m_oGoogleDataTable = this.createPivotedGoogleDataTableFromDataStore( this.m_oDataStore );
	var oChart = new google.charts.Bar( this.m_oControlHost.container );
	var oOptions =
	{
		width : this.getConfigurationValue( "Width", 500 ),
		height : this.getConfigurationValue( "Height", 350 ),
		bars : this.getConfigurationValue( "Horizontal", true ) ? "horizontal" : "vertical"
	};
	oChart.draw( this.m_oGoogleDataTable, oOptions );
};

Control.prototype.drawOrgChart = function()
{
	this.m_oGoogleDataTable = this.createGoogleDataTableFromDataStore( this.m_oDataStore );
	if ( this.m_oDataStore.columnCount == 3 )
	{
		this.insertOrgChartColumnIntoDataTable( this.m_oDataStore, 2, this.m_oGoogleDataTable );
	}
	var oChart = new google.visualization.OrgChart( this.m_oControlHost.container );
	var oOptions =
	{
		allowHtml : true,
		color : "#E8E9EA",
		size : "large"
	};
	oChart.draw( this.m_oGoogleDataTable, oOptions );
};

Control.prototype.setData = function( oControlHost, oDataStore )
{
	this.m_oDataStore = oDataStore;
};

Control.prototype.insertOrgChartColumnIntoDataTable = function( oDataStore, iColumnToInsert, oDataTable )
{
	var iColCount = oDataTable.getNumberOfColumns();
	var iRowCount = oDataTable.getNumberOfRows();
	for ( var iRow = 0; iRow < iRowCount; iRow++ )
	{
		for ( var iCol = 0; iCol < iColCount; iCol++ )
		{
			var sValue = oDataTable.getValue( iRow, iCol );
			var sHtml = '<div style="color:#4178BE; font-size:10pt;">' + this.HTMLEncode( oDataStore.getCellValue( iRow, iColumnToInsert ) ) + '</div>';
			oDataTable.setFormattedValue( iRow, iCol, sValue + sHtml );
		}
	}
};

Control.prototype.createGoogleDataTableFromDataStore = function( oDataStore )
{
	var iColCount = oDataStore.columnCount;
	var iRowCount = oDataStore.rowCount;
	var oDataTable = new google.visualization.DataTable();
	for ( var iCol = 0; iCol < iColCount; iCol++ )
	{
		oDataTable.addColumn( oDataStore.dataTypes[iCol], oDataStore.columnNames[iCol] );
	}
	oDataTable.addRows( iRowCount );
	for ( var iRow = 0; iRow < iRowCount; iRow++ )
	{
		for ( var iCol = 0; iCol < iColCount; iCol++ )
		{
			oDataTable.setCell( iRow, iCol, oDataStore.getCellValue( iRow, iCol ) );
		}
	}
	return oDataTable;
};

Control.prototype.createPivotedGoogleDataTableFromDataStore = function( oDataStore, iDsCategoriesColumn, iDsSeriesColumn, iDsValuesColumn )
{
	if ( iDsCategoriesColumn === undefined )
	{
		iDsCategoriesColumn = 0;
	}
	if ( iDsSeriesColumn === undefined )
	{
		iDsSeriesColumn = ( oDataStore.columnCount > 2 ) ? oDataStore.columnCount - 2 : NaN;
	}
	if ( iDsValuesColumn === undefined )
	{
		iDsValuesColumn = oDataStore.columnCount - 1;
	}
	var aCategoriesValues = oDataStore.columnValues[iDsCategoriesColumn];
	var aSeriesValues = isNaN( iDsSeriesColumn ) ? null : oDataStore.columnValues[iDsSeriesColumn];

	// Sort categories
	var iCategoriesValuesLength = aCategoriesValues.length;
	var aSortedCategoryNumbers = new Array( iCategoriesValuesLength );
	for ( var i = 0; i < iCategoriesValuesLength; i++ )
	{
		aSortedCategoryNumbers[i] = i;
	}
	aSortedCategoryNumbers.sort( this.getFnSortCategoryByString( true, aCategoriesValues ) );
	var v_aSortedCategoryLookup = [];
	for ( var i = 0; i < iCategoriesValuesLength; i++ )
	{
		v_aSortedCategoryLookup[aSortedCategoryNumbers[i]] = i;
	}

	// Sort series
	if ( aSeriesValues )
	{
		var iSeriesValuesLength = aSeriesValues.length;
		var aSortedSeriesNumbers = new Array( iSeriesValuesLength );
		for ( var i = 0; i < iSeriesValuesLength; i++ )
		{
			aSortedSeriesNumbers[i] = i;
		}
		aSortedSeriesNumbers.sort( this.getFnSortCategoryByString( true, aSeriesValues ) );
		var v_aSortedSeriesLookup = [];
		for ( var i = 0; i < iSeriesValuesLength; i++ )
		{
			v_aSortedSeriesLookup[aSortedSeriesNumbers[i]] = i;
		}
	}

	var oDataTable = new google.visualization.DataTable();
	oDataTable.addRows( aCategoriesValues.length );

	// Add category column
	oDataTable.addColumn( oDataStore.dataTypes[iDsCategoriesColumn], oDataStore.columnNames[iDsCategoriesColumn] );
	for ( var i = 0; i < aCategoriesValues.length; i++ )
	{
		oDataTable.setCell( v_aSortedCategoryLookup[i], 0, aCategoriesValues[i] );
	}

	// Add series columns
	if ( aSeriesValues )
	{
		for ( var i = 0; i < aSeriesValues.length; i++ )
		{
			var sValue = aSeriesValues[aSortedSeriesNumbers[i]];
			oDataTable.addColumn( oDataStore.dataTypes[iDsValuesColumn], sValue );
		}
	}
	else
	{
		oDataTable.addColumn( oDataStore.dataTypes[iDsValuesColumn], oDataStore.columnNames[iDsValuesColumn] );
	}

	var iRowCount = oDataStore.rowCount;
	for ( var iRow = 0; iRow < iRowCount; iRow++ )
	{
		var oCategoryCell = oDataStore.getCell( iRow, iDsCategoriesColumn );
		var iCategoryValueIndex = v_aSortedCategoryLookup[oCategoryCell.valueIndex];
		var iSeriesValueIndex = aSeriesValues ? v_aSortedSeriesLookup[oDataStore.getCell( iRow, iDsSeriesColumn ).valueIndex] : 0;
		oDataTable.setCell( iCategoryValueIndex, iSeriesValueIndex + 1, oDataStore.getCellValue( iRow, iDsValuesColumn ) );
	}
	return oDataTable;
};

Control.prototype.getFnSortCategoryByString = function( v_bAscending, v_aCategories )
{
	if ( v_bAscending )
	{
		return function(i1, i2)
		{
			var s1 = v_aCategories[i1];
			var s2 = v_aCategories[i2];

			var i;
			if (s1 && s2)
			{
				i = s1.localeCompare(s2);
			}
			else if (s1)
			{
				i = 1;
			}
			else if (s2)
			{
				i = -1;
			}
			else
			{
				i = 0;
			}
			return ( i == 0 ) ? ( i1 - i2 ) : i;
		};
	}
	return function(i1, i2)
	{
		var s1 = v_aCategories[i1];
		var s2 = v_aCategories[i2];

		var i;
		if (s1 && s2)
		{
			i = s2.localeCompare(s1);
		}
		else if (s1)
		{
			i = -1;
		}
		else if (s2)
		{
			i = 1;
		}
		else
		{
			i = 0;
		}
		return ( i == 0 ) ? ( i2 - i1 ) : i;
	};
};

Control.prototype.HTMLEncode = function( s )
{
	return String( s ).replace( /&/g, "&amp;" ).replace( /</g, "&lt;" ).replace( />/g, "&gt;" );
};

return Control;
});
