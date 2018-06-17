define( function() {
"use strict";

var bAlert = false;

function Control()
{
};

Control.prototype.initialize = function( oControlHost, fnDoneInitializing )
{
	this.log( "CustomControl.initialize" );
	fnDoneInitializing();
};

Control.prototype.show = function( oControlHost )
{
	this.log( "CustomControl.show" );
};

Control.prototype.hide = function( oControlHost )
{
	this.log( "CustomControl.hide" );
};

Control.prototype.draw = function( oControlHost )
{
	this.log( "CustomControl.draw" );
	oControlHost.container.innerHTML = "Hello";
};

Control.prototype.getParameters = function( oControlHost )
{
	this.log( "CustomControl.getParameters" );
	return null;
};

Control.prototype.destroy = function( oControlHost )
{
	this.log( "CustomControl.destroy" );
};

Control.prototype.log = function( s )
{
	console.log( s );
	if ( bAlert )
	{
		alert( s );
	}
};

return Control;
});
