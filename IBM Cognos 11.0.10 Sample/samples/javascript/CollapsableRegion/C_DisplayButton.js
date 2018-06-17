define( function() {
"use strict";

function Control()
{
};

Control.prototype.initialize = function( oControlHost, fnDoneInitializing )
{
	this.m_oControlHost = oControlHost;
	this.m_sControlName = this.getConfigurationValue( "Control name", "Block1" );
	this.m_bVertical = this.getConfigurationValue( "Vertical", false );
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
	var elContainer = oControlHost.container;
	var sUniqueSelector = 'myDisplayButton_' + elContainer.id;
	var sBorderColor = this.getConfigurationValue( "Border color", null );
	var sHoverBackgroundColor = this.getConfigurationValue( "Hover background color", null );
	var sHoverColor = this.getConfigurationValue( "Hover foreground color", null );
	elContainer.innerHTML =
		'<style>' +
		'.' + sUniqueSelector + '\n' +
		'{' +
			'background-color:' + this.getConfigurationValue( "Background color", "transparent" ) + ';' +
			'color:' + this.getConfigurationValue( "Foreground color", "currentcolor" ) + ';' +
			'font-size:' + this.getConfigurationValue( "Font size", "inherit" ) + ';' +
			'padding:' + this.getConfigurationValue( "Padding", "0px 6px 0px 6px" ) + ';' +
			( sBorderColor ? ( 'border:1px solid ' + sBorderColor ) : 'border:0' ) + ';' +
		'}' +
		'.' + sUniqueSelector + ':hover\n' +
		'{' +
			( sHoverBackgroundColor ? ( 'background-color:' + sHoverBackgroundColor + ';' ) : '' ) +
			( sHoverColor ? ( 'color:' + sHoverColor + ';' ) : '' ) +
			( sBorderColor ? ( 'border:1px solid ' + this.getConfigurationValue( "Hover border color", "#EAEAEA" ) ) : '' ) + ';' +
		'}' +
		'</style>' +
		'<button class="' + sUniqueSelector + '"></button>';
	this.m_btn = elContainer.lastChild;
	this.m_btn.onclick = this.onClick.bind( this );
	this.updateButton();
};

Control.prototype.onClick = function()
{
	this.m_oControlHost.page.getControlByName( this.m_sControlName ).toggleDisplay();
	this.updateButton();
};

Control.prototype.updateButton = function()
{
	var b = this.m_oControlHost.page.getControlByName( this.m_sControlName ).getDisplay();
	this.m_btn.innerHTML = b ? ( this.m_bVertical ? '&#9660;' : '&#9664;' ) : ( this.m_bVertical ? '&#9650;' : '&#9654;' );
	this.m_btn.title = b ? 'Hide' : 'Show';
};

return Control;
});
