
<?php include 'partials/main.php'; ?>

<head>
    <?php
    $title = "Loading Buttons | Ladda";
    include 'partials/title-meta.php'; ?>

        <!-- Loading button css -->
        <link href="assets/libs/ladda/ladda.min.css" rel="stylesheet" type="text/css" />
        <link href="assets/libs/ladda/ladda-themeless.min.css" rel="stylesheet" type="text/css" />

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
$sub_title = "Extended UI";$title = "Loading Buttons";
include 'partials/page-title.php'; ?>

                        <div class="row">
                            <div class="col-12">
                                <div class="card">
                                    <div class="card-body">
                                        <h4 class="header-title">Examples</h4>
                                        <p class="sub-header">
                                            Buttons with built-in loading indicators. 
                                        </p>

                                        <div class="row text-center">
                                            <div class="col-sm-6 col-xl-3">
                                                <div class="p-3">
                                                    <h5 class="text-muted">Expand-left</h5>
                                                    <button class="ladda-button btn btn-primary" dir="ltr" data-style="expand-left">
                                                        Submit
                                                    </button>
                                                </div>
                                            </div>
                                            <div class="col-sm-6 col-xl-3">
                                                <div class="p-3">
                                                    <h5 class="text-muted">Expand-right</h5>
                                                    <button class="ladda-button btn btn-primary" dir="ltr" data-style="expand-right">
                                                        Submit
                                                    </button>
                                                </div>
                                            </div>
                                            <div class="col-sm-6 col-xl-3">
                                                <div class="p-3">
                                                    <h5 class="text-muted">Expand-up</h5>
                                                    <button class="ladda-button btn btn-primary" dir="ltr" data-style="expand-up">Submit
                                                    </button>
                                                </div>
                                            </div>
                                            <div class="col-sm-6 col-xl-3">
                                                <div class="p-3">
                                                    <h5 class="text-muted">Expand-down</h5>
                                                    <button class="ladda-button btn btn-primary" dir="ltr" data-style="expand-down">
                                                        Submit
                                                    </button>
                                                </div>
                                            </div>
                                        </div> <!-- end row -->

                                        <div class="row text-center">
                                            <div class="col-sm-6 col-xl-3">
                                                <div class="p-3">
                                                    <h5 class="text-muted">Contract</h5>
                                                    <button class="ladda-button btn btn-warning" dir="ltr" data-style="contract">Submit
                                                    </button>
                                                </div>
                                            </div>
                                            <div class="col-sm-6 col-xl-3">
                                                <div class="p-3">
                                                    <h5 class="text-muted">Zoom-in</h5>
                                                    <button class="ladda-button btn btn-warning" dir="ltr" data-style="zoom-in">Submit
                                                    </button>
                                                </div>
                                            </div>
                                            <div class="col-sm-6 col-xl-3">
                                                <div class="p-3">
                                                    <h5 class="text-muted">Zoom-out</h5>
                                                    <button class="ladda-button btn btn-warning" dir="ltr" data-style="zoom-out">Submit
                                                    </button>
                                                </div>
                                            </div>
                                        </div> <!-- end row -->

                                        <div class="row text-center">
                                            <div class="col-sm-6 col-xl-3">
                                                <div class="p-3">
                                                    <h5 class="text-muted">Slide-left</h5>
                                                    <button class="ladda-button  btn btn-info" dir="ltr" data-style="slide-left">Submit
                                                    </button>
                                                </div>
                                            </div>
                                            <div class="col-sm-6 col-xl-3">
                                                <div class="p-3">
                                                    <h5 class="text-muted">Slide-right</h5>
                                                    <button class="ladda-button btn btn-info" dir="ltr" data-style="slide-right">Submit
                                                    </button>
                                                </div>
                                            </div>
                                            <div class="col-sm-6 col-xl-3">
                                                <div class="p-3">
                                                    <h5 class="text-muted">Slide-up</h5>
                                                    <button class="ladda-button btn btn-info" dir="ltr" data-style="slide-up">Submit
                                                    </button>
                                                </div>
                                            </div>
                                            <div class="col-sm-6 col-xl-3">
                                                <div class="p-3">
                                                    <h5 class="text-muted">Slide-down</h5>
                                                    <button class="ladda-button btn btn-info" dir="ltr" data-style="slide-down">Submit
                                                    </button>
                                                </div>
                                            </div>
                                        </div> <!-- end row -->

                                        <div class="row text-center">
                                            <div class="col-sm-6 col-xl-3">
                                                <div class="p-3">
                                                    <section class="progress-demo">
                                                        <h5 class="text-muted">Expand-right</h5>
                                                        <button class="ladda-button btn btn-danger" dir="ltr" data-style="expand-right">
                                                            Submit
                                                        </button>
                                                    </section>
                                                </div>
                                            </div>
                                            <div class="col-sm-6 col-xl-3">
                                                <div class="p-3">
                                                    <section class="progress-demo">
                                                        <h5 class="text-muted">Contract</h5>
                                                        <button class="ladda-button btn btn-danger" dir="ltr" data-style="contract">
                                                            Submit
                                                        </button>
                                                    </section>
                                                </div>
                                            </div>
                                            <div class="col-sm-6 col-xl-3">
                                                <div class="p-3">
                                                    <section class="progress-demo">
                                                        <h5 class="text-muted">Demo how to use with api services</h5>
                                                        <button class="ladda-button ladda-button-demo btn btn-success" dir="ltr" data-style="zoom-in">Submit</button>
                                                    </section>
                                                </div>
                                            </div>
                                        </div> <!-- end row -->
                                    </div>
                                </div> <!-- end card -->
                            </div> <!-- end col -->
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

        <!-- Loading buttons js -->
        <script src="assets/libs/ladda/spin.min.js"></script>
        <script src="assets/libs/ladda/ladda.min.js"></script>

        <!-- Buttons init js-->
        <script src="assets/js/pages/loading-btn.init.js"></script>

        
    </body>
</html>