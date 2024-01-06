const socket = io("http://localhost:3000");
const videoPlayer = document.getElementById('videoPlayer');

socket.emit('requestVideo');

socket.on('videoFile', (data) => {
    console.log(data);
    videoPlayer.src = data.url;
    videoPlayer.onended = () => {
        socket.emit('videoEnded');
    };
});
socket.on('allVideosPlayed', () => {
    console.log('All videos played');
});

socket.on('video-not-available', () => {
    console.log('Video not available');
});

function remove_video(id, filepath) {
    fetch("remove_video.php", {
        method: "POST",
        body: JSON.stringify({
            videoid: id,
            path: filepath
        }),
        headers: {
            "Content-type": "application/json"
        }
        }).then(() => {
            socket.emit('video-removed', id);
            window.location.reload();
        });
}

// document.addEventListener('keyup', (e) => {
//     if (e.key == 'PrintScreen') {
        
//     }
// });