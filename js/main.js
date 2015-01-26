document.addEventListener("DOMContentLoaded", function(){

  if( navigator.geolocation ){
      var params = {enableHighAccuracy: false, timeout:3600, maximumAge:60000};
      navigator.geolocation.getCurrentPosition( reportPosition, gpsError, params );

      var canvas = document.createElement("canvas");
      canvas.width = 400;
      canvas.height = 400;
      canvas.id = "canvas-map";

      document.querySelector(".wrapper").appendChild(canvas);

  }else{
    //browser does not support geolocation api
    alert("Sorry, but your browser does not support location based awesomeness.")
  }
});

function reportPosition( position ){
    console.debug("latitude: " + position.coords.latitude);
    console.debug("longitude: " + position.coords.longitude);

    var canvas = document.querySelector("#canvas-map");
    var context = canvas.getContext("2d");

    // Create new img element
    var img = new Image();

    img.onload = function( ){
        console.debug("image has been loaded");
        context.drawImage(img, 0, 0);
        console.debug("image has been drawn on canvas");
    }

    // Set source path
    img.src = 'https://maps.googleapis.com/maps/api/staticmap?center=' +
        position.coords.latitude+','+
        position.coords.longitude+'&'+
        'zoom=14'+ '&'+
        'size=400x400'+'&'+
        'markers=color:red'+'|'+
        position.coords.latitude+','+
        position.coords.longitude+'&'+
        'key=AIzaSyCzGkfTYLGyBb9eM9bWgjlhmBdldBSBwNA';
}

function gpsError( error ){
  var errors = {
    1: 'Permission denied',
    2: 'Position unavailable',
    3: 'Request timeout'
  };
  alert("Error: " + errors[error.code]);
}
