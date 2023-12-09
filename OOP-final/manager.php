<?php
session_start()
?>
<script>
    // Function to update timestamp in the database
    function updateTimestamp() {
        var video = document.getElementById('vidPlayer');
        var timestamp = video.currentTime;
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'update_timestamp.php', true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send('timestamp=' + timestamp);
    }

    // Function to set the video to the latest timestamp
    function setVideoTimestamp() {
        var video = document.getElementById('vidPlayer');
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'get_timestamp.php', true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.onload = function() {
            if (xhr.status == 200) {
                video.currentTime = parseFloat(xhr.responseText);
            }
        };
        xhr.send();
    }

    // Event listener for video time update
    document.getElementById('vidPlayer').addEventListener('timeupdate', updateTimestamp);
    window.onload = setVideoTimestamp;
</script>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="assets/css/styles.css">

    <title>OOP-Final Manager</title>
</head>
<body>
    <nav>
        <div class="logo">OOP</div>

        <div class="navbar">
            <nav>
                <ul>
                    <li><a href="#" class="icon"><img src="assets\images\arrangement.png" alt="Arrangement"></a></li>
                    <li><a href="#" class="icon"><img src="assets\images\history.png" alt="History"></a></li>
                    <li><a href="#" class="icon"><img src="assets\images\live.png" alt="Live"></a></li>
                    <li><a href="logout.php" class="icon"><img src="assets\images\logout.png" alt="logout"></a></li>
                </ul>
            </nav>
        </div>
    </nav>

    <main>
        <div class="m-container">
            <video controls>
                <source src="assets/videos/sample.mp4" type="video/mp4">
            </video>
        </div>
    </main>

    <footer>
        <h3>OOP ON TOP</p>
        <p>weh</p>
        <p>hihu</p>
    </footer>
    <script src="assets/javascript/timestamp.js"></script>
</body>
</html>