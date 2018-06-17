define( function() {
"use strict";

var bAlert = false;

function PageModule()
{
};

PageModule.prototype.load = function( oPage )
{
	this.log( "PageModule.load" );
};

PageModule.prototype.show = function( oPage )
{
	this.log( "PageModule.show" );
};

PageModule.prototype.hide = function( oPage )
{
	this.log( "PageModule.hide" );
};

PageModule.prototype.destroy = function( oPage )
{
	this.log( "PageModule.destroy" );
};

PageModule.prototype.log = function( s )
{
	console.log( s );
	if ( bAlert )
	{
		alert( s );
	}
};

return PageModule;
});