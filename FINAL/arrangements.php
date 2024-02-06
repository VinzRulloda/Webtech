<?php
    require 'db_connection.php';
    require 'session.php';
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
                    <h2>Arrangement Content</h2> 
                    <button type="button" class="btn btn-primary float-end" data-bs-toggle="modal" data-bs-target="#addScheduleModal">
                        NEW
                    </button>
                    <table class="table table-responsive table-hover " id="videoTable">
                        <thead class="thead-dark">
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Uploaded By</th>
                                <th>Duration</th>
                                <th>File path</th>
                                <th>Action</th>
                            </tr>
                        </thead>
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
                                        <button class="btn btn-danger btn-sm" onclick="remove_video('.$row['id'].',\''. $row['file_path'] .'\')">Remove</button>
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
    <div class="modal fade" id="addScheduleModal" tabindex="-1" role="dialog" aria-labelledby="addScheduleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="addScheduleModalLabel">Add Schedule</h5>
                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form id="addScheduleForm" action="schedule.php" method="post">
    
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-sm">Schedule Name:</span>
                        <input class="form-control" type="text" name="schedule_name" id="schedule_name" required>
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-sm">Start Time:</span>
                        <input class="form-control" type="time" name="start_time" id="start_time" required>
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-sm">End Time:</span>
                        <input class="form-control" type="time" name="end_time" id="end_time" required>
                    </div>
                </form>     
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button form="addScheduleForm" type="submit" class="btn btn-success">ADD</button>
            </div>
            </div>
        </div>
    </div>
    

</body>
<footer>
    <img src="assets/images/EDITED-FOOTER.png" id="slufooter">
    <script src="assets/javascript/socket.io.min.js"></script>
    <script src="assets/javascript/video.js"></script>
    <script src="assets/javascript/manager-script.js"></script>
    <script src="assets/javascript/bootstrap.min.js"></script>
</footer>
</html>