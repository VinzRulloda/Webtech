// script.js
const data = null;

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener('readystatechange', function () {
    if (this.readyState === this.DONE) {
        console.log(this.responseText);
    }
});

xhr.open('GET', 'https://aerodatabox.p.rapidapi.com/airports/search/location?lat=40.688812&lon=-74.044369&radiusKm=50&limit=10&withFlightInfoOnly=0');
xhr.setRequestHeader('X-RapidAPI-Key', '8928dadc3fmshe0e889c98e4439ep1146cbjsn8d149ca76ac0');
xhr.setRequestHeader('X-RapidAPI-Host', 'aerodatabox.p.rapidapi.com');

xhr.send(data);
