<?php include 'partials/main.php'; ?>

<head>
  <?php
  $title = "Nilai | Monitoring SIKOLA 2.0";
  include 'partials/title-meta.php'; ?>

  <link href="assets/libs/datatables.net-bs5/css/dataTables.bootstrap5.min.css" rel="stylesheet" type="text/css" />
  <link href="assets/libs/datatables.net-responsive-bs5/css/responsive.bootstrap5.min.css" rel="stylesheet" type="text/css" />
  <link href="assets/libs/datatables.net-buttons-bs5/css/buttons.bootstrap5.min.css" rel="stylesheet" type="text/css" />
  <link href="assets/libs/datatables.net-select-bs5/css//select.bootstrap5.min.css" rel="stylesheet" type="text/css" />
  <!-- third party css end -->

  <!-- JsGrid css -->
  <link href="assets/libs/jsgrid/jsgrid.min.css" rel="stylesheet" type="text/css" />
  <link href="assets/libs/jsgrid/jsgrid-theme.min.css" rel="stylesheet" type="text/css" />

  <link href="assets/libs/select2/css/select2.min.css" rel="stylesheet" type="text/css" />

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
          $sub_title = "Report";
          $title = "Nilai";
          include 'partials/page-title.php'; ?>

          <div class="row">
          <?php include 'partials/filter_element.php'; ?>

          <div class="col-4">
              <!-- Portlet card -->
              <div class="card">
                <div class="card-body">
                  <div class="card-widgets">
                    <a href="javascript: void(0);" data-bs-toggle="reload"><i class="mdi mdi-refresh"></i></a>
                    <a data-bs-toggle="collapse" href="#cardCollpase18" role="button" aria-expanded="false" aria-controls="cardCollpase18"><i class="mdi mdi-minus"></i></a>
                    <a href="javascript: void(0);" data-bs-toggle="remove"><i class="mdi mdi-close"></i></a>
                  </div>
                  <h4 class="header-title mb-0">Pie Chart</h4>

                  <div id="cardCollpase18" class="collapse show" dir="ltr">
                    <div id="apex-pie-1" class="apex-charts pt-3" data-colors="#00e396,#ff4560"></div>
                  </div> <!-- collapsed end -->
                </div> <!-- end card-body -->
              </div> <!-- end card-->
            </div>

            <div class="col-8">
              <div class="card">
                <div class="card-body">
                  <h4 class="font-weight-semibold mb-3">
                    Data NILAI

                  </h4>



                  <h4 class="title text-center font-weight-bold">NILAI MATA KULIAH</h4>
                  <h4 class="title text-center" id="ajaran"></h4>
                  <h4 class="title text-center" id="judul_prodi"></h4>



                  <div class="table-responsive">
                    <div id="tabelNilai">

                    </div>

                

                  </div>
                  <!-- <div class="table-responsive">


                  </div> -->
                  <!-- <div id="jsGrid"></div> -->

                </div>
              </div>
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



  <?php include 'partials/footer-scripts.php'; ?>


  <!-- third party js -->
  <script src="assets/libs/datatables.net/js/jquery.dataTables.min.js"></script>
  <script src="assets/libs/datatables.net-bs5/js/dataTables.bootstrap5.min.js"></script>
  <script src="assets/libs/datatables.net-responsive/js/dataTables.responsive.min.js"></script>
  <script src="assets/libs/datatables.net-responsive-bs5/js/responsive.bootstrap5.min.js"></script>
  <script src="assets/libs/datatables.net-buttons/js/dataTables.buttons.min.js"></script>
  <script src="assets/libs/datatables.net-buttons-bs5/js/buttons.bootstrap5.min.js"></script>
  <script src="assets/libs/datatables.net-buttons/js/buttons.html5.min.js"></script>
  <script src="assets/libs/datatables.net-buttons/js/buttons.flash.min.js"></script>
  <script src="assets/libs/datatables.net-buttons/js/buttons.print.min.js"></script>
  <script src="assets/libs/datatables.net-keytable/js/dataTables.keyTable.min.js"></script>
  <script src="assets/libs/datatables.net-select/js/dataTables.select.min.js"></script>
  <script src="assets/libs/pdfmake/build/pdfmake.min.js"></script>
  <script src="assets/libs/pdfmake/build/vfs_fonts.js"></script>
  <!-- third party js ends -->

  <!-- Datatables init -->

  <!-- JsGrid js -->
  <script src="assets/libs/jsgrid/jsgrid.min.js"></script>
  <script src="assets/libs/select2/js/select2.min.js"></script>
  <script src="assets/libs/apexcharts/apexcharts.min.js"></script>

  <!-- Init js -->
  <!-- <script src="assets/js/pages/jsgrid.init.js"></script> -->
  <script src="<?= 'assets/js/nilaiKelas.js?v='. time() ?>"></script>
  <!-- <script src="assets/js/pages/datatables.init.js"></script> -->
  <script src="assets/js/pages/form-advanced.init.js"></script>


</body>

</html>