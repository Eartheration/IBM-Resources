define( function() {
"use strict";

function C_FullScreenButton()
{
};

C_FullScreenButton.prototype.draw = function( oControlHost )
{
	this.m_sControlName = oControlHost.configuration ? oControlHost.configuration.controlName : "";
	var elContainer = oControlHost.container;
	elContainer.innerHTML = 
		'<style>' +
			':-ms-fullscreen { background-color: white; }' +
			'.myFullScreenButton { background-color:transparent; padding:0px; border:none; fill:#DDDDDD; }' +
			'.myFullScreenButton:hover { cursor:pointer; fill:#B1B6BA; }' +
		'</style>' +
		'<button class="myFullScreenButton" title="' + ( this.m_sControlName ? 'Full screen' : 'Full screen report' ) + '">' +
			'<svg width="32px" height="32px" viewBox="0 0 32 32"><path d="M1,4v4v20h30V8V4H1z M29,26H3V10h26V26z"/><polygon points="18.707,21.707 25,15.414 25,20 27,20 27,12 19,12 19,14 23.586,14 17.293,20.293"/></svg>' +
		'</button>';
	this.m_btn = elContainer.lastChild;
	this.m_btn.onclick = this.onClick.bind( this, oControlHost );
};

C_FullScreenButton.prototype.onClick = function( oControlHost )
{
	var el = this.m_sControlName ? oControlHost.page.getControlByName( this.m_sControlName ).element : document.body;
	this.requestFullScreen( el );
};

C_FullScreenButton.prototype.requestFullScreen = function( el )
{
	var elFullScreenElement = document.fullScreenElement || document.msFullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
	if ( elFullScreenElement && ( elFullScreenElement == el ) )
	{
		if ( !document.cancelFullScreen )
		{
			document.cancelFullScreen = document.msExitFullscreen || document.mozCancelFullScreen || document.webkitCancelFullScreen;
		}
		document.cancelFullScreen();
	}
	else
	{
		if ( !el.requestFullscreen )
		{
			el.requestFullscreen = el.msRequestFullscreen || el.mozRequestFullScreen || el.webkitRequestFullscreen;
		}
		el.requestFullscreen();
	}
};

return C_FullScreenButton;
});
