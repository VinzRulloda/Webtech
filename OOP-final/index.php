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

if($_SERVER["REQUEST_METHOD"]=="POST"){

    $username=$_POST["username"];
    $password=$_POST["password"];

    $sql="select * from acc where username='".$username."' AND password='".$password."' 
    ";

    $result=mysqli_query($data, $sql);

    $row=mysqli_fetch_array($result);

    if($row["usertype"]=="user"){
        $_SESSION["username"]=$username;
        header("location:manager.php");
    }

    if($row["usertype"]=="admin"){
        $_SESSION["username"]=$username;
        header("location:admin.php");
    }

    else {
        echo "username / password incorrect";
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
    <script src="assets/javascript/login.js"></script>
</head>
<body>
    <nav>
        <div class="logo">OOP</div>

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
                    <a href="#" class="forgot-password">Forgot Password?</a>
                </div>
            
                <button type="button" class="close-btn" onclick="toggleLoginForm()">Close</button>
                <button type="submit" value="Login">Login</button>
            </form>
        </div>
    </nav>

    <main>
        <div class="content-container">
            <video controls>
                <source src="assets/videos/sample.mp4" type="video/mp4">
            </video>
        </div>
    </main>

    <footer>
        <h3>OOP ON TOP</h3>
        <p>weh</p>
        <p>hihu</p>
    </footer>
</body>
</html>