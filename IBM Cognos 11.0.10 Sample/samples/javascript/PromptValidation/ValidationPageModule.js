define( ["../PromptValidators/telephone.js", "../PromptValidators/postalCode.js", "../PromptValidators/zipCode.js", "../PromptValidators/email.js"], function( fnTelephoneValidator, fnPostalCodeValidator, fnZipCodeValidator, fnEmailValidator ) {
"use strict";

function PageModule()
{
};

PageModule.prototype.load = function( oPage )
{
	oPage.getControlByName( "txtPhoneNumber" ).setValidator( fnTelephoneValidator );
	oPage.getControlByName( "txtPostalCode" ).setValidator( fnPostalCodeValidator );
	oPage.getControlByName( "txtZipCode" ).setValidator( fnZipCodeValidator );
	oPage.getControlByName( "txtEmail" ).setValidator( fnEmailValidator );
};

return PageModule;
});