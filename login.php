<!DOCTYPE html>
<html lang="en">
<?php include 'services/auth.php' ?>

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="shortcut icon" href="assets/images/logo-unhas.png">
  <title>Log In | Monitoring SIKOLA 2.0</title>

  <!-- Font Icon -->
  <link rel="stylesheet" href="assets/login/fonts/material-icon/css/material-design-iconic-font.min.css">

  <!-- Main css -->
  <link rel="stylesheet" href="assets/login/css/style.css">
</head>

<body>

  <div class="main">

    <!-- Sign up form -->
    <section class="signup">
      <div class="container">
        <div class="signup-content">
          <div class="signup-form">
            <h2 class=>Log In</h2>
            <h4 class="form-title">Website Monitoring SIKOLA 2.0</h4>

            <form method="POST" class="register-form" id="register-form">
              <div class="form-group">
                <label for="name"><i class="zmdi zmdi-account material-icons-name"></i></label>
                <input type="text" name="username" id="username" placeholder="Username" />
              </div>

              <div class="form-group">
                <label for="pass"><i class="zmdi zmdi-lock"></i></label>
                <input type="password" name="password" id="password" placeholder="Password" />
              </div>
              <?php
              if (!empty($error)) {
                echo '<div class="alert">' . $error . '</div>';
              }
              ?>

              <div class="form-group form-button">
                <input type="submit" name="signup" id="signup" class="form-submit" value="Log In" />
              </div>


            </form>
          </div>
          <div class="signup-image">
            <figure><img src="assets/login/images/sigin.png" alt="sing up image"></figure>
          </div>
        </div>
      </div>
    </section>



  </div>

  <!-- JS -->

</body>

</html>