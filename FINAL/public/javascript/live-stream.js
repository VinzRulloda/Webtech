const socket = io('http://localhost:3000');

navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then((stream) => {
    const video = document.getElementById('streamerVideo');
    video.srcObject = stream;

    // Emit the video stream to the server
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
        socket.emit('stream', event.data);
        }
    };

    mediaRecorder.start();

    mediaRecorder.onstop = () => {
        socket.emit('stream', 'end');
    };
    })
    .catch((error) => {
    console.error('Error accessing webcam:', error);
    });