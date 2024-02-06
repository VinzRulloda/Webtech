const socket = io("http://localhost:3000");
let streamStarted = false;
let userStream;


async function startVideoStream() {
    try {
      userStream = await navigator.mediaDevices.getUserMedia({ video: true });

      const videoElement = document.getElementById('videoElement');
      videoElement.srcObject = userStream;

      const peerConnection = new RTCPeerConnection();
      userStream.getTracks().forEach(track => peerConnection.addTrack(track, userStream));

      // Create and send offer
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);
      socket.emit('offer', offer);

      socket.on('answer', (answer) => {
        peerConnection.setRemoteDescription(answer);
      });
      streamStarted = true;
    } catch (err) {
      console.error('Error accessing camera:', err);
    }
}

  // Function to stop the stream
function stopVideoStream() {
    if (userStream) {
        const tracks = userStream.getTracks();
        tracks.forEach(track => track.stop());
        const videoElement = document.getElementById('videoElement');
        videoElement.srcObject = null;
        streamStarted = false;
    }
}

// Event listeners for start and stop buttons
document.getElementById('startStream').addEventListener('click', () => {
    if (!streamStarted) {
        startVideoStream();
    }
});

document.getElementById('stopStream').addEventListener('click', () => {
    if (streamStarted) {
        stopVideoStream();
    }
});