$(function(){
  var map, infowindow;

  
  var marker;
  
  
  
  function addInfoWindowForCamera(marker, camera){
    // this method should handle the creating and displaying the infowindow 
    // If an infowindow is already open , it should close it before opening a new one
    // maybe that's why var infowindow above is in the global scope...
    

    
    
    google.maps.event.addListener(marker, 'click', function() {
      console.log("Clicked", camera.id)
      infoWindow.setContent("<img src='http://www.tfl.gov.uk/tfl/livetravelnews/trafficcams/cctv/"+camera.file+"'><p>"+camera.location+"("+camera.postcode+")</p>");
      infoWindow.open(map,marker);
    });

  }

  function createMarkerForCamera(camera){
    // here we should define a marker object and add it to the map 
    // then attach an info window to the marker
    var camLatlng = new google.maps.LatLng(camera.lat,camera.lng);

    marker = new google.maps.Marker({
        position: camLatlng,
        map: map,
        title: camera.location
    });


    // marker.setMap(map);
    addInfoWindowForCamera(marker, camera);
  }


  function mapCameras(cameras){

    _(cameras).each(function(camera){ // short _(cameras).each(createMarkerForCamera)
      createMarkerForCamera(camera);
    });
  }

  function initialize(){
    var mapOptions = {
      zoom:      13, 
      center:    new google.maps.LatLng(51.508742, -0.120850),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var canvas = document.getElementById("map-canvas");
    map = new google.maps.Map(canvas, mapOptions);
    infoWindow = new google.maps.InfoWindow();

    var requestUrl = '/cameras';
    $.ajax({
      type: "GET",
      url: requestUrl,
      dataType: "json"
    }).success(mapCameras);

  };
  
  initialize();
});