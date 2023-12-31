<?php

$host="localhost";
$user="root";
$password="";
$db="users";

session_start();

$data=mysqli_connect($host, $user, $password, $db);
if($data===false){
    die("connection failed");
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"];
    $password = $_POST["password"];

    $username = mysqli_real_escape_string($data, $username);
    $password = mysqli_real_escape_string($data, $password);

    $sql = "SELECT * FROM acc WHERE username='" . $username . "' AND password='" . $password . "'";
    $result = mysqli_query($data, $sql);

    if ($result) {
        $row = mysqli_fetch_array($result);

        if ($row && isset($row["usertype"])) {
            if ($row["usertype"] == "user") {
                $_SESSION["username"] = $username;
                $_SESSION["user_id"] = $row["id"];
                header("location: manager.php");
                exit();
            } elseif ($row["usertype"] == "admin") {
                $_SESSION["username"] = $username;
                $_SESSION["user_id"] = $row["id"];
                header("location: admin.php");
                exit();
            } else {
                
                echo '<script>alert("Incorrect username or password.");</script>';
            }
        } else {
          
            echo '<script>alert("Incorrect username or password.");</script>';
        }
    } else {
       
        echo '<script>alert("Error executing query.");</script>';
    }
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="assets/css/styles.css">
    <title>OOP-Final</title>
    <!-- <script src="assets/javascript/index-script.js"></script> -->
    

</head>
<body>
    <nav>
        <div class="logo">OOP</div>
        <img src="../assets/images/slulog.png" id="slulog">

        <div class="navbar">
            <nav>
                <ul>
                    <li><a href="#" class="icon" onclick="toggleLoginForm()"><img src="assets/images/profile.png" alt="Login"></a></li>
                </ul>
            </nav>
        </div>

        <div class="login-form" id="loginForm">
            <form method="post" action="#">
                <div class="form-title">OOP</div>
                <label for="username">Username:</label>
                <input type="text" id="username" name="username" placeholder="Email/username" required>
            
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" placeholder="Password" required>

                <div class="remember-forgot">
                <input type="checkbox" id="rememberMe" name="rememberMe">
                <label for="rememberMe"> Remember me </label>
                <a href="#" class="forgot-password" onclick="showForgotPassword()">Forgot Password?</a>
                </div>

            
                <button type="button" class="close-btn" onclick="toggleLoginForm()">Close</button>
                <button type="submit" value="Login">Login</button>
            </form>
        </div>

    </nav>

    <main>
        <div class="content-container">
            <video id="vidPlayer" autoplay mute>
                <source src="assets/videos/sample.mp4" type="video/mp4">
            </video>
        </div>
    </main>

    <footer>
    <img src="../assets/images/EDITED-FOOTER.png" id="slufooter">
    </footer>
</body>

</html>
