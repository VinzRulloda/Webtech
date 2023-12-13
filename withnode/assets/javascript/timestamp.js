// Save timestamp to local storage
function updateTimestamp() {
    var video = document.getElementById('vidPlayer');
    localStorage.setItem('videoTimestamp', video.currentTime);
}

// Load timestamp from local storage
function setVideoTimestamp() {
    var video = document.getElementById('vidPlayer');
    var timestamp = localStorage.getItem('videoTimestamp');
    if (timestamp) {
        video.currentTime = parseFloat(timestamp);
    }
}

document.getElementById('vidPlayer').addEventListener('timeupdate', updateTimestamp);
window.onload = setVideoTimestamp;
