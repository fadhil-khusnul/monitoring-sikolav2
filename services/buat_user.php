<?php
include 'connect.php';

// Path to your JSON file
$jsonFilePath = 'fakultas.json';

// Check if the file exists
if (!file_exists($jsonFilePath)) {
  die("JSON file not found.");
}

// Read the JSON file
$jsonData = file_get_contents($jsonFilePath);

// Decode JSON data
$data = json_decode($jsonData, true);

// Function to generate random password
function generatePassword($length = 8)
{
  $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return substr(str_shuffle($chars), 0, $length);
}

// Array to keep track of unique fakultas IDs
$fakultasIds = [];

$logData = [];

foreach ($data as $item) {
  $fakultasId = $item['fakultas']['id'];
  $username_admin = strtolower($item['fakultas']['nama_resmi']);
  $nama_fakultas = $item['fakultas']['nama_resmi'];
  if (!in_array($fakultasId, $fakultasIds)) {
    $fakultasIds[] = $fakultasId;

    $username = "admin_" . $username_admin;
    $plainPassword = generatePassword();

    // Simpan username dan password sebelum di-hash ke array log
    $logData[] = [
        'username' => $username,
        'password' => $plainPassword
    ];

    // Hash password
    $hashedPassword = password_hash($plainPassword, PASSWORD_DEFAULT);

    $email = isset($item['email']) ? $item['email'] : 'default' . $fakultasId . '@example.com';

    $stmt = $conn->prepare("INSERT INTO users (username, password, fakultas_id, nama_fakultas, email) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("ssiss", $username, $hashedPassword, $fakultasId, $nama_fakultas, $email);

    if ($stmt->execute()) {
      echo "User for fakultas_id $fakultasId created successfully.<br>";
    } else {
      echo "Error: " . $stmt->error . "<br>";
    }

    $stmt->close();
  }
}

$logFile = 'user_log.json';
file_put_contents($logFile, json_encode($logData, JSON_PRETTY_PRINT));

$conn->close();
