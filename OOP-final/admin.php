<?php
session_start();

    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "users";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "SELECT id, fname, lname, username, password, usertype FROM acc ORDER BY id";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        echo "<table><tr><th>ID</th><th>First Name</th><th>Last Name</th><th>Username</th><th>Password</th><th>User Type</th><th>Actions</th></tr>";

        while($row = $result->fetch_assoc()) {
            echo "<tr>";
            echo "<td>".$row["id"]."</td>";
            echo "<td>".$row["fname"]."</td>";
            echo "<td>".$row["lname"]."</td>";
            echo "<td>".$row["username"]."</td>";
            echo "<td>".$row["password"]."</td>";
            echo "<td>".$row["usertype"]."</td>";
            echo "<td>";
            echo "<button onclick='editUser(".$row["id"].")'>Edit</button>";
            echo "<button onclick='removeUser(".$row["id"].")'>Remove</button>";
            echo "</td>";
            echo "</tr>";
        }

        echo "</table>";
    } else {
        echo "0 results";
    }

    $conn->close();
?>

