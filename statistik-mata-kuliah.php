<?php include 'partials/main.php'; ?>

<head>
  <?php
  $title = "Monitoring Sikola";
  include 'partials/title-meta.php'; ?>

  <link href="assets/libs/datatables.net-bs5/css/dataTables.bootstrap5.min.css" rel="stylesheet" type="text/css" />
  <link href="assets/libs/datatables.net-responsive-bs5/css/responsive.bootstrap5.min.css" rel="stylesheet" type="text/css" />
  <link href="assets/libs/datatables.net-buttons-bs5/css/buttons.bootstrap5.min.css" rel="stylesheet" type="text/css" />
  <link href="assets/libs/datatables.net-select-bs5/css//select.bootstrap5.min.css" rel="stylesheet" type="text/css" />
  <!-- third party css end -->

  <!-- JsGrid css -->
  <!-- <link href="assets/libs/jsgrid/jsgrid.min.css" rel="stylesheet" type="text/css" />
  <link href="assets/libs/jsgrid/jsgrid-theme.min.css" rel="stylesheet" type="text/css" /> -->

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
          $title = "Monitoring Sikola";
          include 'partials/page-title.php'; ?>

          <div class="row">
            <div class="col-12">
              <div class="card">
                <div class="card-body">
                  <h4 class="mb-3 font-weight-semibold">
                    Filter Data

                  </h4>
                  <div class="row">
                    <div class="col-md-4">
                      <h5 class="font-weight-semibold">Semester</h5>

                      <select class="form-control" data-toggle="select2" id="semester_select" name="semester_select" data-width="100%" onchange="get_prodi(this)">
                        <option value="" selected disabled>Select Semester</option>


                      </select>
                    </div>

                    <div class="col-md-4">
                      <h5 class="font-weight-semibold">Program Studi</h5>

                      <select class="form-control" id="program_studi" name="program_studi" data-toggle="select2" data-width="100%">
                        <option value="" selected disabled>Select Program Studi</option>


                      </select>
                    </div>

                    <div class="col-md-4">
                      <a href="" target="_blank"></a>
                      <i></i>
                      <h5 class="font-weight-semibold">Mata Kuliah Semester</h5>

                      <select class="form-control" data-toggle="select2" id="select_mk" name="select_mk" data-width="100%">
                        <option value="" selected disabled>Select Mata Kuliah Semester</option>


                      </select>
                    </div>
                    <div class="col-md-6 d-none">
                      <h5 class="font-weight-semibold">Mata Kuliah Semester</h5>

                      <select class="form-control" data-toggle="select2" data-width="100%" id="id_kelas_kuliah[1]" name="id_kelas_kuliah[1]">
                        <option value="" selected disabled>Select Mata Kuliah Semester</option>


                      </select>
                    </div>
                  </div>
                  <div class="d-none justify-content-center" id="loader">
                    <div class="spinner-border" role="status"></div>
                  </div>
                </div>
              </div>


            </div>
            <div class="col-12">
              <!-- Portlet card -->
              <div class="card">
                <div class="card-body">
                  <div class="card-widgets">
                    <a href="javascript: void(0);" data-bs-toggle="reload"><i class="mdi mdi-refresh"></i></a>
                    <a data-bs-toggle="collapse" href="#cardCollpase10" role="button" aria-expanded="false" aria-controls="cardCollpase10"><i class="mdi mdi-minus"></i></a>
                    <a href="javascript: void(0);" data-bs-toggle="remove"><i class="mdi mdi-close"></i></a>
                  </div>
                  <h4 class="header-title mb-0">Grafik</h4>

                  <div id="cardCollpase10" class="collapse show" dir="ltr">
                    <div id="apex-column-2" class="apex-charts pt-3" data-colors="#077AC3,#1abc9c,#f672a7"></div>
                  </div> <!-- collapsed end -->
                </div> <!-- end card-body -->
              </div> <!-- end card-->
            </div>

            <div class="col-12">
              <div class="card">
                <div class="card-body">
                  <h4 class="font-weight-semibold mb-3">
                    Data

                  </h4>
                  <!-- <div class="text-end mb-3">
                    <div class="btn-group mb-2">
                      <button type="button" class="btn btn-sm btn-danger">
                        PDF <i class="fe-download"></i>
                      </button>
                      <button type="button" class="btn btn-sm btn-success">
                        EXCEL <i class="fe-download"></i>
                      </button>
                    </div>
                  </div> -->


                  <div class="table-responsive">

                    <h4 class="title text-center font-weight-bold"> STATISTIK MATA KULIAH</h4>
                    <h4 class="title text-center" id="judul_prodi"></h4>

                    <table id="table_statistik_matkul" class="table activate-select dt-responsive nowrap w-100">

                      <thead class="table-light">
                        <tr align="center" valign="top">
                          <th rowspan="2" width="10">No</th>
                          <th rowspan="2" width="50">Nama Kelas</th>
                          <th colspan="2">Alur Pembelajaran</th>
                          <th rowspan="2">RPS</th>
                          <th rowspan="2">Proyek</th>
                          <th rowspan="2">Tugas</th>
                          <th rowspan="2">Kasus/Url</th>
                          <th rowspan="2">Doc</th>
                          <th rowspan="2">Survey</th>
                          <th rowspan="2">Quiz</th>
                          <th rowspan="2">Forum, Thread, Post</th>
                          <th rowspan="2">Reports</th>
                        </tr>
                        <tr align="center">

                          <th>Terisi</th>
                          <th>Total</th>

                        </tr>
                      </thead>

                      <tbody>

                      </tbody>
                    </table>

                  </div>
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
  <!-- <script src="assets/libs/jsgrid/jsgrid.min.js"></script> -->
  <script src="assets/libs/select2/js/select2.min.js"></script>

  <script src="assets/libs/apexcharts/apexcharts.min.js"></script>
  <script src="https://apexcharts.com/samples/assets/irregular-data-series.js"></script>
  <script src="https://apexcharts.com/samples/assets/ohlc.js"></script>

  <!-- init js -->
  <script src="assets/js/pages/apexcharts.init.js"></script>

  <!-- Init js -->
  <!-- <script src="assets/js/pages/jsgrid.init.js"></script> -->
  <script src="assets/js/form.js"></script>
  <!-- <script src="assets/js/pages/datatables.init.js"></script> -->
  <script src="assets/js/pages/form-advanced.init.js"></script>


</body>

</html>