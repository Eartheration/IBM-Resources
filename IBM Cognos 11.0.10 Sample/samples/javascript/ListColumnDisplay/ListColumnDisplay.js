define( function() {
"use strict";

function C_ListColumnDisplay()
{
};

C_ListColumnDisplay.prototype.draw = function( oControlHost )
{
	var o = oControlHost.configuration;
	this.m_oList = oControlHost.page.getControlByName( ( o ? o.name : "" ) || "List1" );
	var el = oControlHost.container;
	el.innerHTML =
		'<style>' +
			'.myTextBox { width:160px; text-align:right; color:#6793CB; font-size:24px; padding:6px 12px 6px 12px; background-color:white; border:1px solid #6793CB; }' +
			'.myButton { margin-left:8px; color:#6793CB; font-size:24px; padding:6px 12px 6px 12px; background-color:white; border:1px solid #6793CB; }' +
			'.myButton:hover { background-color:#6793CB; color:white; border:1px solid #6793CB; }' +
		'</style>' +
		'<input class="myTextBox txt" type="text" value=""/>' +
		'<button class="myButton btnShow" type="button">Show</button>' +
		'<button class="myButton btnHide" type="button">Hide</button>';
	this.m_txt = el.querySelector( "*[class*='txt']" );
	el.querySelector( "*[class*='btnShow']" ).onclick = this.setColumnDisplay.bind( this, true );
	el.querySelector( "*[class*='btnHide']" ).onclick = this.setColumnDisplay.bind( this, false );
};

C_ListColumnDisplay.prototype.setColumnDisplay = function( bDisplay )
{
	var a = this.m_txt.value.split( "," );
	for ( var i = 0; i < a.length; i++ )
	{
		this.m_oList.setColumnDisplay( parseInt( a[i] ), bDisplay );
	}
};

return C_ListColumnDisplay;
});
