define( function() {
"use strict";
return function( re, aValues )
{
	var iLength = aValues.length;
	for ( var i = 0; i < iLength; i++ )
	{
		var s = aValues[i].use;
		if ( !s || !s.match( re ) )
		{
			return false;
		}
	}
	return iLength > 0;
}
});