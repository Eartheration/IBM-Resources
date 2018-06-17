define( ["./regexValidator.js"], function( fnValidator )
{
	return fnValidator.bind( null, /^\d{5}(?:[-\s]\d{4})?$/ );
});