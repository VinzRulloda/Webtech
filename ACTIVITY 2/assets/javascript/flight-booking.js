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
        airportList.appendChild(option);
    });
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
        airportList.appendChild(option);
    });
}
