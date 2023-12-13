<?php

require 'db_connection.php';
session_start()
$stmt = $pdo->query('SELECT * FROM uploads');
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

foreach ($rows as $row) {
    

    <tr>
    <td><?php  echo $row['title'];  ?> </td>
    <td><?php  echo $row['uploaded_by'];  ?> </td>
    <td><?php  echo $row['duration'];  ?> </td>
    <td><video width="320" height="240" controls><source src=" echo  "assets/videos/".$row['title']?>" type="video/mp4"></video></td>

    </tr>
}
?>




              