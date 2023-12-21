<?php

function upload($file, $tmp_name) {

  $servername = "localhost";
  $username = "root";
  $password = "";
  $dbname = "video";

  $conn = new mysqli($servername, $username, $password, $dbname);

  if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
  }
  $target_dir = "assets/videos/";

  $target_file = $target_dir . $file;
  $uploadOk = 1;
  $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

  $title = $_POST['title'];
  $duration = "60";
  $uploaded_by = "Test";


  // Check if file already exists
  if (file_exists($target_file)) {
    echo "<script>alert('Sorry, file already exists.')</script>";
    $uploadOk = 0;
  }

  // Allow certain file formats
  if($imageFileType != "mp4" && $imageFileType != ".mkv" && $imageFileType != ".webm") {
    echo "<script>alert('Sorry, only videos are allowed.')</script>";
    $uploadOk = 0;
  }

  if ($uploadOk != 0) {
    if (!move_uploaded_file($tmp_name, $target_file)) {
      echo "<script>alert('Sorry, there was an error uploading your file.')</script>";
    } else {
      $sql = "INSERT INTO uploads (title,file_path, duration, uploaded_by) VALUES ('$title','$target_file', $duration, '$uploaded_by')";
          if ($conn->query($sql) !== TRUE) {
              echo "<script> alert('Error: $sql: $conn->error')</script>";
          } 
      

    }
  } 

}
$names = $_FILES['files']['name'];
$tmp_names = $_FILES['files']['tmp_name'];
$filecount = count($names);

for ($x = 0; $x < $filecount; $x++) {
  upload($names[$x], $tmp_names[$x]);
}

echo "<script>window.location.href = 'manager.php';</script>";

?>