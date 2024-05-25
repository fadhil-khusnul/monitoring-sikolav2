<?php
session_start();
include 'connect.php';

$error = '';
if (isset($_SESSION['error_message'])) {
  $error = $_SESSION['error_message'];
  unset($_SESSION['error_message']);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  $username = $_POST['username'];
  $password = $_POST['password'];

  // echo $password;

  // Prepare and bind
  $stmt = $conn->prepare("SELECT id, username, password, fakultas_id, email, nama_fakultas FROM users WHERE username = ?");
  $stmt->bind_param("s", $username);
  $stmt->execute();
  $stmt->store_result();

  // Check if username exists
  if ($stmt->num_rows > 0) {
    $stmt->bind_result($id, $username, $hashed_password, $fakultas_id, $email, $nama_fakultas);
    $stmt->fetch();

    if ($password === $hashed_password) {
      // Store data in session variables
      $_SESSION['loggedin'] = true;
      $_SESSION['id'] = $id;
      $_SESSION['username'] = $username;
      $_SESSION['fakultas_id'] = $fakultas_id;
      $_SESSION['email'] = $email;
      $_SESSION['nama_fakultas'] = $nama_fakultas;

      echo "<script>
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = 'index.php';
      </script>";
      exit;

      // Redirect user to welcome page
      // header("location: index.php");
      // echo "<script> localStorage.clear(); sessionStorage.clear(); </script>";

    } else {
      $error = "Invalid password.";
    }
  } else {
    $error = "No account found with that username.";
  }
  $stmt->close();
  $conn->close();
}

// if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {

//   header("location: login.php");
//   $error = "Silahkan Login Terlebih Dahulu..";
//   exit;
// }
