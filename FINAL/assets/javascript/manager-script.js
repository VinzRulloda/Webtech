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
function toggleDeleteVideo(id) {
    var deleteVideoForm = document.getElementById("deleteVideo");
    document.getElementById("videoid").value = id
    if (deleteVideoForm.style.display === "none" || deleteVideoForm.style.display === "") {
        deleteVideoForm.style.display = "block";
    } else {
        deleteVideoForm.style.display = "none";
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const videoPlayer = document.getElementById('vidPlayer');
    
    fetch("get_video.php")
    .then((response) => response.json())
    .then((data) => {
        var videoSources = []
        let currentVideoIndex = 0;

        document.getElementById('vidPlayer').addEventListener('timeupdate', updateTimestamp);
        window.onload = setVideoTimestamp;

        data.forEach((item) => {
            videoSources.push(item.file_path)
        });
        function playNextVideo() {
            localStorage.setItem('currentVideoIndex', currentVideoIndex);
            videoPlayer.src = videoSources[currentVideoIndex+1];
            videoPlayer.load();
            videoPlayer.play();
        }

        document.getElementById('vidPlayer').addEventListener('ended', playNextVideo);

        const storedIndex = localStorage.getItem('currentVideoIndex');
        if (storedIndex !== null) {
            currentVideoIndex = parseInt(storedIndex, 10);
            videoPlayer.src = videoSources[currentVideoIndex];
            videoPlayer.load();
            videoPlayer.play();
        } else {
            playNextVideo();
        }
    });
});

function remove_video(id) {
    fetch("remove_video.php", {
        method: "POST",
        body: JSON.stringify({
            videoid: id,
        }),
        headers: {
            "Content-type": "application/json"
        }
        });
}