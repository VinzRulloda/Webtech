fetch('/fetchvideo')
.then(response => {
    if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
})
.then(data => {
    console.log(data);

    if (data.videos && data.videos.length > 0) {
        const videoPlayer = document.getElementById('videoReceiver');
        playVideosSequentially(data);

        videoPlayer.addEventListener('ended', playNextVideo);

        async function playNextVideo() {
            const currentSrc = videoPlayer.src;
            const file_path = "public/videos/" + currentSrc.substring(currentSrc.lastIndexOf('/') + 1);
            const currentIndex = data.videos.findIndex(obj => obj["file_path"] === file_path);
    
            if (currentIndex !== -1 && currentIndex < data.videos.length - 1) {
                const videoPath = data.videos[currentIndex + 1].file_path.replace('public', '');
                videoPlayer.src = videoPath;
            } else {
                displayNoVideo();
            }
        }


    } else {
        displayNoVideo();
    }
    
    
})
.catch(error => {
    console.error('Fetch error:', error);
});

async function watchNextVideo(data) {
    const loadedMetadata = new Promise(resolve => {
        videoPlayer.addEventListener('loadedmetadata', () => {
            resolve();
        });
    });
}


async function playVideosSequentially(data) {
    const videoPlayer = document.getElementById('videoReceiver');
    let current_sequence = 0;
    let time_difference = data.schedule.time_difference
    console.log('Original Time Difference:', time_difference , 'seconds');

    while (current_sequence <= data.videos.length - 1) {
        const videoPath = data.videos[current_sequence].file_path.replace('public', '');
  
        const loadedMetadata = new Promise(resolve => {
            videoPlayer.addEventListener('loadedmetadata', () => {
                resolve();
            });
        });
  
        videoPlayer.src = videoPath;
        await loadedMetadata; // Wait for loadedmetadata event
  
        console.log('Current Sequence:', current_sequence);
        console.log('Running Time Difference:', time_difference, 'seconds');
        console.log('Video Duration:', videoPlayer.duration, 'seconds');

        if ( current_sequence == data.videos.length - 1 && time_difference > videoPlayer.duration) {
            displayNoVideo();
            break;
        }

        if (time_difference > videoPlayer.duration) {
            time_difference = time_difference - videoPlayer.duration;
            current_sequence++;
        } else if (!videoPlayer.ended) {
            videoPlayer.currentTime = time_difference;
            break;
        } else {
        }
    }

    
    
  }

function displayNoVideo(){
    const videoPlayer = document.getElementById('videoReceiver');
    const videoPlaceholder = document.getElementById('videoPlaceholder');
    const muteButton = document.getElementById('muteButton');
    videoPlayer.hidden = true;
    muteButton.hidden = true;
    videoPlaceholder.hidden = false;
}

function toggleMute() {
    var video = document.querySelector('video');
    if (video.muted) {
      video.muted = false;
      // Change the icon to unmute
      document.querySelector('#muteButton i').className = 'fa-solid fa-volume-high';
    } else {
      video.muted = true;
      // Change the icon to mute
      document.querySelector('#muteButton i').className = 'fa-solid fa-volume-xmark';

    }
}
