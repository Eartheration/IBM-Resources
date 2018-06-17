define( ["http://d3js.org/d3.v3.min.js"], function( d3 ) {
"use strict";

function D3BarChart()
{
};

D3BarChart.prototype.draw = function( oControlHost )
{
	var o = oControlHost.configuration;
	var iWidth = ( o && o.Width ) ? o.Width : 500;
	var iHeight = ( o && o.Height ) ? o.Height : 16;
	var sBackgroundColor = ( o && o["Background color"] ) ? o["Background color"] : "#C8F08F";

	var fnScale = d3.scale.linear()
		.domain( [0, d3.max( this.m_aData )] )
		.range( [0, iWidth] );

	d3.select( oControlHost.container )
	.selectAll( "div" )
	.data( this.m_aData )
	.enter().append( "div" )
	.style( "width", function( d ) { return fnScale( d ) + "px"; } )
	.style( "background-color", sBackgroundColor )
	.style( "border", "1px solid gray" )
	.style( "margin", "4px 0px 4px 0px")
	.style( "height", iHeight + "px" )
	.style( "line-height", iHeight + "px" )
	.text( function( d ) { return d; } );
};

D3BarChart.prototype.setData = function( oControlHost, oDataStore )
{
	this.m_oDataStore = oDataStore;
	this.m_aData = [];
	var iRowCount = oDataStore.rowCount;
	for ( var iRow = 0; iRow < iRowCount; iRow++ )
	{
		this.m_aData.push( oDataStore.getCellValue( iRow, 1 ) );
	}
};

return D3BarChart;
});
