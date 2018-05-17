var currentPosition = {
  lat: 0.00000,
  lng: 0.00000
};
var objectPosition = {
  lat: 0.00000,
  lng: 0.00000
};
var locationOrigem;
var locationDestino;
var minDistnace = 20;

function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 16
        });
        var infoWindow = new google.maps.InfoWindow({map: map});
        var marker;

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            marker = new google.maps.Marker({
        	     position: pos,
        	     map: map
        	});
            // infoWindow.setPosition(pos);
            // infoWindow.setContent('Location found.');
            map.setCenter(pos);
            marker.setMap(null);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }

        document.getElementById('position').addEventListener("click", function(){
          marker.setMap(null);
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            marker = new google.maps.Marker({
               position: pos,
               map: map
          });
            // infoWindow.setPosition(pos);
            // infoWindow.setContent('Location found.');
            map.setCenter(pos);
            currentPosition.lat = position.coords.latitude;
            currentPosition.lng = position.coords.longitude;
            // alert(currentPosition.lat);
            // markers.setMap(null);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        });

        var geocoder = new google.maps.Geocoder();

        document.getElementById('submit').addEventListener('click', function() {
          geocodeAddress(geocoder, map);
        });
        
        
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
      }

function geocodeAddress(geocoder, resultsMap) {
        var address = document.getElementById('address').value;
        geocoder.geocode({'address': address}, function(results, status) {
          if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
              map: resultsMap,
              position: results[0].geometry.location
            });
            objectPosition.lat = results[0].geometry.location.lat();
            objectPosition.lng = results[0].geometry.location.lng();
            // alert(objectPosition.lat);
            var curPoint = new google.maps.LatLng(currentPosition.lat, currentPosition.lng);
            var objPoint = new google.maps.LatLng(objectPosition.lat, objectPosition.lng);
            // alert(curPoint);
            // var distance = new google.maps.geometry.spherical.computeDistanceBetween(curPoint, objPoint);
            var distance = computeDistance(currentPosition, objectPosition);
            alert(distance);
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });
      }

var rad = function(x) {
  return x * Math.PI / 180;
};

function computeDistance(p1, p2){
  var R = 6378137; // Earth’s mean radius in meter
  var dLat = rad(Math.abs(p2.lat - p1.lat));
  var dLong = rad(Math.abs(p2.lng - p1.lng));
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d; // returns the distance in meter
}