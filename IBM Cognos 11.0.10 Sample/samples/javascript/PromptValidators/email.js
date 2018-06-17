define( ["./regexValidator.js"], function( fnValidator )
{
	return fnValidator.bind( null, /\S+@\S+\.\S+/i );
});