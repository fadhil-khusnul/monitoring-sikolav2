
<?php include 'partials/main.php'; ?>

<head>
    <?php
    $title = "Material Symbols Icons (Google Icon)";
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
$sub_title = "Icons";$title = "Material Symbols Icons (Google Icon)";
include 'partials/page-title.php'; ?>
                        <!-- end page title -->

                        <div class="row icons-list-demo">
                            <div class="col-12">
                                <div class="card">
                                    <div class="card-body">
                                        <h4 class="header-title mb-4">All Icons<a class="badge badge-soft-primary ms-2" href="https://fonts.google.com/icons" target="_blank">Google Icon</a></h4>
                                        <div class="row icon-list-demo" id="icons"> </div>
                                    </div> <!-- end card-body -->
                                </div> <!-- end card -->
                            </div>
                        </div>

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

        <!-- custom dmeo js-->
        <script src="assets/js/pages/material-symbols.init.js"></script>

        
    </body>
</html>