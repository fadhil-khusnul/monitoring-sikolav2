
<?php include 'partials/main.php'; ?>

<head>
    <?php
    $title = "Quilljs Editors";
    include 'partials/title-meta.php'; ?>

        <!-- Plugins css -->
        <link href="assets/libs/quill/quill.core.css" rel="stylesheet" type="text/css" />
        <link href="assets/libs/quill/quill.bubble.css" rel="stylesheet" type="text/css" />
        <link href="assets/libs/quill/quill.snow.css" rel="stylesheet" type="text/css" />

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
$sub_title = "Forms";$title = "Quilljs Editor";
include 'partials/page-title.php'; ?>

                        <div class="row">
                            <div class="col-12">
                                <div class="card">
                                    <div class="card-body">
                                        <h4 class="header-title">Snow Editor</h4>
                                        <p class="sub-header">Snow is a clean, flat toolbar theme.</p>

                                        <div id="snow-editor" style="height: 300px;">
                                            <h3><span class="ql-size-large">Hello World!</span></h3>
                                            <p><br></p>
                                            <h3>This is an simple editable area.</h3>
                                            <p><br></p>
                                            <ul>
                                                <li>
                                                    Select a text to reveal the toolbar.
                                                </li>
                                                <li>
                                                    Edit rich document on-the-fly, so elastic!
                                                </li>
                                            </ul>
                                            <p><br></p>
                                            <p>
                                                End of simple area
                                            </p>

                                        </div> <!-- end Snow-editor-->
                                    </div> <!-- end card-body-->
                                </div> <!-- end card-->
                            </div><!-- end col -->
                        </div>
                        <!-- end row -->  

                        <div class="row">
                            <div class="col-12">
                                <div class="card">
                                    <div class="card-body">
                                        <h4 class="header-title">Bubble Editor</h4>
                                        <p class="sub-header">Bubble is a simple tooltip based theme.</p>

                                        <div id="bubble-editor" style="height: 300px;">
                                            <h3><span class="ql-size-large">Hello World!</span></h3>
                                            <p><br></p>
                                            <h3>This is an simple editable area.</h3>
                                            <p><br></p>
                                            <ul>
                                                <li>
                                                    Select a text to reveal the toolbar.
                                                </li>
                                                <li>
                                                    Edit rich document on-the-fly, so elastic!
                                                </li>
                                            </ul>
                                            <p><br></p>
                                            <p>
                                                End of simple area
                                            </p>
                                        </div> <!-- end Snow-editor-->
                                    </div> <!-- end card-body-->
                                </div> <!-- end card-->
                            </div><!-- end col -->
                        </div>
                        <!-- end row -->  
                        
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

        <!-- Plugins js -->
        <script src="assets/libs/quill/quill.min.js"></script>

        <!-- Init js-->
        <script src="assets/js/pages/form-quilljs.init.js"></script>

        
    </body>
</html>