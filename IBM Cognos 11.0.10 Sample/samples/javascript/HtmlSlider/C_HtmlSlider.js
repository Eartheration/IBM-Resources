define( ["text!./HtmlSlider.css"], function( sCSS ) {
"use strict";

function C_HtmlSlider()
{
};

C_HtmlSlider.prototype.draw = function( oControlHost )
{
	var sValueTextItem = oControlHost.configuration ? oControlHost.configuration["Value text item"] : "";
	this.m_oValueTextItem = sValueTextItem ? oControlHost.page.getControlByName( sValueTextItem ) : null;
	this.m_sParameter = oControlHost.configuration ? oControlHost.configuration.Parameter : "pMin";
	var sRangeType = ( oControlHost.configuration ? oControlHost.configuration["Range type"] : "" ) || "min";
	var oParameter = oControlHost.getParameter( this.m_sParameter );
	var sParameterValue = ( oParameter && ( oParameter.values.length > 0 ) ) ? oParameter.values[0].use : ( ( sRangeType == "min" ) ? this.m_max : this.m_min ) || 0;
	var sHtml = '<style>' + sCSS + '</style>';
	sHtml += '<input class="clsHtmlSlider" type="range" min="' + ( this.m_min || 0 ) + '" max="' + ( this.m_max || 100 ) + '" value="' +  sParameterValue  + '" rangeType="' + sRangeType + '"/>';
	var el = oControlHost.container;
	el.innerHTML = sHtml;
	this.m_input = el.querySelector( "input" );
	this.onChange( oControlHost );
	this.m_input.onchange = this.onChange.bind( this, oControlHost, false );
	this.m_input.onmouseup = this.onMouseUp.bind( this, oControlHost, true );
};

C_HtmlSlider.prototype.onChange = function( oControlHost, bAutoSubmit )
{
	oControlHost.valueChanged();
	if ( this.m_oValueTextItem )
	{
		this.m_oValueTextItem.text = this.m_input.value;
	}
	if ( bAutoSubmit )
	{
		oControlHost.next();
	}
};

C_HtmlSlider.prototype.onMouseUp = function( oControlHost, bAutoSubmit )
{
	this.onChange( oControlHost, bAutoSubmit );
};

C_HtmlSlider.prototype.setData = function( oControlHost, oDataStore )
{
	this.m_min = oDataStore.getCellValue( 0, 0 );
	this.m_max = oDataStore.getCellValue( 0, 1 );
};

C_HtmlSlider.prototype.getParameters = function()
{
	var sValue = this.m_input.value;
	return [{
		"parameter": this.m_sParameter,
		"values": [{ "use" : sValue }]
	}];
};

return C_HtmlSlider;
});
