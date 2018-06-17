define( ["text!./AppBar.css"], function( sAppBarCss ) {
"use strict";

function AppBar()
{
};

AppBar.prototype.draw = function( oControlHost )
{
	var el = oControlHost.container;
	var o = oControlHost.configuration;
	if ( !o )
	{
		throw new scriptableReportError( "AppBar", "", "Expected configuration." );
	}
	this.m_bHorizontal = !!o && ( o.Orientation == "horizontal" );
	var sOrientation = this.m_bHorizontal ? "horizontal" : "vertical"
	var sAlign = ( this.m_bHorizontal && o ) ? ( o.Align || "" ) : "";
	var sSelector = "CCAppBar";
	var sUniqueSelector = sSelector + "_" + el.id;
	var sUniqueButtonSelector = sUniqueSelector + "Button";
	this.m_sCardNames = [];
	var aButtons = o.Buttons;
	if ( !aButtons )
	{
		aButtons = this.generateButtonFromDataStore( oControlHost );
	}
	var aHtml = [];
	aHtml.push( '<style>' );
	aHtml.push( sAppBarCss.replace( new RegExp( sSelector, "g" ), sUniqueSelector ) );
	if ( o["Background color"] )
	{
		aHtml.push( '\r\n.' + sUniqueSelector + ' { background-color:' + o["Background color"] + ';}' );
	}
	if ( o.Fill )
	{
		aHtml.push( '\r\n.' + sUniqueSelector + ' { fill:' + o.Fill + '; color:' + o.Fill + ';}' );
	}
	if ( o["Selection fill"] )
	{
		aHtml.push( '\r\n.' + sUniqueSelector + '.' + sOrientation + ' .' + sUniqueButtonSelector + ':hover, .' + sUniqueSelector + '.' + sOrientation + ' .' + sUniqueButtonSelector + '.selected { fill:' + o["Selection fill"] + '; color:' + o["Selection fill"] + ';}' );
	}
	if ( o["Selection border color"] )
	{
		aHtml.push( '\r\n.' + sUniqueSelector + '.' + sOrientation + ' .' + sUniqueButtonSelector + '.selected { border-' + ( this.m_bHorizontal ? 'bottom' : 'right' ) + '-color:' + o["Selection border color"] + ';}' );
	}
	if ( o["Selection background color"] )
	{
		aHtml.push( '\r\n.' + sUniqueSelector + '.' + sOrientation + ' .' + sUniqueButtonSelector + '.selected { background-color:' + o["Selection background color"] + ';}' );
	}
	aHtml.push( '</style>' );
	for ( var i = 0; i < aButtons.length; i++ )
	{
		var oButton = aButtons[i];
		this.m_sCardNames[i] = oButton.card;
		aHtml.push( '<div cardIndex="' + i + '" class="' + sUniqueButtonSelector + '">' );
		if ( oButton.label )
		{
			aHtml.push( oButton.label );
		}
		else if ( oButton.icon )
		{
			aHtml.push( oButton.icon.join( "" ) );
		}
		aHtml.push( '</div>' );
		if ( oButton.selected || ( ( i == 0 ) && o["Select first card"] ) )
		{
			this.m_iSelectedCard = i;
		}
	}

	el.innerHTML = aHtml.join( "" );
	el.classList.add( sUniqueSelector );
	el.classList.add( sOrientation );
	if ( sAlign )
	{
		el.style.textAlign = sAlign;
	}
	this.m_nlButtonDivs = el.querySelectorAll( "." + sUniqueButtonSelector );
	this.f_displayCard( this.m_iSelectedCard, oControlHost );
};

AppBar.prototype.generateButtonFromDataStore = function( oControlHost )
{
	var aDataStores = oControlHost.control.dataStores;
	var oDataStore = ( aDataStores.length > 0 ) ? aDataStores[0] : null;
	if ( !oDataStore )
	{
		return null;
	}
	this.m_sCards = oControlHost.configuration.Cards;
	var aButtons = [];
	var iRowCount = oDataStore.rowCount;
	for ( var iRow = 0; iRow < iRowCount; iRow++ )
	{
		var oButton = {};
		oButton.label = oDataStore.getFormattedCellValue( iRow, 0 );
		oButton.card = this.m_sCards;
		aButtons.push( oButton );
	}
	return aButtons;
};

AppBar.prototype.f_displayCard = function( iCardIndex, oControlHost )
{
	for ( var i = 0; i < this.m_nlButtonDivs.length; i++ )
	{
		var div = this.m_nlButtonDivs.item( i );
		div.classList[( i == iCardIndex ) ? "add" : "remove"]( "selected" );
		if ( !this.m_bSetupEventHandlers )
		{
			div.onmousedown = this.f_displayCard.bind( this, i, oControlHost );
		}
	}
	this.m_bSetupEventHandlers = true;

	var oPage = oControlHost.page;
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

return AppBar;
});
