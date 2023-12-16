<?php

require 'db_connection.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="assets/css/styles.css">
    <script src="assets/javascript/manager-script.js"></script>

    <title>OOP-Final Manager</title>
</head>
<body>
    <nav>
        <div class="logo">OOP</div>
        <img src="assets/images/slulog.png" id="slulog">

        <div class="navbar">
            <nav>
                <ul>
                <li><a href="#" class="icon arrangement-btn"><img src="assets\images\arrangement.png" alt="Arrangement"></a></li>
                <li><a href="#" class="icon history-btn"><img src="assets\images\history.png" alt="History"></a></li>
                <li><a href="#" class="icon live-btn"><img src="assets\images\live.png" alt="Live"></a></li>
                <li><a href="logout.php" class="icon"><img src="assets\images\logout.png" alt="logout"></a></li>
                </ul>
            </nav>
        </div>
    </nav>

    <main>
        <div class="popup-container" id="uploadPopup">
            <div id="popupContent"></div>
        </div>

        <div class="m-container">
        <video type="video/mp4" id="vidPlayer" allow="autoplay" id="music" autoplay muted>
        </video>

                
              
        </div>

        <div class="container-right">
            <h2>Arrangement Content</h2> 
            
            <form action="upload.php" method="post" enctype="multipart/form-data">
                    <label>Video Title:</label>
                    <input type="text" name="title" id="videotitle" required>
                <div class="button-container"> 
                    
                    <input type="file" name="fileToUpload" id="videoInput" required>
                    <button name="submit" type="submit">Add</button>
                </div>
            </form>
            <table class="data-table" id="videoTable">
            <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Uploaded By</th>
                <th>Duration</th>
                <th>File path</th>
                <th>Action</th>
            </tr>
            <?php
                $stmt = $pdo->query('SELECT * FROM uploads');
                $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

                foreach ($rows as $row) {
                    echo '<tr>';
                    echo '<td>' . $row['id'] . '</td>';
                    echo '<td>' . $row['title'] . '</td>';
                    echo '<td>' . $row['uploaded_by'] . '</td>';
                    echo '<td>' . $row['duration'] . '</td>';
                    echo '<td>' . $row['file_path'] . '</td>';
                    echo '<td><button onclick="remove_video('.$row['id'].')">Remove</button></td>';
                    echo '</tr>';
                }
            ?>
             
            </table>


            <form method="POST" action="remove_video.php" id="deleteVideo" style="display:none;">
            <div class="form-title">Delete Video</div>
            <p>Do you want to continue?</p>

            <button type="button" class="close-btn" onclick="toggleDeleteVideo()">No</button>
            <button id="videoid" name="id" type="submit">Yes</button>
            </form>
        </div>
    </main>




    <footer>
    <img src="assets/images/EDITED-FOOTER.png" id="slufooter">
   
    </footer>
</body>
</html>