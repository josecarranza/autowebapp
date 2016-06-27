var LATITUDE;
var LONGITUDE;
function getMyPosition(position){

	LATITUDE=position.coords.latitude;
	LONGITUDE=position.coords.longitude;
  CreateMap();
}


function onLoad() {
	loading_show();
  document.addEventListener("deviceready", onDeviceReady, false);
  onDeviceReady();
  
  setSizeMap();
  setFooter();
  navigator.geolocation.getCurrentPosition(getMyPosition, onError);
//CreateMap();
}

function onDeviceReady() {



}
function setSizeMap(){
	H=$(window).height()-154;
	$('#map-canvas').height(H);
}
function CreateMap(){
 var map;

 map = new GMaps({
  div: '#map-canvas',
  lat: LATITUDE,
  lng: LONGITUDE,
  zoom:14
});

 map.on('marker_added', function (marker) {
  var index = map.markers.indexOf(marker);
  

  if (index == map.markers.length - 1) {
    map.fitZoom();
  }
});



 $.ajax({
  type: "POST",
  url: base_url+"Servicio.php?Camarasal=cuponesCerca&lat="+LATITUDE+"&long="+LONGITUDE,
                    //contentType: "application/json; charset=utf-8",
                    crossDomain: true,
                    dataType: 'json',
                    
                    //timeout: 5000,
                    beforeSend: function(){
                     //   alert("start");
                   },
                   success: function (response) {
                     var items, markers_data = [];

                     for(i in response.cupones){
                      item=response.cupones[i];
                      
                      if (item.latitude != undefined && item.longitude != undefined) {
                       var icon = base_url+'icono-mapa.png';

                       if($.isNumeric(item.latitude) && $.isNumeric(item.longitude)){
                         markers_data.push({
                           lat : item.latitude,
                           lng : item.longitude,
                           title : item.title,
                           icon : {
                             size : new google.maps.Size(32, 32),
                             url : icon
                           },
                           infoWindow: {
                             content: '<p><a href="detalle_cupon.html?id='+item.id+'&frommap=1">'+item.title+'</a></p>'
                           }

                         });
                       }




                     }


                   }
                   map.addMarkers(markers_data);
                   loading_hide();
                 },
                 error: function(xhr, status, error) {
                  alert("error: "+xhr.responseText+ " | "+error +" | "+status);
                }
              });


/*    function loadResults (data) {
      var items, markers_data = [];
      if (data.venues.length > 0) {
        items = data.venues;

        for (var i = 0; i < items.length; i++) {
          var item = items[i];

          if (item.location.lat != undefined && item.location.lng != undefined) {
            var icon = 'https://foursquare.com/img/categories/food/default.png';

            markers_data.push({
              lat : item.location.lat,
              lng : item.location.lng,
              title : item.name,
              icon : {
                size : new google.maps.Size(32, 32),
                url : icon
              }
            });
          }
        }
      }

      map.addMarkers(markers_data);
    }*/

    function printResults(data) {
     // $('#foursquare-results').text(JSON.stringify(data));
     
   }
/*
    $(document).on('click', '.pan-to-marker', function(e) {
      e.preventDefault();

      var position, lat, lng, $index;

      $index = $(this).data('marker-index');

      position = map.markers[$index].getPosition();

      lat = position.lat();
      lng = position.lng();

      map.setCenter(lat, lng);
    });
*/




}
var onSuccess = function(position) {
  alert('Latitude: '          + position.coords.latitude          + '\n' +
    'Longitude: '         + position.coords.longitude         + '\n' +
    'Altitude: '          + position.coords.altitude          + '\n' +
    'Accuracy: '          + position.coords.accuracy          + '\n' +
    'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
    'Heading: '           + position.coords.heading           + '\n' +
    'Speed: '             + position.coords.speed             + '\n' +
    'Timestamp: '         + position.timestamp                + '\n');
};

// onError Callback receives a PositionError object
//
function onError(error) {
  alert('code: '    + error.code    + '\n' +
    'message: ' + error.message + '\n');
}





