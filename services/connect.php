<?php
$servername = "localhost";
$username = "hadindev";
$password = "qwerty";
$dbname = "monitoring_sikola";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
