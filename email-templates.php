
<?php include 'partials/main.php'; ?>

<head>
    <?php
    $title = "Email Templates";
    include 'partials/title-meta.php'; ?>

       <?php include 'partials/head-css.php'; ?>
    </head>

    <body>

        <!-- Begin page -->
        <div id="wrapper">

            <?php include 'partials/menu.php'; ?>

            <!-- ============================================================== -->
            <!-- Start Page Content here -->
            <!-- ============================================================== -->

            <div class="content-page">

                <?php include 'partials/topbar.php'; ?>

                <div class="content">

                    <!-- Start Content-->
                    <div class="container-fluid">
                        
                        <?php
$sub_title = "Email";$title = "Email Templates";
include 'partials/page-title.php'; ?>


                        <div class="row">
                            <div class="col-md-12">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-md-4">
                                                <h4 class="header-title mb-3">Basic action email</h4>
                                                <a href="email-templates-action.php" target="_blank"> <img src="assets/images/email/1.png" class="img-fluid" alt=""> </a>
                                            </div>
                                            <div class="col-md-4">
                                                <h4 class="header-title my-3 mt-md-0">Email alert</h4>
                                                <a href="email-templates-alert.php" target="_blank"> <img src="assets/images/email/2.png" class="img-fluid" alt=""> </a>
                                            </div>
                                            <div class="col-md-4">
                                                <h4 class="header-title my-3 mt-md-0">Billing email</h4>
                                                <a href="email-templates-billing.php" target="_blank"> <img src="assets/images/email/3.png" class="img-fluid" alt=""> </a>
                                            </div>
                                        </div> <!-- end row-->
                                    </div>
                                </div> <!-- end card -->
                            </div> <!-- end col-->
                        </div>    
                        <!-- end row-->
                        
                    </div> <!-- container -->

                </div> <!-- content -->

                <?php include 'partials/footer.php'; ?>

            </div>

            <!-- ============================================================== -->
            <!-- End Page content -->
            <!-- ============================================================== -->


        </div>
        <!-- END wrapper -->

        <?php include 'partials/right-sidebar.php'; ?>
        
        <?php include 'partials/footer-scripts.php'; ?>

    </body>
</html>