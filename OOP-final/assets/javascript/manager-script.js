document.addEventListener('DOMContentLoaded', function () {
function updateTimestamp() {
    var video = document.getElementById('vidPlayer');
    localStorage.setItem('videoTimestamp', video.currentTime);
}

function setVideoTimestamp() {
    var video = document.getElementById('vidPlayer');
    var timestamp = localStorage.getItem('videoTimestamp');
    if (timestamp) {
        video.currentTime = parseFloat(timestamp);
    }
}

    document.getElementById('vidPlayer').addEventListener('timeupdate', updateTimestamp);
    window.onload = setVideoTimestamp;

function changeContainerContent(content) {
        var container = document.querySelector('.container-right');
        container.innerHTML = content;
}


    document.querySelector('.arrangement-btn').addEventListener('click', function () {
        var arrangementContent = '<h2>Arrangement Content</h2><p>This is the arrangement content.</p>';
        changeContainerContent(arrangementContent);
    });

    document.querySelector('.history-btn').addEventListener('click', function () {
        var historyContent = '<h2>History Content</h2><p>This is the history content.</p>';
        changeContainerContent(historyContent);
    });
});