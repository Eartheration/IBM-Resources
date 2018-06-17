define( ["../PromptValidators/regexValidator.js"], function( fnRegexValidator ) {
"use strict";

function C_Control()
{
};

C_Control.prototype.initialize = function( oControlHost, fnDoneInitializing )
{
	var o = oControlHost.configuration;
	if ( !o || !o["Control names"] || !o["Regular expression"] )
	{
		fnDoneInitializing();
		throw new scriptableReportError( "RegexValidatorControl", "initialize", 'Expected "Control names" and "Regular expression" in configuration.' );
	}

	var fn = new Function( "return " + o["Regular expression"] );
	var re = fn();
	var fnValidator = fnRegexValidator.bind( null, re );
	var aNames = o["Control names"];
	for ( var i = 0; i < aNames.length; i++ )
	{
		var aControls = oControlHost.page.getControlsByName( aNames[i] );
		for ( var j = 0; j < aControls.length; j++ )
		{
			aControls[j].setValidator( fnValidator );
		}
	}

	fnDoneInitializing();
};

return C_Control;
});
