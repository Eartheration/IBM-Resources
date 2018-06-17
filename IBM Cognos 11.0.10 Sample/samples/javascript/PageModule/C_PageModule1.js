define( function() {
"use strict";

function PageModule()
{
};

PageModule.prototype.load = function( oPage )
{
	console.log( "PageModule.load" );
};

PageModule.prototype.show = function( oPage )
{
	console.log( "PageModule.show" );
	var oControl = oPage.getControlByName( "Value - Product line" );
	console.log( oControl ? "found control" : "control not found" );
	//oControl.addValues
};

PageModule.prototype.hide = function( oPage )
{
	console.log( "PageModule.hide" );
};

PageModule.prototype.destroy = function( oPage )
{
	console.log( "PageModule.destroy" );
};

return PageModule;
});