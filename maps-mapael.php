
<?php include 'partials/main.php'; ?>

<head>
    <?php
    $title = "Mapeal Maps";
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
$sub_title = "Maps";$title = "Mapeal Maps";
include 'partials/page-title.php'; ?>


                        <div class="row">
                            <div class="col-12">
                                <div class="card">
                                    <div class="card-body">
                                        <h4 class="header-title mb-3">Map with a legend where slices are specified with a fixed value instead of min and max values</h4>
                                        <div class="row justify-content-center" dir="ltr">
                                            <div class="col-md-6">
                                                <div class="map-usa">
                                                    <div class="map">
                                                        <span>Alternative content for the map</span>
                                                    </div>
                                                    <div class="plotLegend">
                                                        <span>Alternative content for the legend</span>
                                                    </div>
                                                </div>
                                            </div> <!-- end col-->
                                        </div> <!-- end row-->
                                    </div>
                                </div> <!-- end card-->
                            </div> <!-- end col-->
                        </div>
                        <!-- end row-->

                        <div class="row">
                            <div class="col-12">
                                <div class="card">
                                    <div class="card-body">
                                        <h4 class="header-title mb-3">Map with links between the plotted cities</h4>
                                        <div class="mapcontainer">
                                            <div class="map">
                                                <span>Alternative content for the map</span>
                                            </div>
                                        </div>
                                    </div>
                                </div> <!-- end card-->
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

        <!-- Plugins js-->
        <script src="assets/libs/raphael/raphael.min.js"></script>
        <script src="assets/libs/jquery-mapael/js/jquery.mapael.min.js"></script>
        <script src="assets/libs/jquery-mapael/js/maps/world_countries.min.js"></script>
        <script src="assets/libs/jquery-mapael/js/maps/usa_states.min.js"></script>

        <!-- Init js-->
        <script src="assets/js/pages/mapeal-maps.init.js"></script>
        
    </body>
</html>