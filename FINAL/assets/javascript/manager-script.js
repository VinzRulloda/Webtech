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
    deleteVideoForm.classList.toggle("show");

    deleteVideoForm.style.display = deleteVideoForm.classList.contains("show") ? "block" : "none";

    if (deleteVideoForm.classList.contains("show")) {
        deleteVideoForm.style.left = "40%";
        deleteVideoForm.style.transform = "translateX(-40%)";

        deleteVideoForm.style.top = "40%";
        deleteVideoForm.style.transform = "translateY(-40%)";

    } else {
        deleteVideoForm.style.top = null;
        deleteVideoForm.style.left = null;
        deleteVideoForm.style.transform = null;
    }
}

function schedule_video(id) {
    fetch("schedule_video.php", {
        method: "POST",
        body: JSON.stringify({
            videoid: id,
        }),
        headers: {
            "Content-type": "application/json"
        }
        }).then(() => {
            window.location.reload();
        });
}



