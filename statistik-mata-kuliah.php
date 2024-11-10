<?php

include 'partials/main.php';
?>

<head>
  <?php
  $title = "Statistik | Monitoring SIKOLA 2.0";
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
  <link href="https://unpkg.com/tabulator-tables/dist/css/tabulator_semanticui.min.css" rel="stylesheet">


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
          $title = "Statistik";
          include 'partials/page-title.php'; ?>

          <div class="row">
            <?php include 'partials/filter_element.php'; ?>


            <div class="col-6">
              <!-- Portlet card -->
              <div class="card">
                <div class="card-body">
                  <div class="card-widgets">
                    <a href="javascript: void(0);" data-bs-toggle="reload"><i class="mdi mdi-refresh"></i></a>
                    <a data-bs-toggle="collapse" href="#cardCollpase10" role="button" aria-expanded="false" aria-controls="cardCollpase10"><i class="mdi mdi-minus"></i></a>
                    <a href="javascript: void(0);" data-bs-toggle="remove"><i class="mdi mdi-close"></i></a>
                  </div>
                  <h4 class="header-title mb-0">Bar Chart</h4>

                  <div id="cardCollpase10" class="collapse show" dir="ltr">
                    <div id="apex-column-2" class="apex-charts pt-3" data-colors="#008ffb,#00e396,#feb019,#ff4560,#775dd0,#ffe200,#798385,#B56C79,#F1556C"></div>
                  </div> <!-- end card-body -->
                </div> <!-- end card-->
              </div>
            </div>

            <div class="col-6">
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
                    <div id="apex-pie-1" class="apex-charts pt-3" data-colors="#008ffb,#00e396,#feb019,#ff4560,#775dd0,#ffe200,#798385,#B56C79,#F1556C"></div>
                  </div> <!-- collapsed end -->
                </div> <!-- end card-body -->
              </div> <!-- end card-->
            </div>

            <div class="col-12 d-none" id="grafik_kelas">
              <!-- Portlet card -->
              <div class="card">
                <div class="card-body">
                  <div class="card-widgets">
                    <a href="javascript: void(0);" data-bs-toggle="reload"><i class="mdi mdi-refresh"></i></a>
                    <a data-bs-toggle="collapse" href="#cardCollpase10" role="button" aria-expanded="false" aria-controls="cardCollpase10"><i class="mdi mdi-minus"></i></a>
                    <a href="javascript: void(0);" data-bs-toggle="remove"><i class="mdi mdi-close"></i></a>
                  </div>
                  <h4 class="header-title mb-0 text-center" id="juduL_kelas"></h4>

                  <div id="cardCollpase10" class="collapse show" dir="ltr">
                    <div id="apex-column-1" class="apex-charts pt-3" data-colors="#008ffb,#00e396,#feb019,#ff4560,#775dd0,#ffe200,#798385,#B56C79,#F1556C"></div>
                  </div>
                </div> 
              </div>
            </div>



            <div class="col-lg-12">
              <div class="card">
                <div class="card-body">
                  <h4 class="font-weight-semibold mb-3">
                    Data
                  </h4>
                  <h4 class="title text-center font-weight-bold">STATISTIK MATA KULIAH</h4>
                  <h4 class="title text-center" id="ajaran"></h4>
                  <h4 class="title text-center" id="judul_prodi"></h4>

                  <div class="text-end">
                      <button class="btn btn-sm btn-success " id="download-xlsx"> <i class="mdi mdi-microsoft-excel"></i> xlsx</button>
                      <button class="btn btn-sm btn-danger " id="download-pdf"> <i class="mdi mdi-file-pdf-box"></i> pdf</button>
                  </div>

                  <div class="table-responsive">
                    <div id="tabelStatistik"></div>
                  </div>
                  

                

                  

                  

  
                </div>
              </div>
            </div>

          </div>

          <div class="modal fade" id="modal_grafik" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-xl">
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title" id="myCenterModalLabel">Grafik</h4>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <div class="row">
                    <div class="col-md-6">

                      <h4 class="header-title mb-0">Bar Chart</h4>

                      <div id="cardCollpase10" class="collapse show" dir="ltr">
                        <div id="apex-column-modal" class="apex-charts pt-3" data-colors="#077AC3,#4fc6e1,#4892B5,#405D88,#4A81D4,#00B19D,#798385,#B56C79,#F1556C"></div>
                      </div> <!-- collapsed end -->
                    </div>

                    <div class="col-md-6">
                      <h4 class="header-title mb-0">Pie Chart</h4>

                      <div class="collapse show" dir="ltr">
                        <div id="apex-pie-modal" class="apex-charts pt-3" data-colors="#077AC3,#4fc6e1,#4892B5,#405D88,#4A81D4,#00B19D,#798385,#B56C79,#F1556C"></div>
                      </div> <!-- collapsed end -->
                    </div>

                  </div>



                </div>
              </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
          </div><!-- /.modal -->


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
  <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js" integrity="sha512-r22gChDnGvBylk90+2e/ycr3RVrDi8DIOkIGNhJlKfuyQM4tIRAI062MaV8sfjQKYVGjOBaZBOA87z+IhZE9DA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script src="assets/libs/jsgrid/jsgrid.min.js"></script>
  <script src="assets/libs/select2/js/select2.min.js"></script>

  <script src="assets/libs/apexcharts/apexcharts.min.js"></script>
  <script type="text/javascript" src="https://unpkg.com/tabulator-tables/dist/js/tabulator.min.js"></script>
  <script type="text/javascript" src="https://oss.sheetjs.com/sheetjs/xlsx.full.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.4.0/jspdf.umd.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.20/jspdf.plugin.autotable.min.js"></script>
  <!-- Init js -->
  <script  src="<?= 'assets/js/form.js?v=' . time() ?>"></script>
  <!-- <script src="assets/js/pages/datatables.init.js"></script> -->
  <script src="assets/js/pages/form-advanced.init.js"></script>


</body>

</html>