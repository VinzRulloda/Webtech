document.addEventListener('DOMContentLoaded', function () {
    const departureCityInput = document.getElementById('departureCity');
    const destinationCityInput = document.getElementById('destinationCity');

    // Fetch the list of airports for departure and destination
    fetchCities('departure-cities', departureCityInput);
    fetchCities('destination-cities', destinationCityInput);

    function fetchCities(datalistId, inputElement) {
        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener('readystatechange', function () {
            if (this.readyState === this.DONE) {
                const airports = JSON.parse(this.responseText);
                populateDatalist(datalistId, airports, inputElement);
            }
        });

        xhr.open('GET', 'https://aerodatabox.p.rapidapi.com/airports');
        xhr.setRequestHeader('X-RapidAPI-Key', '8928dadc3fmshe0e889c98e4439ep1146cbjsn8d149ca76ac0');
        xhr.setRequestHeader('X-RapidAPI-Host', 'aerodatabox.p.rapidapi.com');

        xhr.send();
    }

    function populateDatalist(datalistId, airports, inputElement) {
        const datalist = document.getElementById(datalistId);
        datalist.innerHTML = '';

        airports.forEach((airport) => {
            const option = document.createElement('option');
            option.value = airport.name;
            datalist.appendChild(option);
        });

        // Enable the input element
        inputElement.disabled = false;
    }
});