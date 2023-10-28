// https://leafletjs.com/reference.html#marker-option (documentation for reference)
//map
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
}

// Calculate the price based on distance
// Based on Baguio City Rate
function calculatePrice(distance) {
    const basePrice = 45; // Starting price in PHP
    const pricePer100Meters = 2; // Price per 100 meters in PHP
    const price = basePrice + (distance * 10 * pricePer100Meters); // Convert distance to 100 meters and calculate price
    return price;
}

var map = L.map('map').setView([16.4023, 120.5960], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var currentLocationMarker;
var destinationMarker;
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

            map.on('click', function (e) {
                var destination = e.latlng;
                if (destinationMarker) {
                    map.removeLayer(destinationMarker);
                }

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

                var price = calculatePrice(distance);
                document.getElementById('price-display').textContent = 'Price: ' + price.toFixed(2) + ' PHP';

                control = L.Routing.control({
                    waypoints: [currentLatLng, destination],
                    routeWhileDragging: true,
                }).addTo(map);

                document.getElementById('remove-destination-button').style.display = 'block';
                document.getElementById('set-destination-button').disabled = true;

                map.off('click');
            });
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
            document.getElementById('price-display').textContent = ''; // Clear the price display
        }

        document.getElementById('remove-destination-button').addEventListener('click', removeDestination);
    });
} else {
    console.log('Geolocation is not available in this browser.');
}

// Get the destination from the URL query parameters
function getDestinationFromQuery() {
    const urlParams = new URLSearchParams(window.location.search);
    const destination = urlParams.get('destination');
    return destination;
}

// Function to set the destination on the map
function setDestinationOnMap(destinationName, lat, lon) {
    if (destinationMarker) {
        map.removeLayer(destinationMarker);
    }

    const destination = L.latLng(lat, lon);

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

    var price = calculatePrice(distance);
    document.getElementById('price-display').textContent = 'Price: ' + price.toFixed(2) + ' PHP';

    var control = L.Routing.control({
        waypoints: [
            L.latLng(currentLatLng.lat, currentLatLng.lng),
            L.latLng(lat, lon)
        ],
        routeWhileDragging: true,
        show: true,
        lineOptions: {
            styles: [{color: '#007bff', opacity: 1, weight: 5}]
        },
        createMarker: function(i, wp, nWps) {
            if (i === 0) {
                return currentLocationMarker;
            } else if (i === nWps - 1) {
                return destinationMarker;
            }
        }
    });

    control.addTo(map);
    document.getElementById('remove-destination-button').style.display = 'block';
    document.getElementById('set-destination-button').disabled = true;
}

const destinationParam = getDestinationFromQuery();
if (destinationParam) {
    if (destinationParam === 'burnham') {
        setDestinationOnMap('Burnham Park', 16.412478, 120.593956);
    } else if (destinationParam === 'cathedral') {
        setDestinationOnMap('Baguio Cathedral', 16.412856, 120.598470);
    } else if (destinationParam === 'botanical') {
        setDestinationOnMap('Botanical Garden', 16.414699, 120.613445);
    }
}

// Add event listeners to the buttons to set the destination
document.getElementById('burnham').addEventListener('click', function () {
    setDestinationOnMap('Burnham Park', 16.412478, 120.593956);
});

document.getElementById('cathedral').addEventListener('click', function () {
    setDestinationOnMap('Baguio Cathedral', 16.412856, 120.598470);
});

document.getElementById('botanical').addEventListener('click', function () {
    setDestinationOnMap('Botanical Garden', 16.414699, 120.613445);
});
