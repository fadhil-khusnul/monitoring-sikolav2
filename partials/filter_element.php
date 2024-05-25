<?php
// Pastikan sesi telah dimulai


// Ambil nilai fakultas_id dari sesi
$fakultas_id = isset($_SESSION['fakultas_id']) ? $_SESSION['fakultas_id'] : 0;
?>
<div class="col-12">
  <div class="card">
    <div class="card-body">
      <input type="hidden" value="<?php echo htmlspecialchars($fakultas_id); ?>" name="id_fakultas" id="id_fakultas">

      <h4 class="mb-3 font-weight-semibold">
        Filter Data

      </h4>
      <div class="row">
        <div class="col-md-4">
          <h5 class="font-weight-semibold">Semester</h5>

          <select class="form-control" data-toggle="select2" id="semester_select" name="semester_select" data-width="100%" onchange="semester_select_fun()">
            <option value="" selected disabled>Select Semester</option>


          </select>
        </div>

        <div class="col-md-4">
          <h5 class="font-weight-semibold">Program Studi</h5>

          <select class="form-control" data-toggle="select2" id="program_studi" name="program_studi" data-width="100%" onchange="prodi_select_fun()">
            <option value="" selected disabled>Select Program Studi</option>


          </select>
        </div>

        <div class="col-md-4">

          <h5 class="font-weight-semibold">Mata Kuliah Semester</h5>

          <select class="form-control" data-toggle="select2" id="select_mk" name="select_mk" data-width="100%">
            <option value="" selected disabled>Select Mata Kuliah Semester</option>


          </select>
          <!-- <div class="d-flex align-items-center justify-content-between">

                       
                      </div> -->
        </div>
        <div class="col-md-6 d-none">
          <h5 class="font-weight-semibold">Mata Kuliah Semester</h5>

          <select class="form-control" data-toggle="select2" data-width="100%" id="id_kelas_kuliah[1]" name="id_kelas_kuliah[1]">
            <option value="" selected disabled>Select Mata Kuliah Semester</option>


          </select>
        </div>

        <div class="text-end py-4">
          <button id="clear_filter" disabled onclick="clear_filter()" style="margin-right: 10px;" type="button" class="btn btn-danger waves-effect waves-light">Clear
            <i class="mdi mdi-close"></i>
          </button>
          <button id="filter_data" disabled onclick="filter_data(this)" type="button" class="btn btn-primary waves-effect waves-light">
            <span id="btn_spinner" class="spinner-border spinner-border-sm me-1 d-none" role="status" aria-hidden="true"></span>
            Filter Data
            <i class="mdi mdi-filter-variant"></i>
          </button>

        </div>
      </div>

    </div>
  </div>


</div>