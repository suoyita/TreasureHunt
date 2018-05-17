function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 16
        });
        var infoWindow = new google.maps.InfoWindow({map: map});
        var centerControl = new CenterMe(map);

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            var marker = new google.maps.Marker({
        	     position: pos,
        	     map: map
        	});
            // infoWindow.setPosition(pos);
            // infoWindow.setContent('Location found.');
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }

        document.getElementById('position').addEventListener("click", function(){
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            var marker = new google.maps.Marker({
               position: pos,
               map: map
          });
            // infoWindow.setPosition(pos);
            // infoWindow.setContent('Location found.');
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        });
        
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
      }

// function CenterMe(map){
//     var centerUI = document.createElement('select');
//     centerUI.id = "goto";

//     var centerMe = document.createElement('option');
//     centerMe.value = -1;

//     var textNode = document.createTextNode('My Location');
//     centerMe.appendChild(textNode);
//     centerUI.appendChild(centerMe);

//     google.maps.event.addDomListener(centerUI, 'change', function(event){
//         console.log(event);

//         if(event.srcElement.value == -1 || event.target.value == -1){
//             navigator.geolocation.getCurrentPosition(function(location){
//                 console.log(location);
//                 map.setCenter({lat:location.coords.latitude,lng:location.coords.longitude});
//             }, 
//             function(location){
//                 console.log(location);
//                 console.log("failed");
//             });
//         }
//         else{
//             var lat = markerlist[event.srcElement.value].position.lat();
//             var lng = markerlist[event.srcElement.value].position.lng();
//             map.setCenter({lat: lat, lng: lng});
//         }
//     });
//     centerUI.style.width = "14.5em";
//     centerUI.style.marginTop = "57px";
//     centerUI.firstChild.style.fontSize = "24px";
//     return centerUI;
// }