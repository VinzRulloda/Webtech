<?php
session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="assets/css/styles.css">
    <title>OOP-Final Admin</title>
</head>
<body>
<nav>
        <div class="logo">OOP</div>

        <div class="navbar">
            <nav>
                <ul>
                    <li><a href="logout.php" class="icon"><img src="assets\images\logout.png" alt="logout"></a></li>
                </ul>
            </nav>
        </div>
    </nav>

    <main>
    <div class="content-container">
            <h2>User Table</h2>
            <?php
            $servername = "localhost";
            $username = "root";
            $password = "";
            $dbname = "users";

            $conn = new mysqli($servername, $username, $password, $dbname);

            if ($conn->connect_error) {
                die("Connection failed: " . $conn->connect_error);
            }

            $sql = "SELECT id, fname, lname, username, password, usertype FROM acc";
            $result = $conn->query($sql);

            if ($result->num_rows > 0) {
                echo "<table><tr><th>ID</th><th>First Name</th><th>Last Name</th><th>Username</th><th>Password</th><th>User Type</th></tr>";

                while($row = $result->fetch_assoc()) {
                    echo "<tr><td>".$row["id"]."</td><td>".$row["fname"]."</td><td>".$row["lname"]."</td><td>".$row["username"]."</td><td>".$row["password"]."</td><td>".$row["usertype"]."</td></tr>";
                }

                echo "</table>";
            } else {
                echo "0 results";
            }

            $conn->close();
            ?>
        </div>
    </main>

    <footer>
        <h3>OOP ON TOP</p>
        <p>weh</p>
        <p>hihu</p>
    </footer>
</body>
</html>