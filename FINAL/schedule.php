<?php
require 'db_connection.php';

$stmt = $conn->prepare("INSERT INTO schedule (start_time, end_time, schedule_name) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $start_time, $end_time, $schedule_name);

$start_time = $_POST['start_time'];
$end_time = $_POST['end_time'];
$schedule_name = $_POST['schedule_name'];
$stmt->execute();

Header('Location: manager.php');
?>