define( function() {
"use strict";

return function()
{
	return {
		initialize : function( oControlHost, fnDoneInitializing )
		{
			var o = oControlHost.configuration;
			this.m_sBlockName = o ? o.blockName : "Block1";
			fnDoneInitializing();
		},

		draw : function( oControlHost )
		{
			var elContainer = oControlHost.container;
			elContainer.innerHTML = 
				'<style>' +
					'.myHideShowButton { background-color:#EAEAEA; color:#B1B6BA; font-size:24px; padding:0px 6px 0px 6px; border:1px solid #B1B6BA; }' +
					'.myHideShowButton:hover { background-color:#6793CB; color:#EAEAEA; border:1px solid #EAEAEA; }' +
				'</style>' +
				'<button class="myHideShowButton"></button>';
			this.m_btn = elContainer.lastChild;
			this.m_btn.onclick = this.onClick.bind( this, oControlHost );
			this.updateButton( oControlHost );
		},

		onClick : function( oControlHost )
		{
			oControlHost.page.getControlByName( this.m_sBlockName ).toggleDisplay();
			this.updateButton( oControlHost );
		},

		updateButton : function( oControlHost )
		{
			var b = oControlHost.page.getControlByName( this.m_sBlockName ).getDisplay();
			this.m_btn.innerHTML = b ? '&#9664;' : '&#9654;';
			this.m_btn.title = b ? 'Hide' : 'Show';
		}
	}
}

});
