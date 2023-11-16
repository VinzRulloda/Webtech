function fetchAirports() {
    const ipAddressInput = document.getElementById("ipAddress").value;

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener('readystatechange', function () {
        if (this.readyState === this.DONE) {
            // Parse the response JSON
            const response = JSON.parse(this.responseText);

            // Extract airport names from the response (modify this based on the actual response structure)
            const suggestedAirports = response.map(airport => airport.name);

            // Display suggested airports in the datalist
            displaySuggestedAirports(suggestedAirports);
        }
    });

    const apiUrl = `https://aerodatabox.p.rapidapi.com/airports/search/ip?q=${ipAddressInput}&radiusKm=50&limit=10&withFlightInfoOnly=true`;

    xhr.open('GET', apiUrl);
    xhr.setRequestHeader('X-RapidAPI-Key', '8928dadc3fmshe0e889c98e4439ep1146cbjsn8d149ca76ac0');
    xhr.setRequestHeader('X-RapidAPI-Host', 'aerodatabox.p.rapidapi.com');
    xhr.send();
}

function displaySuggestedAirports(airports) {
    const suggestedAirportsDatalist = document.getElementById("suggestedAirports");
    suggestedAirportsDatalist.innerHTML = "";

    airports.forEach((airport) => {
        const option = document.createElement("option");
        option.value = airport;
        suggestedAirportsDatalist.appendChild(option);
    });
}