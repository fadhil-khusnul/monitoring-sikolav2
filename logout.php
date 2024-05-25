<?php
session_start();
$_SESSION = array();
session_destroy();

echo "<script>
localStorage.clear();
sessionStorage.clear();
window.location.href = 'login.php';
</script>";
// header("location: login.php");
exit;
?>