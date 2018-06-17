define( function() {
"use strict";

function C_PromptApiButtons()
{
};

C_PromptApiButtons.prototype.draw = function( oControlHost )
{
	this.m_sName = oControlHost.configuration.name || "ListBox1";
	var el = oControlHost.container;
	el.innerHTML =
		'<style>' +
			'.myButton { margin-right:8px; color:#6793CB; font-size:24px; padding:6px 12px 6px 12px; background-color:white; border:1px solid #6793CB; }' +
			'.myButton:hover { background-color:#6793CB; color:white; border:1px solid #6793CB; }' +
		'</style>' +
		'<button class="myButton btnGetValues" type="button">getValues</button>' +
		'<button class="myButton btnGetAllValues" type="button">getValues(true)</button>' +
		'<button class="myButton btnClearValues" type="button">clearValues</button>' +
		'<button class="myButton btnSetValues" type="button">setValues</button>' +
		'<button class="myButton btnAddValues" type="button">addValues</button>';
	el.querySelector( "*[class*='btnGetValues']" ).onclick = this.f_onGetValuesClick.bind( this, oControlHost, false );
	el.querySelector( "*[class*='btnGetAllValues']" ).onclick = this.f_onGetValuesClick.bind( this, oControlHost, true );
	el.querySelector( "*[class*='btnClearValues']" ).onclick = this.f_onClearValuesClick.bind( this, oControlHost );
	el.querySelector( "*[class*='btnSetValues']" ).onclick = this.f_onSetValuesClick.bind( this, oControlHost );
	el.querySelector( "*[class*='btnAddValues']" ).onclick = this.f_onAddValuesClick.bind( this, oControlHost );
};

C_PromptApiButtons.prototype.f_onGetValuesClick = function( oControlHost, v_bAllOptions )
{
	var oControl = oControlHost.page.getControlByName( this.m_sName );
	var v_aValues = oControl.getValues( v_bAllOptions );
	var oTextItem = oControlHost.page.getControlByName( "txtParameterVales" );
	oTextItem.setColor( "black" );
	oTextItem.text = JSON.stringify( v_aValues );
};

C_PromptApiButtons.prototype.f_onClearValuesClick = function( oControlHost )
{
	oControlHost.page.getControlByName( this.m_sName ).clearValues();
};

C_PromptApiButtons.prototype.f_onSetValuesClick = function( oControlHost )
{
	var oControl = oControlHost.page.getControlByName( this.m_sName );
	var oValues = oControl.getValues();
	if ( oValues && oValues[0] )
	{
		oControl.setValues( [oValues[0]] );
	}
};

C_PromptApiButtons.prototype.f_onAddValuesClick = function( oControlHost )
{
	var oControl = oControlHost.page.getControlByName( this.m_sName );
	var oValues = oControl.getValues( true );
	if ( oValues && oValues[0] )
	{
		oControl.addValues( [oValues[0]] );
	}
};

return C_PromptApiButtons;
});
