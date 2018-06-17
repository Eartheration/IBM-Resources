define( function() {
"use strict";

function C_CollapseButton()
{
};

C_CollapseButton.prototype.initialize = function( oControlHost, fnDoneInitializing )
{
	var o = oControlHost.configuration;
	this.m_sBlockName = o ? o["Block name"] : "Block1";
	this.m_bCollapsed = Boolean( o && o.Collapsed );
	if ( o )
	{
		this.m_sWidth = o.Width;
		this.m_sHeight = o.Height;
	}
	fnDoneInitializing();
};

C_CollapseButton.prototype.draw = function( oControlHost )
{
	var elContainer = oControlHost.container;
	elContainer.innerHTML = 
		'<style>' +
			'.myCollapseButton { background-color:#EAEAEA; color:#B1B6BA; font-size:24px; padding:0px 6px 0px 6px; border:1px solid #B1B6BA; }' +
			'.myCollapseButton:hover { background-color:#6793CB; color:#EAEAEA; border:1px solid #EAEAEA; }' +
		'</style>' +
		'<button class="myCollapseButton"></button>';
	this.m_btn = elContainer.lastChild;
	this.m_btn.onclick = this.onClick.bind( this, oControlHost );
	this.updateButton( oControlHost );
};

C_CollapseButton.prototype.onClick = function( oControlHost )
{
	var oControl = oControlHost.page.getControlByName( this.m_sBlockName );
	if ( this.m_sWidth )
	{
		oControl.setWidth( this.m_bCollapsed ? this.m_sWidth : "0px", true );
	}
	if ( this.m_sHeight )
	{
		oControl.setHeight( this.m_bCollapsed ? this.m_sHeight : "0px", true );
	}
	this.m_bCollapsed = !this.m_bCollapsed;
	this.updateButton( oControlHost );
};

C_CollapseButton.prototype.updateButton = function( oControlHost )
{
	this.m_btn.innerHTML = this.m_bCollapsed ? '&#9654;' : '&#9664;';
	this.m_btn.title = this.m_bCollapsed ? 'Show' : 'Hide';
};

return C_CollapseButton;
});
