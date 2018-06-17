define( function() {
"use strict";

function C_LoadingText()
{
};

C_LoadingText.prototype.initialize = function( oControlHost, fnDoneInitializing )
{
	oControlHost.loadingText = "This is loading text set by calling setLoadingText()";
	setTimeout( fnDoneInitializing, 5000 );
};

C_LoadingText.prototype.draw = function( oControlHost )
{
	oControlHost.container.innerHTML = "Done.";
};

return C_LoadingText;
});
