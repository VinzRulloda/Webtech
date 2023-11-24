// https://leafletjs.com/reference.html#marker-option (documentation for reference)
//map

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6378; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
}

var map = L.map('map', {
    minZoom: 0,
    maxZoom: 25,
}).setView([16.4023, 120.5960], 13);

var destinationMarker;

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var geocoder = L.Control.geocoder({
    defaultMarkGeocode: false
}).on('markgeocode', function (event) {
    var center = event.geocode.center;
    map.setView(center, map.getZoom());

    if (destinationMarker) {
        map.removeLayer(destinationMarker);
    }

    destinationMarker = L.marker(center)
        .addTo(map)
        .bindPopup('Go here')
        .openPopup();

}).addTo(map);

var currentLocationMarker;
var control;

if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
        var currentLocation = L.latLng(position.coords.latitude, position.coords.longitude);
        map.setView(currentLocation, 13);

        currentLocationMarker = L.marker(currentLocation)
            .addTo(map)
            .bindPopup('You are Here')
            .openPopup();

            function setDestinationManually() {
                if (destinationMarker) {
                    map.removeLayer(destinationMarker);
                }
            
                var selectedLatitude = localStorage.getItem('selectedLatitude');
                var selectedLongitude = localStorage.getItem('selectedLongitude');
            
                if (selectedLatitude && selectedLongitude) {
                    var destination = L.latLng(selectedLatitude, selectedLongitude);
            
                    destinationMarker = L.marker(destination)
                        .addTo(map)
                        .bindPopup('Go here')
                        .openPopup();
            
                    var currentLatLng = currentLocationMarker.getLatLng();
                    var distance = calculateDistance(
                        currentLatLng.lat, currentLatLng.lng,
                        destination.lat, destination.lng
                    );
            
                    document.getElementById('distance-display').textContent = 'Distance to destination: ' + distance.toFixed(2) + ' km';
            
                    control = L.Routing.control({
                        waypoints: [currentLatLng, destination],
                        routeWhileDragging: true,
                    }).addTo(map);
            
                    document.getElementById('remove-destination-button').style.display = 'block';
                    document.getElementById('set-destination-button').disabled = true;
            
                    // Center the map on the destination coordinates
                    map.setView(destination, 13);
                } else {
                    alert('Please select a destination first.');
                }
            
                map.off('click');
            }

        document.getElementById('set-destination-button').addEventListener('click', setDestinationManually);

        function removeDestination() {
            if (destinationMarker) {
                map.removeLayer(destinationMarker);
            }
            if (control) {
                map.removeControl(control);
            }

            document.getElementById('remove-destination-button').style.display = 'none';
            document.getElementById('set-destination-button').disabled = false;
            document.getElementById('distance-display').textContent = ''; // Clear the distance display
        }

        const destinationParam = getDestinationFromQuery();
        if (destinationParam) {
            if (destinationParam === 'new-york') {
                setDestinationOnMap('New York City', 40.7128, -74.0060);
            } else if (destinationParam === 'tokyo') {
                setDestinationOnMap("Tokyo", 35.6764, 139.6500)
            } else if (destinationParam === 'canada') {
                setDestinationOnMap("Canada", 49.290558518378916, -123.11816952293671)
            }
        }

        document.getElementById('remove-destination-button').addEventListener('click', removeDestination);
    });
} else {
    console.log('Geolocation is not available in this browser.');
}

function setDestinationOnMap(name, lat, lng) {
    if (destinationMarker) {
        map.removeLayer(destinationMarker);
    }

    destinationMarker = L.marker([lat, lng])
        .addTo(map)
        .bindPopup(name)
        .openPopup();

    // Center the map on the destination coordinates
    map.setView([lat, lng], 13);
}

function getDestinationFromQuery() {
    const urlParams = new URLSearchParams(window.location.search);
    const destination = urlParams.get('destination');
    return destination;
}

document.getElementById('new-york').addEventListener('click', function () {
    setDestinationOnMap('New York City', 40.7128, -74.0060);
});

document.getElementById('tokyo').addEventListener('click', function () {
    setDestinationOnMap('Tokyo', 35.6764, 139.6500);
});

document.getElementById('canada').addEventListener('click', function () {
    setDestinationOnMap('Canada', 49.290558518378916, -123.11816952293671);
});

function selectLocation(latitude, longitude) {
    localStorage.setItem('selectedLatitude', latitude);
    localStorage.setItem('selectedLongitude', longitude);
}

