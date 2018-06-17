define( ["jquery"], function( jQuery ) {
"use strict";

function Control()
{
};

Control.prototype.initialize = function( oControlHost, fnDoneInitializing )
{
	require( ["https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"], this.doneInitializing.bind( this, fnDoneInitializing ) );
};

Control.prototype.doneInitializing = function( fnDoneInitializing )
{
	fnDoneInitializing();
};

Control.prototype.draw = function( oControlHost )
{
	var o = oControlHost.configuration;
	this.m_sCardNames = [];
	var aButtons = o.Tabs || this.generateTabsFromDataStore( oControlHost );
	var sID = oControlHost.container.id;
	var sInputName = sID + "__bs-buttonbar__";

	var aHtml = [];
	aHtml.push( '<div class="btn-group" data-toggle="buttons">' );
	for ( var i = 0; i < aButtons.length; i++ )
	{
		var oButton = aButtons[i];
		this.m_sCardNames[i] = oButton.card;
		
		aHtml.push( '<label class="btn btn-primary active"><input type="radio" name="' + sInputName + '" autocomplete="off" cardIndex="' + i + '"/>' + oButton.label + '</label>' );
	}
	aHtml.push( '</div>' );
	oControlHost.container.innerHTML = aHtml.join( "" );

	var nl = oControlHost.container.querySelectorAll( "INPUT" );
	for ( var i = 0; i < aButtons.length; i++ )
	{
		var el = nl.item( i );
		el.onclick = this.onTabClick.bind( this, el, oControlHost.page );
	}

	jQuery( '#' + sID + ' input:eq(0)' ).click();
};

Control.prototype.onTabClick = function( el, oPage )
{
	jQuery( el ).button( 'toggle' );
	var iCardIndex = +el.getAttribute( "cardIndex" );

	if ( this.m_sCards )
	{
		var a = oPage.getControlsByName( this.m_sCards );
		for ( var i = 0; i < a.length; i++ )
		{
			a[i].setDisplay( i == iCardIndex );
		}
		return;
	}

	for ( var i = 0; i < this.m_sCardNames.length; i++ )
	{
		oPage.getControlByName( this.m_sCardNames[i] ).setDisplay( i == iCardIndex );
	}
};

Control.prototype.generateTabsFromDataStore = function( oControlHost )
{
	var oDataStore = this.m_oDataStore;
	if ( !oDataStore )
	{
		return null;
	}
	var iLabelColumn = oDataStore.getColumnIndex( "Label" ) || 0;
	this.m_sCards = oControlHost.configuration.Cards;
	var aButtons = [];
	var iRowCount = oDataStore.rowCount;
	for ( var iRow = 0; iRow < iRowCount; iRow++ )
	{
		var oButton = {};
		oButton.label = oDataStore.getFormattedCellValue( iRow, iLabelColumn );
		oButton.card = this.m_sCards;
		aButtons.push( oButton );
	}
	return aButtons;
};

Control.prototype.setData = function( oControlHost, oDataStore )
{
	this.m_oDataStore = oDataStore;
};

return Control;
});
