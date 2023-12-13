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

function initializeContent() {
    var arrangementContent = '<h2>Arrangement Content</h2>' +
            '<div class="button-container">' +
            '<input type="file" id="videoInput" accept="video/*">' +
            '<button class="action-button" onclick="uploadVideo()">Add</button>' +
            '</div>' +
            '<table class="data-table" id="videoTable"></table>';
    changeContainerContent(arrangementContent);
}

   // initializeContent();

    document.querySelector('.arrangement-btn').addEventListener('click', function () {
        var arrangementContent = '<h2>Arrangement Content</h2>' +
            '<div class="button-container">' +
            '<input type="file" id="videoInput" accept="video/*">' +
            '<button class="action-button" onclick="uploadVideo()">Add</button>' +
            '</div>' +
            '<table class="data-table" id="videoTable"></table>';
        document.querySelector('.container-right').innerHTML = arrangementContent;
        window.location.href="http://localhost/manager.php#";
    });
    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('upload-button')) {
            openUploadPopup();
        }
    });
    
    function openUploadPopup() {
        var uploadPopupContent = '<div class="popup-content">' +
            '<span class="close-popup" onclick="closePopup()">&times;</span>' +
            '<h2>Upload Video</h2>' +
            '<div class="button-container">' +
            '<input type="file" id="videoInput" accept="video/*">' +
            '<button class="action-button" onclick="uploadVideo()">Upload</button>' +
            '</div>' +
            '</div>';
        openPopup(uploadPopupContent);
    }
        
function openPopup(content) {
    var popup = document.getElementById('uploadPopup');
    var popupContent = document.getElementById('popupContent');
    popupContent.innerHTML = content;
    popup.style.display = 'flex';
}
        

        


    document.querySelector('.history-btn').addEventListener('click', function () {
        var historyContent = '<h2>History Content</h2><p>This is the history content.</p>';
        changeContainerContent(historyContent);
    });

    

});

function uploadVideo() {
    
    var fileInput = document.getElementById('videoInput');
    var file = fileInput.files[0];
    if (file) {
        
        var video = document.createElement('video');
        video.preload = 'metadata';
        video.onloadedmetadata = function() {
            window.URL.revokeObjectURL(video.src);
            var duration = video.duration;      
            var formData = new FormData();
            formData.append('video', file);
            formData.append('title', file?.name);
            formData.append('duration', duration);
            formData.append('uploaded_by', '<?php echo isset($_SESSION["username"]) ? $_SESSION["username"] : ""; ?>');
    
            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'upload_video.php', true);
    
            xhr.onload = function () {
                console.log(file)  
                if (xhr.status == 200) {
                    updateVideoTable();
                    closePopup();
                }
            };
            xhr.send(formData);
        }
        video.src = URL.createObjectURL(file);
    }
}


function updateVideoTable() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'get_videos.php', true);

    xhr.onload = function () {
        if (xhr.status == 200) {
            var videoTable = document.getElementById('videoTable');
            videoTable.innerHTML = xhr.responseText;
        }
    };

    xhr.send();
}
function closePopup() {
    var popup = document.getElementById('uploadPopup');
    popup.style.display = 'none';
}