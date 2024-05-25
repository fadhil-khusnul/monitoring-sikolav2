<?php include 'partials/main.php'; ?>

<head>
  <?php
  $title = "Presensi | Monitoring SIKOLA 2.0";
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
          $title = "Presensi";
          include 'partials/page-title.php'; ?>

          <div class="row">
            <?php include 'partials/filter_element.php'; ?>

            <div class="col-12">
              <div class="card">
                <div class="card-body">
                  <h4 class="font-weight-semibold mb-3">
                    Data

                  </h4>



                  <h4 class="title text-center font-weight-bold">PRESENSI MATA KULIAH (DOSEN)</h4>
                  <h4 class="title text-center" id="judul_prodi"></h4>



                  <div class="table-responsive">
                    <table id="table_presensi_matkul" class="table table-hover w-100">
                      <thead class="table-light">
                        <tr align="center" valign="top">
                          <th rowspan="2" width="">No</th>
                          <th rowspan="2" width="">Nama Kelas</th>
                          <th colspan="3" style="text-align: center;">Presensi Dosen</th>
                          <th colspan="16" style="text-align: center;">Minggu</th>

                        </tr>
                        <tr>


                          <th style="text-align:center;">Terisi</th>
                          <th style="text-align:center;">Total</th>
                          <th style="text-align:center;">Link</th>


                          <th style="text-align:center;">1</th>
                          <th style="text-align:center;">2</th>
                          <th style="text-align:center;">3</th>
                          <th style="text-align:center;">4</th>
                          <th style="text-align:center;">5</th>
                          <th style="text-align:center;">6</th>
                          <th style="text-align:center;">7</th>
                          <th style="text-align:center;">8</th>
                          <th style="text-align:center;">9</th>
                          <th style="text-align:center;">10</th>
                          <th style="text-align:center;">11</th>
                          <th style="text-align:center;">12</th>
                          <th style="text-align:center;">13</th>
                          <th style="text-align:center;">14</th>
                          <th style="text-align:center;">15</th>
                          <th style="text-align:center;">16</th>



                        </tr>
                      </thead>

                      <tbody>


                      </tbody>
                    </table>
                  </div>
                  <!-- <div class="table-responsive">


                  </div> -->
                  <!-- <div id="jsGrid"></div> -->

                </div>
              </div>
            </div>
            <div class="col-12">
              <div class="card">
                <div class="card-body">
                  <h4 class="font-weight-semibold mb-3">
                    Data

                  </h4>
                  <h4 class="title text-center font-weight-bold">PRESENSI MATA KULIAH (MAHASISWA)</h4>
                  <h4 class="title text-center" id="judul_prodi_mhs"></h4>



                  <div class="table-responsive">
                    <table id="table_presensi_matkul_mhs" class="table table-hover w-100">
                      <thead class="table-light">
                        <tr align="center" valign="top">
                          <th rowspan="2" width="">No</th>
                          <th rowspan="2" width="">Nama Kelas</th>
                          <th colspan="3" style="text-align: center;">Presensi Mahasiswa</th>
                          <th colspan="16" style="text-align: center;">Minggu</th>

                        </tr>
                        <tr>



                          <th style="text-align:center;">Terisi</th>
                          <th style="text-align:center;">Total</th>
                          <th style="text-align:center;">Link</th>


                          <th style="text-align:center;">1</th>
                          <th style="text-align:center;">2</th>
                          <th style="text-align:center;">3</th>
                          <th style="text-align:center;">4</th>
                          <th style="text-align:center;">5</th>
                          <th style="text-align:center;">6</th>
                          <th style="text-align:center;">7</th>
                          <th style="text-align:center;">8</th>
                          <th style="text-align:center;">9</th>
                          <th style="text-align:center;">10</th>
                          <th style="text-align:center;">11</th>
                          <th style="text-align:center;">12</th>
                          <th style="text-align:center;">13</th>
                          <th style="text-align:center;">14</th>
                          <th style="text-align:center;">15</th>
                          <th style="text-align:center;">16</th>



                        </tr>
                      </thead>

                      <tbody>


                      </tbody>
                    </table>
                  </div>
                  <!-- <div class="table-responsive">


                  </div> -->
                  <!-- <div id="jsGrid"></div> -->

                </div>
              </div>
            </div>
            <div class="col-12">
              <div class="card">
                <div class="card-body">
                  <!-- <h4 class="font-weight-semibold mb-3">
                    Kelas yang Bermasalah

                  </h4> -->



                  <div class="table-responsive">
                    <h4 class="title text-center font-weight-bold">PRESENSI MATA KULIAH PRODI YANG BERMASALAH</h4>
                    <h4 class="title text-center" id="judul_prodi_e"></h4>

                    <table id="tabelInforMk" class="table activate-select dt-responsive nowrap w-100">
                      <div class="d-none justify-content-center" id="loader">
                        <div class="spinner-border" role="status"></div>
                      </div>
                      <thead class="table-light">
                        <tr align="center" valign="top">

                          <th width="10">No</th>
                          <th width="">Nama Kelas</th>
                          <th width="">Kendala</th>

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
  <!-- <script src="assets/js/presensi.js"></script> -->
  <script src="<?= 'assets/js/presensi.js?v='. time() ?>"></script>
  <!-- <script src="assets/js/pages/datatables.init.js"></script> -->
  <script src="assets/js/pages/form-advanced.init.js"></script>


</body>

</html>