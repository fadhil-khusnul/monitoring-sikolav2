// let fieldsJs = []




$("#semester_select, #program_studi_presensi, #select_mk").select2()


// let tableStatistik = $("#table_presensi_matkul_mhs").jsGrid({
//     width: "100%",
//     height: "800px",

//     inserting: false,
//     editing: false,
//     // sorting: true,
//     paging: true,
//     filtering: !0,
//     searching: !0,
//     autoload: true,
//     pageSize: 20,
//     pageButtonCount: 15,

//     data: [], // Data yang akan diisi nanti


//     fields: [
//         { name: "No", type: "number", width: 50, filtering: false },
//         { name: "Nama Kelas", type: "text", width: 150, filtering: true },
//         { name: "Report Actitivity", type: "text", width: 150, filtering: false },
//         { name: "Nama Mahasiswa", type: "text", width: 200 },
//         { name: "Total Aktifitas", type: "number", width: 100, filtering: false },
//         // Tambahkan field untuk setiap minggu
//         { name: "1", type: "text", width: 50, filtering: false },
//         { name: "2", type: "text", width: 50, filtering: false },
//         { name: "3", type: "text", width: 50, filtering: false },
//         { name: "4", type: "text", width: 50, filtering: false },
//         { name: "5", type: "text", width: 50, filtering: false },
//         { name: "6", type: "text", width: 50, filtering: false },
//         { name: "7", type: "text", width: 50, filtering: false },
//         { name: "8", type: "text", width: 50, filtering: false },
//         { name: "9", type: "text", width: 50, filtering: false },
//         { name: "10", type: "text", width: 50, filtering: false },
//         { name: "11", type: "text", width: 50, filtering: false },
//         { name: "12", type: "text", width: 50, filtering: false },
//         { name: "13", type: "text", width: 50, filtering: false },
//         { name: "14", type: "text", width: 50, filtering: false },
//         { name: "15", type: "text", width: 50, filtering: false },
//         { name: "16", type: "text", width: 50, filtering: false },
//         { name: "17", type: "text", width: 50, filtering: false },
//         { name: "18", type: "text", width: 50, filtering: false }
//     ],
//     // contollr
//     onRefreshed: function(args) {
//         var $gridData = $("#table_presensi_matkul_mhs .jsgrid-grid-body tbody");
//         var $headerRow = $("#table_presensi_matkul_mhs .jsgrid-header-row");

//         // $headerRow.html(""); // Kosongkan header row

//         // // Tambahkan header dengan rowspan dan colspan yang sesuai
//         // var headerHtml = `
//         //     <tr class="jsgrid-header-row">
//         //         <th class="jsgrid-header-cell jsgrid-align-center jsgrid-header-sortable" style="width: 50px;" rowspan="2">No</th>
//         //         <th class="jsgrid-header-cell jsgrid-header-sortable" style="width: 150px;" rowspan="2">Nama Kelas</th>
//         //         <th class="jsgrid-header-cell jsgrid-align-center jsgrid-header-sortable" style="width: 500px;" colspan="3">Log Aktifitas</th>
//         //         <th class="jsgrid-header-cell jsgrid-align-center jsgrid-header-sortable" style="width: 900px;" colspan="18">Minggu</th>
//         //         </tr>
//         //     <tr class="jsgrid-header-row">
//         //         <th class="jsgrid-header-cell jsgrid-align-center jsgrid-header-sortable" style="width: 200px;">Nama Mahasiswa</th>
//         //         <th class="jsgrid-header-cell jsgrid-align-center jsgrid-header-sortable" style="width: 100px;">Total Aktifitas</th>
//         //         <th class="jsgrid-header-cell jsgrid-align-center jsgrid-header-sortable" style="width: 100px;">Link</th>

//         //         <th  class="jsgrid-header-cell jsgrid-align-center jsgrid-header-sortable" style="width: 50px;">1</th>
//         //         <th  class="jsgrid-header-cell jsgrid-align-center jsgrid-header-sortable" style="width: 50px;">2</th>
//         //         <th  class="jsgrid-header-cell jsgrid-align-center jsgrid-header-sortable" style="width: 50px;">3</th>
//         //         <th  class="jsgrid-header-cell jsgrid-align-center jsgrid-header-sortable" style="width: 50px;">4</th>
//         //         <th  class="jsgrid-header-cell jsgrid-align-center jsgrid-header-sortable" style="width: 50px;">5</th>
//         //         <th  class="jsgrid-header-cell jsgrid-align-center jsgrid-header-sortable" style="width: 50px;">6</th>
//         //         <th  class="jsgrid-header-cell jsgrid-align-center jsgrid-header-sortable" style="width: 50px;">7</th>
//         //         <th  class="jsgrid-header-cell jsgrid-align-center jsgrid-header-sortable" style="width: 50px;">8</th>
//         //         <th  class="jsgrid-header-cell jsgrid-align-center jsgrid-header-sortable" style="width: 50px;">9</th>
//         //         <th  class="jsgrid-header-cell jsgrid-align-center jsgrid-header-sortable" style="width: 50px;">10</th>
//         //         <th  class="jsgrid-header-cell jsgrid-align-center jsgrid-header-sortable" style="width: 50px;">11</th>
//         //         <th  class="jsgrid-header-cell jsgrid-align-center jsgrid-header-sortable" style="width: 50px;">12</th>
//         //         <th  class="jsgrid-header-cell jsgrid-align-center jsgrid-header-sortable" style="width: 50px;">13</th>
//         //         <th  class="jsgrid-header-cell jsgrid-align-center jsgrid-header-sortable" style="width: 50px;">14</th>
//         //         <th  class="jsgrid-header-cell jsgrid-align-center jsgrid-header-sortable" style="width: 50px;">15</th>
//         //         <th  class="jsgrid-header-cell jsgrid-align-center jsgrid-header-sortable" style="width: 50px;">16</th>
//         //         <th  class="jsgrid-header-cell jsgrid-align-center jsgrid-header-sortable" style="width: 50px;">17</th>
//         //         <th  class="jsgrid-header-cell jsgrid-align-center jsgrid-header-sortable" style="width: 50px;">18</th>
//         //     </tr>
//         // `;

//         // $headerRow.append(headerHtml);
//     }
// });

let tabelInforMk = $("#tabelInforMk").DataTable({

    // stateSave: true,
    lengthChange: true, // Atur ke true untuk mengaktifkan opsi perubahan jumlah baris per halaman
    dom: '<"dtsp-verticalContainer"<"dtsp-verticalPanes"P><"dtsp-dataTable"Bfrtip>>',
    pageLength: 10,
    buttons: [

        { extend: 'copy', },
        { extend: 'csv' },
    ],

    language: {
        paginate: {
            previous: "<i class='mdi mdi-chevron-left'>",
            next: "<i class='mdi mdi-chevron-right'>"
        }
    },
    drawCallback: function() {
        $(".dataTables_paginate > .pagination").addClass("pagination-rounded")
    }
});

let activeSemester = "TA232"
let active = "2023/2024 Genap"

let id_fakultas = document.getElementById("id_fakultas").value;

const selectSemester = document.getElementById("semester_select")

optionDefault = document.createElement("option")
optionDefault.value = 72
optionDefault.text = "2023/2024 (20232/GENAP)"
optionDefault.setAttribute('ta_semester', "TA232");
optionDefault.setAttribute("mk_aktif", active);

selectSemester.appendChild(optionDefault)





let nama_prodi_storage = localStorage.getItem('nama_prodi_storage');
const id_prodi_storage = localStorage.getItem('id_prodi_storage');
const semester_aktif_storage = localStorage.getItem('semester_aktif_storage');
let mk_value_storage = localStorage.getItem('mk_value_storage');
let isFilterCleared = false;
if (semester_aktif_storage) {
    $('#semester_select').val(semester_aktif_storage).trigger('change');
}
async function semester_select_fun() {
    if (isFilterCleared) {
        return;
    }
    const response = await fetch('assets/data/get_all_prodi.json');
    const data = await response.json();

    const select = document.getElementById("program_studi");
    const semester_select = document.getElementById("semester_select");
    const selectedOption = semester_select.options[semester_select.selectedIndex];
    console.log(selectedOption);

    console.log(id_fakultas);
    if (id_fakultas > 0) {
        const listProdi = data.filter(prodi => prodi.fakultas.id === parseInt(id_fakultas))
        console.log(listProdi);
        listProdi.forEach(item => {
            const option = document.createElement("option");
            option.value = item.nama_resmi;
            option.text = item.nama_resmi;
            option.setAttribute('data_fakultas', item.fakultas.nama_resmi);
            option.setAttribute('id_prodi', item.id);


            select.appendChild(option);
        });


    } else {
        let groups = {};
        data.forEach(item => {
            const fakultasId = item.fakultas.id;
            if (!groups[fakultasId]) {
                groups[fakultasId] = [];
            }
            groups[fakultasId].push(item);
        });

        for (let fakultasId in groups) {
            const group = groups[fakultasId];
            const optgroup = document.createElement("optgroup");
            optgroup.label = group[0].fakultas.nama_resmi;
            const fakultas_2 = group[0].fakultas.nama_resmi;
            group.forEach(item => {
                const option = document.createElement("option");
                option.value = item.nama_resmi;
                option.text = item.nama_resmi;
                option.setAttribute('data_fakultas', fakultas_2);
                option.setAttribute('id_prodi', item.id);


                optgroup.appendChild(option);
            });

            select.appendChild(optgroup);
        }

    }


    if (nama_prodi_storage) {

        $('#program_studi').val(nama_prodi_storage).trigger('change');


    }


}
async function prodi_select_fun() {


    $("#filter_data").removeAttr("disabled")
    $('#select_mk').val("").trigger('change');


    const program_studi = document.getElementById("program_studi")

    const selectedOption = program_studi.options[program_studi.selectedIndex];
    // console.log(selectedOption);
    const nama_prodi = selectedOption.value;
    console.log(nama_prodi);
    const id_prodi = selectedOption.getAttribute('id_prodi');

    localStorage.setItem('nama_prodi_storage', nama_prodi);


    // nama_prodi_storage = null


    const response = await fetch('assets/data/list_mk.json');
    const data = await response.json()

    const select_mk = document.getElementById("select_mk");

    select_mk.innerHTML = "";
    const default_Mk = document.createElement("option")
    default_Mk.text = `Select MK Prodi - ${nama_prodi}`
    default_Mk.setAttribute("value", "")
    default_Mk.setAttribute("disabled", "true")
    default_Mk.setAttribute("selected", "true")
    select_mk.appendChild(default_Mk)
    select_mk.dispatchEvent(new Event('change'));

    const listAktif = data.filter(mk => mk.nama_category_periode_sikola === active)
    const listMk = listAktif.filter(mk => mk.id_prodi == id_prodi)


    listMk.forEach(mk => {
        const option = document.createElement('option');
        option.setAttribute('data_kode_matkul', mk.kode_matkul);
        option.setAttribute('nama_prodi', mk.nama_prodi);
        option.setAttribute('fullname_sikola', mk.fullname_sikola);
        option.value = mk.idnumber_sikola;
        option.text = mk.fullname_sikola;
        select_mk.appendChild(option);

    })


    if (isFilterCleared) {
        return;
    }

    // if (mk_value_storage) {
    //     $('#select_mk').val(mk_value_storage).trigger('change');
    // }

    // if (nama_prodi_storage != nama_prodi) {
    //     $('#select_mk').val("").trigger('change');

    // }

    // if (nama_prodi_storage != nama_prodi && !mk_value_storage) {

    //     localStorage.removeItem('mk_value_storage');

    //     filter_data() // Remove from localStorage


    // }

    if (nama_prodi_storage && !mk_value_storage) {
        // $('#program_studi').val(nama_prodi_storage).trigger('change');

        // console.log("1111");
        filter_data();
        nama_prodi_storage = null;
        // localStorage.removeItem('nama_prodi_storage'); // Remove from localStorage
        // Reset mk_value_storage

    } else if (nama_prodi_storage && mk_value_storage) {
        // console.log("222");
        $('#select_mk').val(mk_value_storage).trigger('change');
        filter_data();
        // nama_prodi_storage = null; // Reset mk_value_storage
        mk_value_storage = null; // Reset mk_value_storage
        localStorage.removeItem('mk_value_storage'); // Remove from localStorage

    }



    // nama_prodi_storage = null;

}

async function filter_data() {

    if (isFilterCleared) {
        return;
    }
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };
    $("#filter_data, #clear_filter").attr("disabled", true);
    $("#btn_spinner").removeClass("d-none")
    $("#judul_prodi, #apex-column-2, #apex-pie-1").html("")
        // tableStatistik.clear().draw();
        // tabelInforMk.clear().draw();

    clearJsGrid("#table_presensi_matkul_mhs");



    let nama_prodi = document.getElementById("program_studi").value
    let semester_aktif = document.getElementById("semester_select").value
    let id_prodi = document.getElementById("program_studi");
    id_prodi = id_prodi.options[id_prodi.selectedIndex];
    id_prodi = id_prodi.getAttribute('id_prodi');

    localStorage.setItem('nama_prodi_storage', nama_prodi)
    localStorage.setItem('id_prodi_storage', id_prodi)
    localStorage.setItem('semester_aktif_storage', semester_aktif)



    const select_mk = document.getElementById("select_mk");

    const selectedOption = select_mk.options[select_mk.selectedIndex];
    const mk_value = selectedOption.value
    const selectedKodeMatkul = selectedOption.getAttribute('data_kode_matkul');
    const fullname_sikola = selectedOption.getAttribute('fullname_sikola');


    if (!selectedKodeMatkul && !fullname_sikola) {

        try {
            $("#judul_prodi").html(nama_prodi)
            $("#judul_prodi_mhs").html(nama_prodi)
            $("#judul_prodi_e").html(nama_prodi)

            const response = await fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=core_course_get_categories&criteria[0][key]=name&criteria[0][value]=${nama_prodi}`, requestOptions)
            const result = await response.json();
            const response1 = await fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=core_course_get_courses_by_field&field=category&value=${result[0].id}`, requestOptions)
            const dataCourses = await response1.json()

            let filteredCourses = dataCourses.courses.filter(course => course.shortname.includes(activeSemester));

            let totalBanyakTerisi = 0;

            let totalRps = 0;
            let totalProyek = 0;
            let totalTugas = 0;
            let totalKasus = 0;
            let totalDoc = 0;
            let totalSurvey = 0;
            let totalQuiz = 0;
            let totalForum = 0;

            counter = 1
            counter_e = 1
            counter_m = 1

            const dataSource = [];
            const rowSpanTracker = {}; // To track rowspan for each course




            const fetchPromises = filteredCourses.map(item => {
                return fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=core_course_get_contents&courseid=${item.id}`, requestOptions)
                    .then((response) => response.json())
                    .then(async result => {
                        let infoMK = result.filter(alur => alur.name === "Info Matakuliah");
                        let kelasE = result.filter(alur => alur.name != "Info Matakuliah" && alur.section == 0);
                        let attendanceModules = [];
                        let attendanceMhsE = 0;

                        infoMK.forEach(section => {
                            section.modules.forEach(modul => {
                                if (modul.modname === "attendance") {
                                    attendanceModules.push(modul);
                                }

                            });
                        });

                        let absenMhs = attendanceModules.filter(alur => alur.name === "Presensi Mahasiswa");
                        let absenDosen = attendanceModules.filter(alur => alur.name === "Presensi Pengampu Mata Kuliah");
                        attendanceMhsE = attendanceModules.filter(alur => alur.name !== "Presensi Pengampu Mata Kuliah" && alur.name !== "Presensi Mahasiswa");


                        const namaMhs = await getUserMahasiswa(absenMhs, requestOptions);

                        console.log(namaMhs);


                        const formatDate = (date) => {
                            let year = date.getFullYear();
                            let month = (date.getMonth() + 1).toString().padStart(2, '0');
                            let day = date.getDate().toString().padStart(2, '0');
                            return `${year}-${month}-${day}`;
                        };
                        const generateWeeks = (startDate, numWeeks) => {
                            const weeks = {};
                            let currentDate = new Date(startDate);

                            for (let i = 1; i <= numWeeks; i++) {
                                let weekStart = new Date(currentDate);
                                let weekEnd = new Date(currentDate);
                                weekEnd.setDate(weekEnd.getDate() + 6); // Tambah 6 hari untuk mendapatkan akhir minggu

                                weeks[`pekan${i}`] = { start: formatDate(weekStart), end: formatDate(weekEnd) };

                                currentDate.setDate(currentDate.getDate() + 7);
                            }

                            return weeks;
                        };

                        const startDate = '2024-02-19';
                        const numWeeks = 18;
                        const weeks = generateWeeks(startDate, numWeeks);
                        // const weekCountersDosen = Object.fromEntries(Object.keys(weeks).map(week => [week, 0]));

                        const weekCountersDosen = {};
                        namaMhs.forEach(dosen => {
                            weekCountersDosen[dosen.id] = Object.fromEntries(Object.keys(weeks).map(week => [week, 0]));
                        });

                        const groupByWeekMhs = (logs, mhsId) => {
                            logs.forEach(item => {
                                const sessdate = formatDate(new Date(item.timecreated * 1000));

                                for (const [week, range] of Object.entries(weeks)) {
                                    if (sessdate >= range.start && sessdate <= range.end) {
                                        weekCountersDosen[mhsId][week]++;
                                        break;
                                    }
                                }


                            });
                        };



                        Promise.all([
                                fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=mod_attendance_get_sessions&attendanceid=${absenMhs[0].instance}`, requestOptions),
                                fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=core_group_get_course_groups&courseid=${item.id}`, requestOptions),
                                fetch(`/services/sikolaLogMhs.php?courseId=${item.id}`, requestOptions)
                            ])
                            .then(responses => Promise.all(responses.map(response => response.json())))
                            .then(async data => {
                                let absenMhsData = data[0];
                                let groups = data[1];
                                let logMhs = data[2];

                                let mahasiswaGroupId = groups.find(group => group.name === "MAHASISWA").id;
                                let dosenGroupId = groups.find(group => group.name === "DOSEN").id;

                                const namaMhsById = {};
                                namaMhs.forEach(dosen => {
                                    namaMhsById[dosen.id] = dosen;
                                });
                                console.log(namaMhsById);

                                let presentStatusId = absenMhsData.find(data => data.statuses.some(status => status.acronym === "P")).statuses.find(status => status.acronym === "P").id;
                                let lateStatusId = absenMhsData.find(data => data.statuses.some(status => status.acronym === "L")).statuses.find(status => status.acronym === "L").id;

                                console.log(presentStatusId, lateStatusId);


                                let absenId = absenMhsData.find(data => data.statuses.some(status => status.acronym === "A")).statuses.find(status => status.acronym === "A").id;

                                let terisiMhs = absenMhsData.filter(sessi => (
                                    sessi.attendance_log && sessi.groupid == mahasiswaGroupId
                                ));

                                console.log(terisiMhs);




                                const courseid = item.id;
                                const courseName = item.fullname;

                                const mahasiswaIds = Object.keys(namaMhsById);
                                const rowspan = mahasiswaIds.length;

                                var dosenByCourse = {};

                                let totalMhs = absenMhsData.filter(sessi => sessi.attendance_log && sessi.attendance_log.some(log => namaMhsById[log.studentid])).length;


                                if (!dosenByCourse[courseName]) {
                                    dosenByCourse[courseName] = {
                                        id: courseid,
                                        dosenList: [],
                                        totalMhs: totalMhs,
                                        weeklyData: {
                                            pekan1: [],
                                            pekan2: [],
                                            pekan3: [],
                                            pekan4: [],
                                            pekan5: [],
                                            pekan6: [],
                                            pekan7: [],
                                            pekan8: [],
                                            pekan9: [],
                                            pekan10: [],
                                            pekan11: [],
                                            pekan12: [],
                                            pekan13: [],
                                            pekan14: [],
                                            pekan15: [],
                                            pekan16: [],
                                            pekan17: [],
                                            pekan18: []
                                        }
                                    };
                                }

                                mahasiswaIds.forEach(mhsId => {
                                    const logs = logMhs.filter(log => log.userid == mhsId)
                                        // console.log(log, "LOGGG");
                                    groupByWeekMhs(logs, mhsId);


                                    // for (const [week] of Object.entries(weeks)) {
                                    //     dosenByCourse[courseName].weeklyData[week].push(weekCountersDosen[mhsId].[week]);
                                    //     break;

                                    // }

                                    const terisiMhsCount = logs.length;
                                    dosenByCourse[courseName].dosenList.push({
                                        name: `${namaMhsById[mhsId].firstname} ${namaMhsById[mhsId].lastname}`,
                                        terisiMhsCount: terisiMhsCount,
                                    });

                                    dosenByCourse[courseName].weeklyData.pekan1.push(weekCountersDosen[mhsId].pekan1 || '');
                                    dosenByCourse[courseName].weeklyData.pekan2.push(weekCountersDosen[mhsId].pekan2 || '');
                                    dosenByCourse[courseName].weeklyData.pekan3.push(weekCountersDosen[mhsId].pekan3 || '');
                                    dosenByCourse[courseName].weeklyData.pekan4.push(weekCountersDosen[mhsId].pekan4 || '');
                                    dosenByCourse[courseName].weeklyData.pekan5.push(weekCountersDosen[mhsId].pekan5 || '');
                                    dosenByCourse[courseName].weeklyData.pekan6.push(weekCountersDosen[mhsId].pekan6 || '');
                                    dosenByCourse[courseName].weeklyData.pekan7.push(weekCountersDosen[mhsId].pekan7 || '');
                                    dosenByCourse[courseName].weeklyData.pekan8.push(weekCountersDosen[mhsId].pekan8 || '');
                                    dosenByCourse[courseName].weeklyData.pekan9.push(weekCountersDosen[mhsId].pekan9 || '');
                                    dosenByCourse[courseName].weeklyData.pekan10.push(weekCountersDosen[mhsId].pekan10 || '');
                                    dosenByCourse[courseName].weeklyData.pekan11.push(weekCountersDosen[mhsId].pekan11 || '');
                                    dosenByCourse[courseName].weeklyData.pekan12.push(weekCountersDosen[mhsId].pekan12 || '');
                                    dosenByCourse[courseName].weeklyData.pekan13.push(weekCountersDosen[mhsId].pekan13 || '');
                                    dosenByCourse[courseName].weeklyData.pekan14.push(weekCountersDosen[mhsId].pekan14 || '');
                                    dosenByCourse[courseName].weeklyData.pekan15.push(weekCountersDosen[mhsId].pekan15 || '');
                                    dosenByCourse[courseName].weeklyData.pekan16.push(weekCountersDosen[mhsId].pekan16 || '');
                                    dosenByCourse[courseName].weeklyData.pekan17.push(weekCountersDosen[mhsId].pekan17 || '');
                                    dosenByCourse[courseName].weeklyData.pekan18.push(weekCountersDosen[mhsId].pekan18 || '');
                                });



                                for (const [courseName, courseData] of Object.entries(dosenByCourse)) {
                                    const { dosenList, weeklyData } = courseData;
                                    rowSpanTracker[courseName] = dosenList.length; // Store the number of students in each course


                                    dosenList.forEach((dosen, index) => {
                                        dataSource.push({
                                            'No': index === 0 ? counter : '',
                                            'span': dosenList.length,
                                            'Nama Kelas': index === 0 ? `<a href="https://sikola-v2.unhas.ac.id/course/view.php?id=${courseData.id}" target="_blank" class="">${courseName} <i class="fe-external-link"></i></a>` 
                                            : '',
                                            // `<a href="https://sikola-v2.unhas.ac.id/course/view.php?id=${courseData.id}" target="_blank" class="">${courseName} <i class="fe-external-link"></i></a>`, // Show course name only for the first row of the course
                                            'Report Actitivity': index === 0 ? `<a href="https://sikola-v2.unhas.ac.id/report/log/index.php?id=${courseData.id}" target="_blank">Report Actitivity <i class="fe-external-link"></i></a>` : '',
                                            'Nama Mahasiswa': dosen.name,
                                            'Total Aktifitas': dosen.terisiMhsCount,
                                            '1': weeklyData.pekan1[index] || '',
                                            '2': weeklyData.pekan2[index] || '',
                                            '3': weeklyData.pekan3[index] || '',
                                            '4': weeklyData.pekan4[index] || '',
                                            '5': weeklyData.pekan5[index] || '',
                                            '6': weeklyData.pekan6[index] || '',
                                            '7': weeklyData.pekan7[index] || '',
                                            '8': weeklyData.pekan8[index] || '',
                                            '9': weeklyData.pekan9[index] || '',
                                            '10': weeklyData.pekan10[index] || '',
                                            '11': weeklyData.pekan11[index] || '',
                                            '12': weeklyData.pekan12[index] || '',
                                            '13': weeklyData.pekan13[index] || '',
                                            '14': weeklyData.pekan14[index] || '',
                                            '15': weeklyData.pekan15[index] || '',
                                            '16': weeklyData.pekan16[index] || '',
                                            '17': weeklyData.pekan17[index] || '',
                                            '18': weeklyData.pekan18[index] || '',
                                        });
                                    });

                                    counter++;
                                }

                                // Set the dataSource to jsGrid
                                $("#table_presensi_matkul_mhs").jsGrid({
                                    width: "100%",
                                    height: "800px",

                                    inserting: false,
                                    editing: false,
                                    sorting: true,
                                    paging: true,
                                    filtering: true,
                                    autoload: true,
                                    pageSize: 20,
                                    pageButtonCount: 15,

                                    data: dataSource,

                                    fields: [{
                                            name: "No",
                                            id: 'Nomor',
                                            type: "number",
                                            width: 50,
                                            filtering: false,
                                           
                                            // }
                                        },
                                        {
                                            name: "Nama Kelas",
                                            type: "text",
                                            width: 150,
                                            filtering: true,
                                           
                                        },
                                        {
                                            name: "Report Actitivity",
                                            type: "text",
                                            width: 150,
                                            filtering: false,
                                           
                                        },
                                        { name: "Nama Mahasiswa", type: "text", width: 200, filtering: true },
                                        { name: "Total Aktifitas", type: "number", width: 100, filtering: false },
                                        // Tambahkan field untuk setiap minggu
                                        { name: "1", type: "text", width: 50, filtering: false },
                                        { name: "2", type: "text", width: 50, filtering: false },
                                        { name: "3", type: "text", width: 50, filtering: false },
                                        { name: "4", type: "text", width: 50, filtering: false },
                                        { name: "5", type: "text", width: 50, filtering: false },
                                        { name: "6", type: "text", width: 50, filtering: false },
                                        { name: "7", type: "text", width: 50, filtering: false },
                                        { name: "8", type: "text", width: 50, filtering: false },
                                        { name: "9", type: "text", width: 50, filtering: false },
                                        { name: "10", type: "text", width: 50, filtering: false },
                                        { name: "11", type: "text", width: 50, filtering: false },
                                        { name: "12", type: "text", width: 50, filtering: false },
                                        { name: "13", type: "text", width: 50, filtering: false },
                                        { name: "14", type: "text", width: 50, filtering: false },
                                        { name: "15", type: "text", width: 50, filtering: false },
                                        { name: "16", type: "text", width: 50, filtering: false },
                                        { name: "17", type: "text", width: 50, filtering: false },
                                        { name: "18", type: "text", width: 50, filtering: false }
                                    ],

                                  


                                    controller: {
                                        loadData: function(filter) {
                                            return $.grep(dataSource, function(item) {
                                                return (!filter['Nama Kelas'] || item['Nama Kelas'].toLowerCase().indexOf(filter['Nama Kelas'].toLowerCase()) > -1) &&
                                                    (!filter['Nama Mahasiswa'] || item['Nama Mahasiswa'].toLowerCase().indexOf(filter['Nama Mahasiswa'].toLowerCase()) > -1);
                                            });
                                        }
                                    },

                                });

                              


                            })


                        .catch(error => {
                            console.error(error)



                        });
                    })
                    .catch(error => {
                        console.error(error)

                        console.log(item.fullname, "INF");
                        tabelInforMk.row.add([
                            counter_e++,
                            `<a href="https://sikola-v2.unhas.ac.id/course/view.php?id=${item.id}" target="_blank" class="link">${item.fullname} <i class="fe-external-link"></i></a>`,
                            "Nama Presensi Tidak Sesuai, Judul InfoMatakuliah Tidak Sesuai"

                        ]).draw(false);


                    });



            });





            Promise.all(fetchPromises).then(() => {
                $("#btn_spinner").addClass("d-none")
                $("#clear_filter").removeAttr("disabled")
                $("#filter_data").removeAttr("disabled")

                // $('#table_presensi_matkul').on('draw.dt', function() {
                //     mergeCells();
                // });


            });



        } catch (error) {

            console.log(error);

        }
    } else {
        try {
            localStorage.setItem('selectedKodeMatkul_storage', selectedKodeMatkul)
            localStorage.setItem('fullname_sikola_storage', fullname_sikola)
            localStorage.setItem('mk_value_storage', mk_value)
            $("#judul_prodi").html(fullname_sikola + " / " + nama_prodi)
            $("#judul_prodi_mhs").html(fullname_sikola + " / " + nama_prodi)
            $("#judul_prodi_e").html(fullname_sikola + " / " + nama_prodi)

            const response = await fetch(`assets/data/list_mk_per_kelas.json`)
            const data = await response.json()
            let totalBanyakTerisi = 0;

            let totalRps = 0;
            let totalProyek = 0;
            let totalTugas = 0;
            let totalKasus = 0;
            let totalDoc = 0;
            let totalSurvey = 0;
            let totalQuiz = 0;
            let totalForum = 0;
            counter = 1
            counter_e = 1
            counter_m = 1

            const dataSource = [];
            const rowSpanTracker = {};

            const filteredData = data.filter(item => item.kode_matkul === selectedKodeMatkul);

            const fetchPromises = filteredData.map(item => {
                // console.log(item.shortname_sikola);
                return fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=core_course_get_courses_by_field&field=shortname&value=${item.shortname_sikola}`, requestOptions)
                    .then((response) => response.json())
                    .then(kelas => {
                        fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=core_course_get_contents&courseid=${kelas.courses[0].id}`, requestOptions)
                            .then((response) => response.json())
                            .then(async result => {
                                let infoMK = result.filter(alur => alur.name === "Info Matakuliah");
                                let kelasE = result.filter(alur => alur.name != "Info Matakuliah" && alur.section == 0);
                                let attendanceModules = [];
                                let attendanceMhsE = 0;

                                infoMK.forEach(section => {
                                    section.modules.forEach(modul => {
                                        if (modul.modname === "attendance") {
                                            attendanceModules.push(modul);
                                        }

                                    });
                                });

                                // console.log(kelasE, "KELAS EEE", item.fullname);

                                let absenMhs = attendanceModules.filter(alur => alur.name === "Presensi Mahasiswa");
                                let absenDosen = attendanceModules.filter(alur => alur.name === "Presensi Pengampu Mata Kuliah");
                                attendanceMhsE = attendanceModules.filter(alur => alur.name !== "Presensi Pengampu Mata Kuliah" && alur.name !== "Presensi Mahasiswa");

                                const formatDate = (date) => {
                                    let year = date.getFullYear();
                                    let month = (date.getMonth() + 1).toString().padStart(2, '0');
                                    let day = date.getDate().toString().padStart(2, '0');
                                    return `${year}-${month}-${day}`;
                                };
                                const generateWeeks = (startDate, numWeeks) => {
                                    const weeks = {};
                                    let currentDate = new Date(startDate);

                                    for (let i = 1; i <= numWeeks; i++) {
                                        let weekStart = new Date(currentDate);
                                        let weekEnd = new Date(currentDate);
                                        weekEnd.setDate(weekEnd.getDate() + 6); // Tambah 6 hari untuk mendapatkan akhir minggu

                                        weeks[`pekan${i}`] = { start: formatDate(weekStart), end: formatDate(weekEnd) };

                                        currentDate.setDate(currentDate.getDate() + 7);
                                    }

                                    return weeks;
                                };

                                const startDate = '2024-02-19';
                                const numWeeks = 18;
                                const weeks = generateWeeks(startDate, numWeeks);
                                // const weekCountersDosen = Object.fromEntries(Object.keys(weeks).map(week => [week, 0]));

                                const groupByWeekMhs = (logs, mhsId) => {
                                    logs.forEach(item => {
                                        const sessdate = formatDate(new Date(item.timecreated * 1000));

                                        for (const [week, range] of Object.entries(weeks)) {
                                            if (sessdate >= range.start && sessdate <= range.end) {
                                                weekCountersDosen[mhsId][week]++;
                                                break;
                                            }
                                        }


                                    });
                                };

                                const namaMhs = await getUserMahasiswa(absenMhs, requestOptions);


                                const weekCountersDosen = {};
                                namaMhs.forEach(dosen => {
                                    weekCountersDosen[dosen.id] = Object.fromEntries(Object.keys(weeks).map(week => [week, 0]));
                                });








                                Promise.all([
                                        fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=mod_attendance_get_sessions&attendanceid=${absenMhs[0].instance}`, requestOptions),
                                        fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=core_group_get_course_groups&courseid=${kelas.courses[0].id}`, requestOptions),
                                        fetch(`/services/sikolaLogMhs.php?courseId=${kelas.courses[0].id}`, requestOptions)


                                    ])
                                    .then(responses => Promise.all(responses.map(response => response.json())))
                                    .then(data => {
                                        let absenMhsData = data[0];
                                        let groups = data[1];
                                        let logMhs = data[2];

                                        let mahasiswaGroupId = groups.find(group => group.name === "MAHASISWA").id;
                                        let dosenGroupId = groups.find(group => group.name === "DOSEN").id;

                                        const namaMhsById = {};
                                        namaMhs.forEach(dosen => {
                                            namaMhsById[dosen.id] = dosen;
                                        });
                                        console.log(namaMhsById);

                                        let presentStatusId = absenMhsData.find(data => data.statuses.some(status => status.acronym === "P")).statuses.find(status => status.acronym === "P").id;
                                        let lateStatusId = absenMhsData.find(data => data.statuses.some(status => status.acronym === "L")).statuses.find(status => status.acronym === "L").id;

                                        console.log(presentStatusId, lateStatusId);


                                        let absenId = absenMhsData.find(data => data.statuses.some(status => status.acronym === "A")).statuses.find(status => status.acronym === "A").id;

                                        let terisiMhs = absenMhsData.filter(sessi => (
                                            sessi.attendance_log && sessi.groupid == mahasiswaGroupId
                                        ));

                                        console.log(terisiMhs);




                                        const courseid = kelas.courses[0].id;
                                        const courseName = kelas.courses[0].fullname;

                                        const mahasiswaIds = Object.keys(namaMhsById);
                                        const rowspan = mahasiswaIds.length;

                                        var dosenByCourse = {};

                                        let totalMhs = absenMhsData.filter(sessi => sessi.attendance_log && sessi.attendance_log.some(log => namaMhsById[log.studentid])).length;


                                        if (!dosenByCourse[courseName]) {
                                            dosenByCourse[courseName] = {
                                                id: courseid,
                                                dosenList: [],
                                                totalMhs: totalMhs,
                                                weeklyData: {
                                                    pekan1: [],
                                                    pekan2: [],
                                                    pekan3: [],
                                                    pekan4: [],
                                                    pekan5: [],
                                                    pekan6: [],
                                                    pekan7: [],
                                                    pekan8: [],
                                                    pekan9: [],
                                                    pekan10: [],
                                                    pekan11: [],
                                                    pekan12: [],
                                                    pekan13: [],
                                                    pekan14: [],
                                                    pekan15: [],
                                                    pekan16: [],
                                                    pekan17: [],
                                                    pekan18: []
                                                }
                                            };
                                        }

                                        mahasiswaIds.forEach(mhsId => {
                                            const logs = logMhs.filter(log => log.userid == mhsId)
                                                // console.log(log, "LOGGG");
                                            groupByWeekMhs(logs, mhsId);


                                            // for (const [week] of Object.entries(weeks)) {
                                            //     dosenByCourse[courseName].weeklyData[week].push(weekCountersDosen[mhsId].[week]);
                                            //     break;

                                            // }

                                            const terisiMhsCount = logs.length;
                                            dosenByCourse[courseName].dosenList.push({
                                                name: `${namaMhsById[mhsId].firstname} ${namaMhsById[mhsId].lastname}`,
                                                terisiMhsCount: terisiMhsCount,
                                            });

                                            dosenByCourse[courseName].weeklyData.pekan1.push(weekCountersDosen[mhsId].pekan1 || '');
                                            dosenByCourse[courseName].weeklyData.pekan2.push(weekCountersDosen[mhsId].pekan2 || '');
                                            dosenByCourse[courseName].weeklyData.pekan3.push(weekCountersDosen[mhsId].pekan3 || '');
                                            dosenByCourse[courseName].weeklyData.pekan4.push(weekCountersDosen[mhsId].pekan4 || '');
                                            dosenByCourse[courseName].weeklyData.pekan5.push(weekCountersDosen[mhsId].pekan5 || '');
                                            dosenByCourse[courseName].weeklyData.pekan6.push(weekCountersDosen[mhsId].pekan6 || '');
                                            dosenByCourse[courseName].weeklyData.pekan7.push(weekCountersDosen[mhsId].pekan7 || '');
                                            dosenByCourse[courseName].weeklyData.pekan8.push(weekCountersDosen[mhsId].pekan8 || '');
                                            dosenByCourse[courseName].weeklyData.pekan9.push(weekCountersDosen[mhsId].pekan9 || '');
                                            dosenByCourse[courseName].weeklyData.pekan10.push(weekCountersDosen[mhsId].pekan10 || '');
                                            dosenByCourse[courseName].weeklyData.pekan11.push(weekCountersDosen[mhsId].pekan11 || '');
                                            dosenByCourse[courseName].weeklyData.pekan12.push(weekCountersDosen[mhsId].pekan12 || '');
                                            dosenByCourse[courseName].weeklyData.pekan13.push(weekCountersDosen[mhsId].pekan13 || '');
                                            dosenByCourse[courseName].weeklyData.pekan14.push(weekCountersDosen[mhsId].pekan14 || '');
                                            dosenByCourse[courseName].weeklyData.pekan15.push(weekCountersDosen[mhsId].pekan15 || '');
                                            dosenByCourse[courseName].weeklyData.pekan16.push(weekCountersDosen[mhsId].pekan16 || '');
                                            dosenByCourse[courseName].weeklyData.pekan17.push(weekCountersDosen[mhsId].pekan17 || '');
                                            dosenByCourse[courseName].weeklyData.pekan18.push(weekCountersDosen[mhsId].pekan18 || '');
                                        });



                                        for (const [courseName, courseData] of Object.entries(dosenByCourse)) {
                                            const { dosenList, weeklyData } = courseData;
                                            rowSpanTracker[courseName] = dosenList.length; // Store the number of students in each course


                                            dosenList.forEach((dosen, index) => {
                                                dataSource.push({
                                                    'No': index === 0 ? counter : '',
                                                    'span': dosenList.length,
                                                    'Nama Kelas': index === 0 ? `<a href="https://sikola-v2.unhas.ac.id/course/view.php?id=${courseData.id}" target="_blank" class="">${courseName} <i class="fe-external-link"></i></a>` : `<a href="https://sikola-v2.unhas.ac.id/course/view.php?id=${courseData.id}" target="_blank" class="">${courseName} <i class="fe-external-link"></i></a>`, // Show course name only for the first row of the course
                                                    'Report Actitivity': index === 0 ? `<a href="https://sikola-v2.unhas.ac.id/report/log/index.php?id=${courseData.id}" target="_blank">Report Actitivity <i class="fe-external-link"></i></a>` : '',
                                                    'Nama Mahasiswa': dosen.name,
                                                    'Total Aktifitas': dosen.terisiMhsCount,
                                                    '1': weeklyData.pekan1[index] || '',
                                                    '2': weeklyData.pekan2[index] || '',
                                                    '3': weeklyData.pekan3[index] || '',
                                                    '4': weeklyData.pekan4[index] || '',
                                                    '5': weeklyData.pekan5[index] || '',
                                                    '6': weeklyData.pekan6[index] || '',
                                                    '7': weeklyData.pekan7[index] || '',
                                                    '8': weeklyData.pekan8[index] || '',
                                                    '9': weeklyData.pekan9[index] || '',
                                                    '10': weeklyData.pekan10[index] || '',
                                                    '11': weeklyData.pekan11[index] || '',
                                                    '12': weeklyData.pekan12[index] || '',
                                                    '13': weeklyData.pekan13[index] || '',
                                                    '14': weeklyData.pekan14[index] || '',
                                                    '15': weeklyData.pekan15[index] || '',
                                                    '16': weeklyData.pekan16[index] || '',
                                                    '17': weeklyData.pekan17[index] || '',
                                                    '18': weeklyData.pekan18[index] || '',
                                                });
                                            });

                                            counter++;
                                        }

                                        // Set the dataSource to jsGrid
                                        $("#table_presensi_matkul_mhs").jsGrid({
                                            width: "100%",
                                            height: "800px",

                                            inserting: false,
                                            editing: false,
                                            sorting: true,
                                            paging: true,
                                            filtering: true,
                                            autoload: true,
                                            pageSize: 20,
                                            pageButtonCount: 15,

                                            data: dataSource,

                                            fields: [{
                                                    name: "No",
                                                    id: 'Nomor',
                                                    type: "number",
                                                    width: 50,
                                                    filtering: false,

                                                },
                                                {
                                                    name: "Nama Kelas",
                                                    type: "text",
                                                    width: 150,
                                                    filtering: true,
                                                    // itemTemplate: function(value, item) {
                                                    //     return item['Nama Kelas'] === '' ? "" : $("").attr("rowspan", item.span).html(item['Nama Kelas']);
                                                    // }
                                                },
                                                {
                                                    name: "Report Actitivity",
                                                    type: "text",
                                                    width: 150,
                                                    filtering: false,
                                                    // itemTemplate: function(value, item) {
                                                    //     return item['Report Actitivity'] === '' ? "" : $("<td>").attr("rowspan", item.span).html(item['Report Actitivity']);
                                                    // }
                                                },
                                                { name: "Nama Mahasiswa", type: "text", width: 200, filtering: true },
                                                { name: "Total Aktifitas", type: "number", width: 100, filtering: false },
                                                // Tambahkan field untuk setiap minggu
                                                { name: "1", type: "text", width: 50, filtering: false },
                                                { name: "2", type: "text", width: 50, filtering: false },
                                                { name: "3", type: "text", width: 50, filtering: false },
                                                { name: "4", type: "text", width: 50, filtering: false },
                                                { name: "5", type: "text", width: 50, filtering: false },
                                                { name: "6", type: "text", width: 50, filtering: false },
                                                { name: "7", type: "text", width: 50, filtering: false },
                                                { name: "8", type: "text", width: 50, filtering: false },
                                                { name: "9", type: "text", width: 50, filtering: false },
                                                { name: "10", type: "text", width: 50, filtering: false },
                                                { name: "11", type: "text", width: 50, filtering: false },
                                                { name: "12", type: "text", width: 50, filtering: false },
                                                { name: "13", type: "text", width: 50, filtering: false },
                                                { name: "14", type: "text", width: 50, filtering: false },
                                                { name: "15", type: "text", width: 50, filtering: false },
                                                { name: "16", type: "text", width: 50, filtering: false },
                                                { name: "17", type: "text", width: 50, filtering: false },
                                                { name: "18", type: "text", width: 50, filtering: false }
                                            ],

                                            controller: {
                                                loadData: function(filter) {
                                                    return $.grep(dataSource, function(item) {
                                                        return (!filter['Nama Kelas'] || item['Nama Kelas'].toLowerCase().indexOf(filter['Nama Kelas'].toLowerCase()) > -1) &&
                                                            (!filter['Nama Mahasiswa'] || item['Nama Mahasiswa'].toLowerCase().indexOf(filter['Nama Mahasiswa'].toLowerCase()) > -1);
                                                    });
                                                }
                                            },



                                            // controller: {
                                            //     loadData: function(filter) {
                                            //         return $.grep(dataSource, function(item) {
                                            //             return (!filter['Nama Kelas'] || item['Nama Kelas'].indexOf(filter['Nama Kelas']) > -1) &&
                                            //                 (!filter['Nama Mahasiswa'] || item['Nama Mahasiswa'].indexOf(filter['Nama Mahasiswa']) > -1);
                                            //         });
                                            //     },

                                            // },
                                        });

                                        // $("#table_presensi_matkul_mhs").jsGrid("option", "data", dataSource);
                                        $("#table_presensi_matkul_mhs").jsGrid("loadData")














                                    })

                                .catch(error => {
                                    console.error(error)



                                });
                            })
                            .catch(error => {

                                console.error(error)
                                tabelInforMk.row.add([
                                    counter_e++,
                                    `<a href="https://sikola-v2.unhas.ac.id/course/view.php?id=${kelas.courses[0].id}" target="_blank" class="link">${kelas.courses[0].fullname} <i class="fe-external-link"></i></a>`,
                                    "Nama Presensi Tidak Sesuai, Judul InfoMatakuliah Tidak Sesuai"

                                ]).draw(false);
                            });




                        console.log(kelas.courses[0].id);
                    })
                    .catch(error => {

                        console.error(error)
                    });




            });

            Promise.all(fetchPromises).then(() => {
                $("#btn_spinner").addClass("d-none")
                $("#clear_filter").removeAttr("disabled")

                $("#filter_data").removeAttr("disabled")


            });


        } catch (error) {
            console.log(error);

        }
    }





}


function clearJsGrid(gridId) {
    $(gridId).jsGrid("option", "data", []).jsGrid("refresh");
}
const clear_filter = async() => {
    // isFilterCleared = true; // Setel flag menjadi true


    localStorage.removeItem('nama_prodi_storage');
    localStorage.removeItem('id_prodi_storage');
    localStorage.removeItem('semester_aktif_storage');
    localStorage.removeItem('selectedKodeMatkul_storage');
    localStorage.removeItem('fullname_sikola_storage');
    localStorage.removeItem('mk_value_storage');
    localStorage.removeItem('mk_aktif');


    $("#judul_prodi, #judul_prodi_mhs, #judul_prodi_e").html("")
    $("#filter_data").attr("disabled", true)

    // tableStatistik.clear().draw();

    clearJsGrid("#table_presensi_matkul_mhs");

    // tabelInforMk.clear().draw();
    $("#semester_select, #program_studi, #select_mk").val("").trigger("change");



}

async function getUserMahasiswa(absenMhs, requestOptions) {
    try {
        const response = await fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=mod_attendance_get_sessions&attendanceid=${absenMhs[0].instance}`, requestOptions);
        const result = await response.json();
        const namaMhs = result[0].users;
        return namaMhs;
    } catch (error) {
        console.error(error);
        return null;
    }
}