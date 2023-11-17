const apiKey = '8928dadc3fmshe0e889c98e4439ep1146cbjsn8d149ca76ac0'; // Replace with your valid API key
const searchForm = document.getElementById('search-form');
const flightResultsList = document.getElementById('flight-list');

searchForm.addEventListener('submit', handleSearch);

function handleSearch(event) {
  event.preventDefault();

  const departureCity = document.getElementById('departure-city').value;
  const arrivalCity = document.getElementById('arrival-city').value;
  const travelDate = document.getElementById('travel-date').value;
  const numberOfPassengers = document.getElementById('passengers').value;

  const url = `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/US/USD/en-US/${departureCity}-sky/${arrivalCity}-sky/${travelDate}?adults=${numberOfPassengers}`;

  fetch(url, {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': apiKey,
    },
  })
    .then(response => response.json())
    .then(data => {
      if (data.Quotes) { // Check if 'Quotes' property exists
        displayFlightResults(data); // Process flight data if available
      } else {
        console.error('No flight results found'); // Handle no results case
      }
    })
    .catch(error => {
      if (error.status === 403) {
        console.error('API access forbidden. Check your API key');
      } else if (error.status === 429) {
        console.error('API request throttled. Implement rate limiting');
      } else {
        console.error('API error:', error);
      }
    });
}

function displayFlightResults(data) {
  flightResultsList.innerHTML = '';

  for (const quote of data.Quotes) { // Iterate over 'Quotes' array
    const flightResultHTML = `<li>${quote.MinPrice}</li>`;
    flightResultsList.innerHTML += flightResultHTML;
  }
}
