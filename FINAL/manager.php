<?php

require 'db_connection.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="assets/css/styles.css">
    <link rel="stylesheet" href="assets/css/bootstrap.min.css">
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
        <!-- <div class="popup-container" id="uploadPopup">
            <div id="popupContent"></div>
        </div> -->
        <div class="container">
            <div class="row">
                <div class="col">
                    <video type="video/mp4" id="vidPlayer" allow="autoplay" id="music" autoplay muted>
                    </video>
                </div>

                <div class="col">
                    <h2>Arrangement Content</h2> 
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addVideoModal">
                        Add
                    </button>
                    <table class="table data-table" id="videoTable">
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
                                echo '<td>
                                        <button class="btn btn-danger btn-sm" onclick="remove_video('.$row['id'].')">Remove</button>
                                    </td>';
                                echo '</tr>';
                            }
                        ?>
                        
                        </table>
                </div>
                </div>
            </div>
        </div>
    </main>

     
    <!-- Modal -->
    <div class="modal fade" id="addVideoModal" tabindex="-1" role="dialog" aria-labelledby="addVideoModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="addVideoModalLabel">Add Video</h5>
                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form id="uploadVideoForm" action="upload.php" method="post" enctype="multipart/form-data">
    
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-sm">Title:</span>
                        <input class="form-control" type="text" name="title" id="videotitle" required>
                    </div>
                    <div class="input-group mb-3"> 
                        <input class="form-control" type="file" name="files[]" id="videoInput" required multiple>
                    </div>
                </form>     
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button form="uploadVideoForm" type="submit" class="btn btn-primary">Save changes</button>
            </div>
            </div>
        </div>
    </div>
    

</body>
<footer>
    <img src="assets/images/EDITED-FOOTER.png" id="slufooter">
    <script src="assets/javascript/manager-script.js"></script>
    <script src="assets/javascript/bootstrap.min.js"></script>
</footer>
</html>