document.getElementById('xhrForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevents the default form submission

    const searchTerm = document.getElementById('searchTerm').value;
    const url = `https://aerodatabox.p.rapidapi.com/airports/search/term?q=${searchTerm}&limit=10`;

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener('readystatechange', function () {
        if (this.readyState === this.DONE) {
            const airports = JSON.parse(this.responseText);
            updateDropdown(airports);
        }
    });

    xhr.open('GET', url);
    xhr.setRequestHeader('X-RapidAPI-Key', '8928dadc3fmshe0e889c98e4439ep1146cbjsn8d149ca76ac0');
    xhr.setRequestHeader('X-RapidAPI-Host', 'aerodatabox.p.rapidapi.com');

    xhr.send();
});

function updateDropdown(airports) {
    const airportList = document.getElementById('airportList');
    airportList.innerHTML = ''; // Clear existing options

    if (airports.length > 0) {
        airports.forEach(airport => {
            const option = document.createElement('option');
            option.value = airport.iataCode;
            option.textContent = `${airport.name} (${airport.iataCode})`;
            airportList.appendChild(option);
        });
    } else {
        const option = document.createElement('option');
        option.textContent = 'No airports found';
        airportList.appendChild(option);
    }
}
