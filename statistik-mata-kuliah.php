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
          $title = "Monitoring SikolaV2";
          include 'partials/page-title.php'; ?>

          <div class="row">
            <div class="col-12">
              <div class="card">
                <div class="card-body">
                  <h4 class="mb-3 font-weight-semibold">
                    Filter Data

                  </h4>
                  <div class="row">


                    <div class="col-md-6">
                      <h5 class="font-weight-semibold">Program Studi</h5>

                      <select class="form-control" id="program_studi" name="program_studi" data-toggle="select2" data-width="100%">
                        <option value="" selected disabled>Select Program Studi</option>


                      </select>
                    </div>
                    <div class="col-md-6">
                      <h5 class="font-weight-semibold">Semester</h5>

                      <select class="form-control" data-toggle="select2" id="semester" name="semester" data-width="100%">
                        <option value="" selected disabled>Select Semester</option>


                      </select>
                    </div>
                    <div class="col-md-6">
                      <h5 class="font-weight-semibold">Master Mata Kuliah</h5>

                      <select class="form-control" data-toggle="select2" id="kode_mk[1]" name="kode_mk[1]" data-width="100%">
                        <option value="" selected disabled>Select Master Mata Kuliah</option>


                      </select>
                    </div>
                    <div class="col-md-6">
                      <h5 class="font-weight-semibold">Mata Kuliah Semester</h5>

                      <select class="form-control" data-toggle="select2" data-width="100%" id="id_kelas_kuliah[1]" name="id_kelas_kuliah[1]">
                        <option value="" selected disabled>Select Mata Kuliah Semester</option>


                      </select>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <div class="col-12">
              <div class="card">
                <div class="card-body">
                  <h4 class="font-weight-semibold mb-3">
                    Data

                  </h4>
                  <div class="text-end mb-3">
                    <div class="btn-group mb-2">
                      <button type="button" class="btn btn-sm btn-danger">
                        PDF <i class="fe-download"></i>
                      </button>
                      <button type="button" class="btn btn-sm btn-success">
                        EXCEL <i class="fe-download"></i>
                      </button>
                    </div>
                  </div>


                  <div class="table-responsive">

                    <h4 class="title text-center font-weight-bold"> STATISTIK MATA KULIAH</h4>
                    <h4 class="title text-center" id="judul_prodi"></h4>

                    <table id="table_statistik_matkul" class="table activate-select dt-responsive nowrap w-100">
                      <div class="d-none justify-content-center" id="loader">
                        <div class="spinner-border" role="status"></div>
                      </div>
                      <thead>
                        <tr align="text-center">
                          <th width="10">No</th>
                          <th width="50">Nama Kelas</th>
                          <th>Alur</th>
                          <th>RPS</th>
                          <th>Proyek</th>
                          <th>Tugas</th>
                          <th>Kasus</th>
                          <th>Doc</th>
                          <th>Survey</th>
                          <th>Quiz</th>
                          <th width="30">Forum, Thread, Post</th>
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

  <!-- Init js -->
  <!-- <script src="assets/js/pages/jsgrid.init.js"></script> -->
  <script src="assets/js/form.js"></script>
  <script src="assets/js/pages/datatables.init.js"></script>
  <script src="assets/js/pages/form-advanced.init.js"></script>


</body>

</html>