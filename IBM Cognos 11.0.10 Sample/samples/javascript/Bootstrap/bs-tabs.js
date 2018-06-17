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
	var aTabs = o.Tabs || this.generateTabsFromDataStore( oControlHost );

	var aHtml = [];
	aHtml.push( '<ul class="nav nav-tabs" role="tablist">' );
	for ( var i = 0; i < aTabs.length; i++ )
	{
		var oTab = aTabs[i];
		this.m_sCardNames[i] = oTab.card;
		aHtml.push( '<li role="presentation"><a href="#" cardIndex="' + i + '" aria-controls="" role="tab" data-toggle="tab">' + oTab.label + '</a></li>' );
	}
	aHtml.push( '</ul>' );
	oControlHost.container.innerHTML = aHtml.join( "" );

	var sID = oControlHost.container.id;
	var aAnchors = oControlHost.container.querySelectorAll( "LI > A" );
	for ( var i = 0; i < aTabs.length; i++ )
	{
		aAnchors[i].onclick = this.onTabClick.bind( this, aAnchors[i], oControlHost.page );
	}

	jQuery( '#' + sID + ' li:eq(0) a' ).click();

//	jQuery( '[data-toggle="modal"]' ).modal('hide');
	jQuery( '[data-toggle="tooltip"]' ).tooltip();
	jQuery( '[data-toggle="popover"]' ).popover();
//	jQuery( '#' + sID + ' [data-toggle="popover"]' ).popover();
};

Control.prototype.onTabClick = function( elAnchor, oPage )
{
	jQuery( elAnchor ).tab( 'show' );
	var iCardIndex = +elAnchor.getAttribute( "cardIndex" );

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
	var aTabs = [];
	var iRowCount = oDataStore.rowCount;
	for ( var iRow = 0; iRow < iRowCount; iRow++ )
	{
		var oTab = {};
		oTab.label = oDataStore.getFormattedCellValue( iRow, iLabelColumn );
		oTab.card = this.m_sCards;
		aTabs.push( oTab );
	}
	return aTabs;
};

Control.prototype.setData = function( oControlHost, oDataStore )
{
	this.m_oDataStore = oDataStore;
};

return Control;
});
