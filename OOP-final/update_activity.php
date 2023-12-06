<?php
session_start();

// Update user activity timestamp in the session
if (isset($_SESSION['user_id'])) {
    $_SESSION['last_activity'] = time();
    echo 'User activity updated';
} else {
    echo 'User not authenticated';
}
?>
