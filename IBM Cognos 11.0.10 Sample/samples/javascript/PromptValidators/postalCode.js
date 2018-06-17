define( ["./regexValidator.js"], function( fnValidator )
{
	return fnValidator.bind( null, /^[a-z][0-9][a-z] [0-9][a-z][0-9]$/i );
});