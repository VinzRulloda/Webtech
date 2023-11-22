async function getAirportsNearMe() {
    try {
        const position = await getCurrentLocation();
        const url = `https://timetable-lookup.p.rapidapi.com/airports/nearest/${position.coords.latitude}/${position.coords.longitude}/`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '904c800692msh67b20dfff139d47p19851ejsn672c7563cfb0',
                'X-RapidAPI-Host': 'timetable-lookup.p.rapidapi.com'
            }
        };

        const response = await fetch(url, options);
        const result = await response.text();
        const selectedLatitude = position.coords.latitude;
        const selectedLongitude = position.coords.longitude;
        localStorage.setItem('selectedLatitude', selectedLatitude);
        localStorage.setItem('selectedLongitude', selectedLongitude);
        displayResults(result);
    } catch (error) {
        console.error(error);
    }
}

function getCurrentLocation() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

function displayResults(result) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(result, 'text/xml');
    const airports = xmlDoc.querySelectorAll('Airport');

    const airportList = document.getElementById('AirportName');
    airportList.innerHTML = '';

    airports.forEach((airport) => {
        const option = document.createElement('option');
        option.value = airport.getAttribute('AirportName');
        option.dataset.latitude = airport.getAttribute('Latitude');
        option.dataset.longitude = airport.getAttribute('Longitude');
        airportList.appendChild(option);
    });
}

function captureSelectedAirport() {
    const selectedAirportInput = document.getElementById('Airport');

    // Check if there is a value selected
    if (selectedAirportInput.value) {
        const selectedOption = Array.from(document.querySelectorAll('#AirportName option')).find(option =>
            option.value.toLowerCase() === selectedAirportInput.value.toLowerCase()
        );

        if (selectedOption) {
            const selectedLatitude = selectedOption.getAttribute('data-latitude');
            const selectedLongitude = selectedOption.getAttribute('data-longitude');

            // Log the selected airport's latitude and longitude to the console
            console.log(`Selected Latitude: ${selectedLatitude}`);
            console.log(`Selected Longitude: ${selectedLongitude}`);

            setDestinationOnMapFromCoordinates(parseFloat(selectedLatitude), parseFloat(selectedLongitude));
            
        } else {
            console.error("Selected option not found.");
        }
    } else {
        console.error("No airport selected.");
    }
}

async function getAvailableAirports() {
    try {
        const url = 'https://timetable-lookup.p.rapidapi.com/airports/';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '904c800692msh67b20dfff139d47p19851ejsn672c7563cfb0',
                'X-RapidAPI-Host': 'timetable-lookup.p.rapidapi.com'
            }
        };

        const response = await fetch(url, options);
        const result = await response.text();
        displayAirportNames(result);
    } catch (error) {
        console.error(error);
    }
}

function displayAirportNames(result) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(result, 'text/xml');
    const airports = xmlDoc.querySelectorAll('Airport');

    const airportList = document.getElementById('AirportName');
    airportList.innerHTML = '';

    airports.forEach((airport) => {
        const option = document.createElement('option');
        option.value = airport.getAttribute('Name');
        option.dataset.latitude = airport.getAttribute('Latitude');
        option.dataset.longitude = airport.getAttribute('Longitude');
        airportList.appendChild(option);
    });
}

function captureSelectedAirport() {
    const selectedAirportInput = document.getElementById('Airport');

    if (selectedAirportInput.value) {
        const selectedOption = Array.from(document.querySelectorAll('#AirportName option')).find(option =>
            option.value.toLowerCase() === selectedAirportInput.value.toLowerCase()
        );

        if (selectedOption) {
            const selectedLatitude = selectedOption.getAttribute('data-latitude');
            const selectedLongitude = selectedOption.getAttribute('data-longitude');

            console.log(`Selected Latitude: ${selectedLatitude}`);
            console.log(`Selected Longitude: ${selectedLongitude}`);

            setDestinationOnMapFromCoordinates(parseFloat(selectedLatitude), parseFloat(selectedLongitude));

        } else {
            console.error("Selected option not found.");
        }
    } else {
        console.error("No airport selected.");
    }
}

function checkOnMap() {
    window.location.href = 'services.html';
}

