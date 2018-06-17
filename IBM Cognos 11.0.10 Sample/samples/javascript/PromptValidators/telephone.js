define( ["./regexValidator.js"], function( fnValidator )
{
	return fnValidator.bind( null, /^\(\d\d\d\) \d\d\d\-\d\d\d\d$/ );
});