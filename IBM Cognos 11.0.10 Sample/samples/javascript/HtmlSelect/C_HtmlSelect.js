define( function() {
"use strict";

function C_HtmlSelect()
{
};

C_HtmlSelect.prototype.draw = function( oControlHost )
{
	var oParameter = oControlHost.getParameter( "pl" );
	var sParameterValue = ( oParameter && ( oParameter.values.length > 0 ) ) ? oParameter.values[0].use : "";
	var sHtml = '<select size="1" style="font-size:12pt;">';
	sHtml += '<option disabled="true">(Choose a product line)</option>';
	var iRowCount = this.m_oDataStore.rowCount;
	for ( var iRow = 0; iRow < iRowCount; iRow++ )
	{
		var sValue = this.m_oDataStore.getCellValue( iRow, 0 );
		var bSelected = sParameterValue && ( sValue == sParameterValue );
		sHtml += '<option ' + ( bSelected ? ' selected="true"' : '' ) + '>' + sValue + '</option>';
	}
	sHtml += '</select>';
	var el = oControlHost.container;
	el.innerHTML = sHtml;
	this.m_sel = el.querySelector( "*" );
	if ( !sParameterValue )
	{
		this.m_sel.selectedIndex = 0;
	}
	this.f_onChange( oControlHost );
	this.m_sel.onchange = this.f_onChange.bind( this, oControlHost, true );
};

C_HtmlSelect.prototype.f_onChange = function( oControlHost, bAutoSubmit )
{
	oControlHost.valueChanged();
	if ( bAutoSubmit )
	{
		oControlHost.next();
	}
};

C_HtmlSelect.prototype.setData = function( oControlHost, oDataStore )
{
	this.m_oDataStore = oDataStore;
};

C_HtmlSelect.prototype.getParameters = function()
{
	if ( this.m_sel.selectedIndex < 1 )
	{
		return null;
	}
	var sValue = this.m_sel.options[this.m_sel.selectedIndex].value;
	return [{
		"parameter": "pl",
		"values": [{ "use" : sValue }]
	}];
};

C_HtmlSelect.prototype.isInValidState = function()
{
	return ( this.m_sel.selectedIndex > 0 );
};

return C_HtmlSelect;
});
