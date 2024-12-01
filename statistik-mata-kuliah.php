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
  <!-- <link href="assets/libs/jsgrid/jsgrid.min.css" rel="stylesheet" type="text/css" /> -->
  <!-- <link href="assets/libs/jsgrid/jsgrid-theme.min.css" rel="stylesheet" type="text/css" /> -->

  <link href="assets/libs/bootstrap-table/bootstrap-table.min.css" rel="stylesheet" type="text/css" />


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
                    <a data-bs-toggle="collapse" href="#cardCollpase11" role="button" aria-expanded="false" aria-controls="cardCollpase11"><i class="mdi mdi-minus"></i></a>
                    <!-- <a href="javascript: void(0);" data-bs-toggle="remove"><i class="mdi mdi-close"></i></a> -->
                  </div>
                  <h4 class="header-title mb-0">Bar Chart Matakuliah</h4>

                  <div id="cardCollpase11" class="collapse show" dir="ltr">
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
                    <!-- <a href="javascript: void(0);" data-bs-toggle="remove"><i class="mdi mdi-close"></i></a> -->
                  </div>
                  <h4 class="header-title mb-0">Pie Chart Matakuliah</h4>

                  <div id="cardCollpase18" class="collapse show" dir="ltr">
                    <div id="apex-pie-1" class="apex-charts pt-3" data-colors="#008ffb,#00e396,#feb019,#ff4560,#775dd0,#ffe200,#798385,#B56C79,#F1556C"></div>
                  </div> <!-- collapsed end -->
                </div> <!-- end card-body -->
              </div> <!-- end card-->
            </div>

            <div class="col-lg-12 d-none" id="tab_perKelas">
              <div class="card">
                <div class="card-body">
                  <h4 class="header-title mb-4 text-center" id="judul_tab_kelas"></h4>

                  <div class="row">
                    <div class="col-sm-3">


                      <ul class="nav flex-column nav-pills nav-pills-tabs" id="nav-tabs-kelas" role="tablist" aria-orientation="vertical">


                      </ul>


                    </div>

                    <div class="col-sm-9">

                      <div class="tab-content pt-0" id="tab-content-kelas">

                      </div>



                    </div>
                  </div>


                </div>
              </div>
            </div>

            <div class="col-12 d-none" id="grafik_kelas">
              <!-- Portlet card -->
              <div class="card">
                <div class="card-body">
                  <div class="card-widgets">
                    <a href="javascript: void(0);" data-bs-toggle="reload"><i class="mdi mdi-refresh"></i></a>
                    <a data-bs-toggle="collapse" href="#cardCollpase10" role="button" aria-expanded="false" aria-controls="cardCollpase10"><i class="mdi mdi-minus"></i></a>
                    <!-- <a href="javascript: void(0);" data-bs-toggle="remove"><i class="mdi mdi-close"></i></a> -->
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

                  

                  <div class="d-flex gap-2 p-3 align-content-end">
                    <select id="filterDosen" class="form-control" style="max-width: 400px;">
                      <option value="">-- Pilih Dosen --</option>
                    </select>
                    <button id="clearFilter" class="btn btn-primary waves-effect waves-light"><i class="mdi mdi-close"></i></button>

                    <button class="btn btn-sm btn-success " id="download-xlsx"> <i class="mdi mdi-microsoft-excel"></i> xlsx</button>
                    <button class="btn btn-sm btn-danger " id="download-pdf"> <i class="mdi mdi-file-pdf-box"></i> pdf</button>
                  </div>



                  <table
                    id="tableStatistikB"
                    data-toggle="table"
                    data-height="900"
                    data-page-size="25"
                    data-pagination="true">
                    <thead class="table-light">
                      <tr>
                        <th data-field="No" data-sortable="true" rowspan="2">No</th>
                        <th data-field="Nama Kelas" data-sortable="true" data-searchable="true">Nama Kelas</th>
                        <th data-field="Dosen" data-sortable="true" data-searchable="true">Dosen</th>
                        <th data-field="Alur Pembelajaran Terisi" data-sortable="true" rowspan="2">Alur Terisi</th>
                        <th data-field="Alur Pembelajaran Total" data-sortable="true" rowspan="2">Total Alur</th>
                        <th data-field="RPS" data-sortable="true" rowspan="2">RPS</th>
                        <th data-field="Tugas" data-sortable="true" rowspan="2">Tugas</th>
                        <th data-field="Doc" data-sortable="true" rowspan="2">Doc</th>
                        <th data-field="Survey" data-sortable="true" rowspan="2">Survey</th>
                        <th data-field="Quiz" data-sortable="true" rowspan="2">Quiz</th>
                        <th data-field="Forum" data-sortable="true" rowspan="2">Forum</th>
                        <th data-field="Report" data-sortable="true" rowspan="2">Reports</th>
                      </tr>
                      <tr>
                        <!-- <th>
                          <input type="text" class="form-control" placeholder="Search Nama Kelas" id="searchNamaKelas" /></th>
                        <th>
                          <input type="text" class="form-control" placeholder="Search Dosen" id="searchDosen" />
                        </th> -->

                      </tr>
                    </thead>
                  </table>






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

  <script src="assets/libs/bootstrap-table/bootstrap-table.min.js"></script>
  <script src="assets/libs/bootstrap-table/extensions/export/bootstrap-table-export.min.js"></script>

  <script src="assets/js/pages/bootstrap-tables.init.js"></script>

  <script src="<?= 'assets/js/form.js?v=' . time() ?>"></script>
  <!-- <script src="assets/js/pages/datatables.init.js"></script> -->
  <script src="assets/js/pages/form-advanced.init.js"></script>


</body>

</html>