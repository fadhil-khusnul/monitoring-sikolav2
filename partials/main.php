<?php

if (session_status() === PHP_SESSION_NONE) {
  session_start();
}
// session_start();
// $error = '';

// Check if the user is logged in, if not then redirect him to login page
if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
  $_SESSION['error_message'] = "Silahkan login terlebih dahulu.";
  header("location: login.php");
  exit;
}

?>

<!DOCTYPE html>
<html lang="en" data-layout-mode="detached" data-topbar-color="dark" data-sidenav-user="true" data-sidenav-size="default">