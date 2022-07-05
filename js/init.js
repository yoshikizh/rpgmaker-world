window.getPixelRatio = function(context) {
  var backingStore = context.backingStorePixelRatio ||
        context.webkitBackingStorePixelRatio ||
        context.mozBackingStorePixelRatio ||
        context.msBackingStorePixelRatio ||
        context.oBackingStorePixelRatio ||
        context.backingStorePixelRatio || 1;

  return (window.devicePixelRatio || 1) / backingStore;
}

function jsGetDPI() {
  var arrDPI = new Array();
  if ( window.screen.deviceXDPI != undefined ) {
      arrDPI[0] = window.screen.deviceXDPI;
      arrDPI[1] = window.screen.deviceYDPI;
  }
  else {
      var tmpNode = document.createElement( "DIV" );
      tmpNode.style.cssText = "width:1in;height:1in;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden";
      document.body.appendChild( tmpNode );
      arrDPI[0] = parseInt( tmpNode.offsetWidth );
      arrDPI[1] = parseInt( tmpNode.offsetHeight );
      tmpNode.parentNode.removeChild( tmpNode );
  }
  return arrDPI;
}

window.dp = function(n){
	return n * (jsGetDPI()[0] / 160)
}

window.sp = function(size){
	return dp(size)
}