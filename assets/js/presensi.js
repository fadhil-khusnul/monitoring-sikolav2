let tableStatistik = $("#table_presensi_matkul").DataTable({
    // responsive: true,
    // stateSave: true,
    // lengthChange: true, // Atur ke true untuk mengaktifkan opsi perubahan jumlah baris per halaman
    dom: '<"dtsp-verticalContainer"<"dtsp-verticalPanes"P><"dtsp-dataTable"Bfrtip>>',
    // pageLength: 10,
    buttons: [

        { extend: 'copy', },
        { extend: 'csv' },
    ],
    scrollX: !0,
    fixedHeader: true,

    language: { paginate: { previous: "<i class='mdi mdi-chevron-left'>", next: "<i class='mdi mdi-chevron-right'>" } },
    drawCallback: function(settings) {
        $(".dataTables_paginate > .pagination").addClass("pagination-rounded");
        // MergeGridCells('table_presensi_matkul', [1, 2]);

    },
    rowGroup: [1, 2],
    "createdRow": function(row, data, dataIndex) {
        $(row).find('td:first').addClass('no');
        $(row).find('td:eq(1)').addClass('course-name');
        $(row).find('td:eq(4)').addClass('totalDosen');
        $(row).find('td:eq(5)').addClass('linkDosen');
    },
    fixedHeader: true

});


let tabelMhs = $("#table_presensi_matkul_mhs").DataTable({
    // responsive: true,
    // stateSave: true,
    // lengthChange: true, // Atur ke true untuk mengaktifkan opsi perubahan jumlah baris per halaman
    dom: '<"dtsp-verticalContainer"<"dtsp-verticalPanes"P><"dtsp-dataTable"Bfrtip>>',
    // pageLength: 10,
    buttons: [

        { extend: 'copy', },
        { extend: 'csv' },
    ],
    // scrollX: !0,
    fixedHeader: true,

    language: { paginate: { previous: "<i class='mdi mdi-chevron-left'>", next: "<i class='mdi mdi-chevron-right'>" } },
    drawCallback: function() {
        $(".dataTables_paginate > .pagination").addClass("pagination-rounded")
    }

});

$("#semester_select, #program_studi_presensi, #select_mk").select2()



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
    tableStatistik.clear().draw();
    tabelMhs.clear().draw();
    tabelInforMk.clear().draw();



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


                        const namaDosen = await getUserDosen(absenDosen, requestOptions);

                        // const namaDosenListItems = namaDosen.map(dosen => `<li>${dosen.firstname} ${dosen.lastname}</li>`).join('');

                        // Wrap the &lt;li&gt; elements in an &lt;ol&gt; tag
                        // const namaDosenHtml = `<ol>${namaDosenListItems}</ol>`;


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
                        const weekCountersMhs = Object.fromEntries(Object.keys(weeks).map(week => [week, 0]));
                        // const weekCountersDosen = Object.fromEntries(Object.keys(weeks).map(week => [week, 0]));

                        const groupByWeekMhs = (dataAbsen) => {
                            dataAbsen.forEach(item => {
                                const sessdate = formatDate(new Date(item.sessdate * 1000));

                                for (const [week, range] of Object.entries(weeks)) {
                                    if (sessdate >= range.start && sessdate <= range.end) {
                                        weekCountersMhs[week]++;
                                        break;
                                    }
                                }
                            });
                        };

                        const weekCountersDosen = {};
                        namaDosen.forEach(dosen => {
                            weekCountersDosen[dosen.id] = Object.fromEntries(Object.keys(weeks).map(week => [week, 0]));
                        });

                        const groupByWeekDosen = (dataAbsen, absenId) => {
                            dataAbsen.forEach(item => {
                                const sessdate = formatDate(new Date(item.sessdate * 1000));

                                item.attendance_log.forEach(log => {
                                    const dosenId = log.studentid;
                                    const statusId = log.statusid;


                                    if (weekCountersDosen[dosenId] && statusId != absenId) {
                                        for (const [week, range] of Object.entries(weeks)) {
                                            if (sessdate >= range.start && sessdate <= range.end) {
                                                weekCountersDosen[dosenId][week]++;
                                                break;
                                            }
                                        }
                                    }
                                });
                            });
                        };



                        Promise.all([
                                fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=mod_attendance_get_sessions&attendanceid=${absenMhs[0].instance}`, requestOptions),
                                fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=mod_attendance_get_sessions&attendanceid=${absenDosen[0].instance}`, requestOptions),
                                fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=core_group_get_course_groups&courseid=${item.id}`, requestOptions)
                            ])
                            .then(responses => Promise.all(responses.map(response => response.json())))
                            .then(async data => {
                                let absenMhsData = data[0];
                                let absenDosenData = data[1];
                                let groups = data[2];

                                let mahasiswaGroupId = groups.find(group => group.name === "MAHASISWA").id;
                                let dosenGroupId = groups.find(group => group.name === "DOSEN").id;

                                terisiMhs = absenMhsData.filter(sessi => sessi.attendance_log && sessi.attendance_log.length > 0 && sessi.groupid === mahasiswaGroupId);
                                totalMahasiswa = absenMhsData.filter(sessi => sessi.groupid === mahasiswaGroupId).length;

                                const namaDosenById = {};
                                namaDosen.forEach(dosen => {
                                    namaDosenById[dosen.id] = dosen;
                                });





                                console.log(namaDosenById);



                                // Menghitung terisiDosen dan totalDosen
                                let presentStatusId = absenDosenData.find(data => data.statuses.some(status => status.acronym === "P")).statuses.find(status => status.acronym === "P").id;
                                let lateStatusId = absenDosenData.find(data => data.statuses.some(status => status.acronym === "L")).statuses.find(status => status.acronym === "L").id;

                                console.log(presentStatusId, lateStatusId);


                                let absenId = absenDosenData.find(data => data.statuses.some(status => status.acronym === "A")).statuses.find(status => status.acronym === "A").id;

                                let terisiDosen = absenDosenData.filter(sessi => (
                                    sessi.attendance_log && sessi.groupid == dosenGroupId
                                ));

                                console.log(terisiDosen);

                                groupByWeekDosen(terisiDosen, absenId);



                                const courseid = item.id;
                                const courseName = item.fullname;

                                const dosenIds = Object.keys(namaDosenById);
                                const rowspan = dosenIds.length;

                                var dosenByCourse = {};

                                let totalDosen = absenDosenData.filter(sessi => sessi.attendance_log && sessi.attendance_log.some(log => namaDosenById[log.studentid])).length;


                                if (!dosenByCourse[courseName]) {
                                    dosenByCourse[courseName] = {
                                        id: courseid,
                                        dosenList: [],
                                        totalDosen: totalDosen,
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

                                dosenIds.forEach(dosenId => {
                                    const terisiDosenCount = terisiDosen.filter(sessi => sessi.attendance_log.some(log => log.studentid == dosenId && log.statusid != absenId)).length;
                                    dosenByCourse[courseName].dosenList.push({
                                        name: `${namaDosenById[dosenId].firstname} ${namaDosenById[dosenId].lastname}`,
                                        terisiDosenCount: terisiDosenCount,
                                        // absenLink: `<a href="https://sikola-v2.unhas.ac.id/mod/attendance/manage.php?id=${absenDosen[0].id}" target="_blank" class="">Presensi Dosen <i class="fe-external-link"></i></a>`
                                    });

                                    dosenByCourse[courseName].weeklyData.pekan1.push(weekCountersDosen[dosenId].pekan1 || '');
                                    dosenByCourse[courseName].weeklyData.pekan2.push(weekCountersDosen[dosenId].pekan2 || '');
                                    dosenByCourse[courseName].weeklyData.pekan3.push(weekCountersDosen[dosenId].pekan3 || '');
                                    dosenByCourse[courseName].weeklyData.pekan4.push(weekCountersDosen[dosenId].pekan4 || '');
                                    dosenByCourse[courseName].weeklyData.pekan5.push(weekCountersDosen[dosenId].pekan5 || '');
                                    dosenByCourse[courseName].weeklyData.pekan6.push(weekCountersDosen[dosenId].pekan6 || '');
                                    dosenByCourse[courseName].weeklyData.pekan7.push(weekCountersDosen[dosenId].pekan7 || '');
                                    dosenByCourse[courseName].weeklyData.pekan8.push(weekCountersDosen[dosenId].pekan8 || '');
                                    dosenByCourse[courseName].weeklyData.pekan9.push(weekCountersDosen[dosenId].pekan9 || '');
                                    dosenByCourse[courseName].weeklyData.pekan10.push(weekCountersDosen[dosenId].pekan10 || '');
                                    dosenByCourse[courseName].weeklyData.pekan11.push(weekCountersDosen[dosenId].pekan11 || '');
                                    dosenByCourse[courseName].weeklyData.pekan12.push(weekCountersDosen[dosenId].pekan12 || '');
                                    dosenByCourse[courseName].weeklyData.pekan13.push(weekCountersDosen[dosenId].pekan13 || '');
                                    dosenByCourse[courseName].weeklyData.pekan14.push(weekCountersDosen[dosenId].pekan14 || '');
                                    dosenByCourse[courseName].weeklyData.pekan15.push(weekCountersDosen[dosenId].pekan15 || '');
                                    dosenByCourse[courseName].weeklyData.pekan16.push(weekCountersDosen[dosenId].pekan16 || '');
                                    dosenByCourse[courseName].weeklyData.pekan17.push(weekCountersDosen[dosenId].pekan17 || '');
                                    dosenByCourse[courseName].weeklyData.pekan18.push(weekCountersDosen[dosenId].pekan18 || '');
                                });
                                Object.keys(dosenByCourse).forEach((courseName, index) => {

                                    const addBreaks = (hasData) => {
                                        return hasData ? '<br> <br> <br> <br>' : '<br> <br> <br> <br> <br>';
                                    };

                                    const course = dosenByCourse[courseName];
                                    const dosenList = course.dosenList.map(dosen => `<li>${dosen.name}</li><br>`).join('');
                                    const terisiDosenCount = course.dosenList.map(dosen => `<li>${dosen.terisiDosenCount}</li> <br> <br> <br> <br>`).join('');
                                    // const absenLinks = course.dosenList.map(dosen => `<li>${dosen.absenLink}</li>`).join('');

                                    const weeklyDataPekan1 = course.weeklyData.pekan1.map(data => `<li>${data}</li>${addBreaks(data)}`).join('');
                                    const weeklyDataPekan2 = course.weeklyData.pekan2.map(data => `<li>${data}</li>${addBreaks(data)}`).join('');
                                    const weeklyDataPekan3 = course.weeklyData.pekan3.map(data => `<li>${data}</li>${addBreaks(data)}`).join('');
                                    const weeklyDataPekan4 = course.weeklyData.pekan4.map(data => `<li>${data}</li>${addBreaks(data)}`).join('');
                                    const weeklyDataPekan5 = course.weeklyData.pekan5.map(data => `<li>${data}</li>${addBreaks(data)}`).join('');
                                    const weeklyDataPekan6 = course.weeklyData.pekan6.map(data => `<li>${data}</li>${addBreaks(data)}`).join('');
                                    const weeklyDataPekan7 = course.weeklyData.pekan7.map(data => `<li>${data}</li>${addBreaks(data)}`).join('');
                                    const weeklyDataPekan8 = course.weeklyData.pekan8.map(data => `<li>${data}</li>${addBreaks(data)}`).join('');
                                    const weeklyDataPekan9 = course.weeklyData.pekan9.map(data => `<li>${data}</li>${addBreaks(data)}`).join('');
                                    const weeklyDataPekan10 = course.weeklyData.pekan10.map(data => `<li>${data}</li>${addBreaks(data)}`).join('');
                                    const weeklyDataPekan11 = course.weeklyData.pekan11.map(data => `<li>${data}</li>${addBreaks(data)}`).join('');
                                    const weeklyDataPekan12 = course.weeklyData.pekan12.map(data => `<li>${data}</li>${addBreaks(data)}`).join('');
                                    const weeklyDataPekan13 = course.weeklyData.pekan13.map(data => `<li>${data}</li>${addBreaks(data)}`).join('');
                                    const weeklyDataPekan14 = course.weeklyData.pekan14.map(data => `<li>${data}</li>${addBreaks(data)}`).join('');
                                    const weeklyDataPekan15 = course.weeklyData.pekan15.map(data => `<li>${data}</li>${addBreaks(data)}`).join('');
                                    const weeklyDataPekan16 = course.weeklyData.pekan16.map(data => `<li>${data}</li>${addBreaks(data)}`).join('');
                                    const weeklyDataPekan17 = course.weeklyData.pekan17.map(data => `<li>${data}</li>${addBreaks(data)}`).join('');
                                    const weeklyDataPekan18 = course.weeklyData.pekan18.map(data => `<li>${data}</li>${addBreaks(data)}`).join('');

                                    tableStatistik.row.add([
                                        `${counter++}`,
                                        `<a href="https://sikola-v2.unhas.ac.id/course/view.php?id=${course.id}" target="_blank" class="">${courseName} <i class="fe-external-link"></i></a>`,
                                        `<ul class="no-bullets">${dosenList}</ul>`,
                                        `<ul class="no-bullets">${terisiDosenCount}</ul>`,
                                        `${course.totalDosen}`,
                                        `<a href="https://sikola-v2.unhas.ac.id/mod/attendance/manage.php?id=${absenDosen[0].id}" target="_blank" class="">Presensi Dosen <i class="fe-external-link"></i></a>`,
                                        `<ul class="no-bullets">${weeklyDataPekan1}</ul>`,
                                        `<ul class="no-bullets">${weeklyDataPekan2}</ul>`,
                                        `<ul class="no-bullets">${weeklyDataPekan3}</ul>`,
                                        `<ul class="no-bullets">${weeklyDataPekan4}</ul>`,
                                        `<ul class="no-bullets">${weeklyDataPekan5}</ul>`,
                                        `<ul class="no-bullets">${weeklyDataPekan6}</ul>`,
                                        `<ul class="no-bullets">${weeklyDataPekan7}</ul>`,
                                        `<ul class="no-bullets">${weeklyDataPekan8}</ul>`,
                                        `<ul class="no-bullets">${weeklyDataPekan9}</ul>`,
                                        `<ul class="no-bullets">${weeklyDataPekan10}</ul>`,
                                        `<ul class="no-bullets">${weeklyDataPekan11}</ul>`,
                                        `<ul class="no-bullets">${weeklyDataPekan12}</ul>`,
                                        `<ul class="no-bullets">${weeklyDataPekan13}</ul>`,
                                        `<ul class="no-bullets">${weeklyDataPekan14}</ul>`,
                                        `<ul class="no-bullets">${weeklyDataPekan15}</ul>`,
                                        `<ul class="no-bullets">${weeklyDataPekan16}</ul>`,
                                        `<ul class="no-bullets">${weeklyDataPekan17}</ul>`,
                                        `<ul class="no-bullets">${weeklyDataPekan18}</ul>`
                                    ]).draw(false);
                                });

                                // Object.keys(dosenByCourse).forEach((courseName, index) => {
                                //     const course = dosenByCourse[courseName];
                                //     const numRows = course.dosenList.length; // Jumlah baris berdasarkan jumlah dosen

                                //     course.dosenList.forEach((dosen, dosenIndex) => {
                                //         const weeklyDataPekan1 = course.weeklyData.pekan1[dosenIndex] || '';
                                //         const weeklyDataPekan2 = course.weeklyData.pekan2[dosenIndex] || '';
                                //         const weeklyDataPekan3 = course.weeklyData.pekan3[dosenIndex] || '';
                                //         const weeklyDataPekan4 = course.weeklyData.pekan4[dosenIndex] || '';
                                //         const weeklyDataPekan5 = course.weeklyData.pekan5[dosenIndex] || '';
                                //         const weeklyDataPekan6 = course.weeklyData.pekan6[dosenIndex] || '';
                                //         const weeklyDataPekan7 = course.weeklyData.pekan7[dosenIndex] || '';
                                //         const weeklyDataPekan8 = course.weeklyData.pekan8[dosenIndex] || '';
                                //         const weeklyDataPekan9 = course.weeklyData.pekan9[dosenIndex] || '';
                                //         const weeklyDataPekan10 = course.weeklyData.pekan10[dosenIndex] || '';
                                //         const weeklyDataPekan11 = course.weeklyData.pekan11[dosenIndex] || '';
                                //         const weeklyDataPekan12 = course.weeklyData.pekan12[dosenIndex] || '';
                                //         const weeklyDataPekan13 = course.weeklyData.pekan13[dosenIndex] || '';
                                //         const weeklyDataPekan14 = course.weeklyData.pekan14[dosenIndex] || '';
                                //         const weeklyDataPekan15 = course.weeklyData.pekan15[dosenIndex] || '';
                                //         const weeklyDataPekan16 = course.weeklyData.pekan16[dosenIndex] || '';
                                //         const weeklyDataPekan17 = course.weeklyData.pekan17[dosenIndex] || '';

                                //         if (dosenIndex === 0) {
                                //             tableStatistik.row.add([
                                //                 `<td rowspan="${numRows}">${counter++}</td>`,
                                //                 `<td rowspan="${numRows}"><a href="https://sikola-v2.unhas.ac.id/course/view.php?id=${course.id}" target="_blank" class="">${courseName} <i class="fe-external-link"></i></a></td>`,
                                //                 `${dosen.name}`,
                                //                 `${dosen.terisiDosenCount}`,
                                //                 `<td rowspan="${numRows}">${course.totalDosen}</td> `,
                                //                 `<td rowspan="${numRows}">${dosen.absenLink}</td> `,
                                //                 `${weeklyDataPekan1}`,
                                //                 `${weeklyDataPekan2}`,
                                //                 `${weeklyDataPekan3}`,
                                //                 `${weeklyDataPekan4}`,
                                //                 `${weeklyDataPekan5}`,
                                //                 `${weeklyDataPekan6}`,
                                //                 `${weeklyDataPekan7}`,
                                //                 `${weeklyDataPekan8}`,
                                //                 `${weeklyDataPekan9}`,
                                //                 `${weeklyDataPekan10}`,
                                //                 `${weeklyDataPekan11}`,
                                //                 `${weeklyDataPekan12}`,
                                //                 `${weeklyDataPekan13}`,
                                //                 `${weeklyDataPekan14}`,
                                //                 `${weeklyDataPekan15}`,
                                //                 `${weeklyDataPekan16}`,
                                //                 `${weeklyDataPekan17}`
                                //             ]).draw(false);
                                //         } else {
                                //             tableStatistik.row.add([
                                //                 '',
                                //                 '',
                                //                 `${dosen.name}`,
                                //                 `${dosen.terisiDosenCount}`,
                                //                 ``,
                                //                 ``,
                                //                 `${weeklyDataPekan1}`,
                                //                 `${weeklyDataPekan2}`,
                                //                 `${weeklyDataPekan3}`,
                                //                 `${weeklyDataPekan4}`,
                                //                 `${weeklyDataPekan5}`,
                                //                 `${weeklyDataPekan6}`,
                                //                 `${weeklyDataPekan7}`,
                                //                 `${weeklyDataPekan8}`,
                                //                 `${weeklyDataPekan9}`,
                                //                 `${weeklyDataPekan10}`,
                                //                 `${weeklyDataPekan11}`,
                                //                 `${weeklyDataPekan12}`,
                                //                 `${weeklyDataPekan13}`,
                                //                 `${weeklyDataPekan14}`,
                                //                 `${weeklyDataPekan15}`,
                                //                 `${weeklyDataPekan16}`,
                                //                 `${weeklyDataPekan17}`
                                //             ]).draw(false);
                                //         }
                                //     });
                                // });

                                // tableStatistik.row.add([
                                //     `<td rowspan="${rowspan}">${counter++}</td>`,
                                //     `<td rowspan="${rowspan}"><a href="https://sikola-v2.unhas.ac.id/course/view.php?id=${item.id}" target="_blank" class="">${item.fullname} <i class="fe-external-link"></i></a></td>`,
                                //     `<td><li>${namaDosenById[dosenId].firstname} ${namaDosenById[dosenId].lastname}</li></td>`,
                                //     `<td>${terisiDosenCount}</td>`,
                                //     `<td>${totalDosen}</td>`,
                                //     `<a href="https://sikola-v2.unhas.ac.id/mod/attendance/manage.php?id=${absenDosen[0].id}" target="_blank" class="">Presensi Dosen <i class="fe-external-link"></i></a>`,
                                //     d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14, d15, d16, d17
                                // ]).draw(false);









                                // Menambahkan baris pertama dengan rowspan


                                // Menambahkan baris-baris berikutnya
                                // for (let i = 1; i < rows.length; i++) {
                                //     tableStatistik.row.add(['', '', ...rows[i]]).draw(false);
                                // }



                                groupByWeekMhs(terisiMhs);

                                // groupByWeekDosen(terisiDosen);
                                // groupByWeek(terisiDosen);
                                console.log(weekCountersDosen, terisiDosen, terisiMhs);

                                let m1 = weekCountersMhs.pekan1,
                                    m2 = weekCountersMhs.pekan2,
                                    m3 = weekCountersMhs.pekan3,
                                    m4 = weekCountersMhs.pekan4,
                                    m5 = weekCountersMhs.pekan5,
                                    m6 = weekCountersMhs.pekan6,
                                    m7 = weekCountersMhs.pekan7,
                                    m8 = weekCountersMhs.pekan8,
                                    m9 = weekCountersMhs.pekan9,
                                    m10 = weekCountersMhs.pekan10,
                                    m11 = weekCountersMhs.pekan11,
                                    m12 = weekCountersMhs.pekan12,
                                    m13 = weekCountersMhs.pekan13,
                                    m14 = weekCountersMhs.pekan14,
                                    m15 = weekCountersMhs.pekan15,
                                    m16 = weekCountersMhs.pekan16,
                                    m17 = weekCountersMhs.pekan17,
                                    m18 = weekCountersMhs.pekan18;





                                // console.log(weekCounters, "M1");

                                // const namaDosenHtml = namaDosen.map(dosen => `<li>${dosen.firstname} ${dosen.lastname}</li>`).join('');
                                // const rowspan = namaDosen.length;



                                // tableStatistik.row.add([
                                //     `<td rowspan="${rowspan}">${counter++}</td>`,
                                //     `<td rowspan="${rowspan}"><a href="https://sikola-v2.unhas.ac.id/course/view.php?id=${item.id}" target="_blank" class="">${item.fullname} <i class="fe-external-link"></i></a></td>`,
                                //     namaDosenHtml,
                                //     `${terisiDosen.length}`,
                                //     totalDosen,
                                //     `<a href="https://sikola-v2.unhas.ac.id/mod/attendance/manage.php?id=${absenDosen[0].id}" target="_blank" class="">Presensi Dosen <i class="fe-external-link"></i></a>`,
                                //     d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14, d15, d16,

                                // ]).draw(false);

                                tabelMhs.row.add([
                                    counter_m++,
                                    `<a href="https://sikola-v2.unhas.ac.id/course/view.php?id=${item.id}" target="_blank" class="">${item.fullname} <i class="fe-external-link"></i></a>`,
                                    terisiMhs.length,
                                    totalMahasiswa,
                                    `<a href="https://sikola-v2.unhas.ac.id/mod/attendance/manage.php?id=${absenMhs[0].id}" target="_blank" class="">Presensi Mahasiswa <i class="fe-external-link"></i></a>`,
                                    m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12, m13, m14, m15, m16, m17, m18

                                ]).draw(false);




                            })


                        .catch(error => {
                            console.error(error)

                            // console.log(item.fullname, "INF");
                            // tabelInforMk.row.add([
                            //     counter_e++,
                            //     `<a href="https://sikola-v2.unhas.ac.id/course/view.php?id=${item.id}" target="_blank" class="link">${item.fullname} <i class="fe-external-link"></i></a>`,
                            //     "Nama Presensi Tidak Sesuai, Judul InfoMatakuliah Tidak Sesuai"

                            // ]).draw(false);

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
                                const weekCountersMhs = Object.fromEntries(Object.keys(weeks).map(week => [week, 0]));
                                // const weekCountersDosen = Object.fromEntries(Object.keys(weeks).map(week => [week, 0]));

                                const groupByWeekMhs = (dataAbsen) => {
                                    dataAbsen.forEach(item => {
                                        const sessdate = formatDate(new Date(item.sessdate * 1000));

                                        for (const [week, range] of Object.entries(weeks)) {
                                            if (sessdate >= range.start && sessdate <= range.end) {
                                                weekCountersMhs[week]++;
                                                break;
                                            }
                                        }
                                    });
                                };

                                const namaDosen = await getUserDosen(absenDosen, requestOptions);


                                const weekCountersDosen = {};
                                namaDosen.forEach(dosen => {
                                    weekCountersDosen[dosen.id] = Object.fromEntries(Object.keys(weeks).map(week => [week, 0]));
                                });


                                const groupByWeekDosen = (dataAbsen, absenId) => {
                                    dataAbsen.forEach(item => {
                                        const sessdate = formatDate(new Date(item.sessdate * 1000));

                                        item.attendance_log.forEach(log => {
                                            const dosenId = log.studentid;
                                            const statusId = log.statusid;


                                            if (weekCountersDosen[dosenId] && statusId != absenId) {
                                                for (const [week, range] of Object.entries(weeks)) {
                                                    if (sessdate >= range.start && sessdate <= range.end) {
                                                        weekCountersDosen[dosenId][week]++;
                                                        break;
                                                    }
                                                }
                                            }
                                        });
                                    });
                                };






                                Promise.all([
                                        fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=mod_attendance_get_sessions&attendanceid=${absenMhs[0].instance}`, requestOptions),
                                        fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=mod_attendance_get_sessions&attendanceid=${absenDosen[0].instance}`, requestOptions),
                                        fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=core_group_get_course_groups&courseid=${kelas.courses[0].id}`, requestOptions)

                                    ])
                                    .then(responses => Promise.all(responses.map(response => response.json())))
                                    .then(data => {
                                        let absenMhsData = data[0];
                                        let absenDosenData = data[1];
                                        let groups = data[2];



                                        let mahasiswaGroupId = groups.find(group => group.name === "MAHASISWA").id;
                                        let dosenGroupId = groups.find(group => group.name === "DOSEN").id;

                                        terisiMhs = absenMhsData.filter(sessi => sessi.attendance_log && sessi.attendance_log.length > 0 && sessi.groupid === mahasiswaGroupId);
                                        totalMahasiswa = absenMhsData.filter(sessi => sessi.groupid === mahasiswaGroupId).length;

                                        const namaDosenById = {};
                                        namaDosen.forEach(dosen => {
                                            namaDosenById[dosen.id] = dosen;
                                        });
                                        let absenId = absenDosenData.find(data => data.statuses.some(status => status.acronym === "A")).statuses.find(status => status.acronym === "A").id;

                                        let terisiDosen = absenDosenData.filter(sessi => (
                                            sessi.attendance_log && sessi.groupid == dosenGroupId
                                        ));
                                        // Group data by week
                                        groupByWeekDosen(terisiDosen, absenId);

                                        // console.log(terisiDosen, terisiMhs);


                                        const courseid = kelas.courses[0].id;
                                        const courseName = kelas.courses[0].fullname;

                                        const dosenIds = Object.keys(namaDosenById);
                                        const rowspan = dosenIds.length;


                                        let totalDosen = absenDosenData.filter(sessi => sessi.attendance_log && sessi.attendance_log.some(log => namaDosenById[log.studentid])).length;

                                        var dosenByCourse = {};

                                        if (!dosenByCourse[courseName]) {
                                            dosenByCourse[courseName] = {
                                                id: courseid,
                                                dosenList: [],
                                                totalDosen: totalDosen,
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

                                        dosenIds.forEach(dosenId => {
                                            const terisiDosenCount = terisiDosen.filter(sessi => sessi.attendance_log.some(log => log.studentid == dosenId && log.statusid != absenId)).length;
                                            dosenByCourse[courseName].dosenList.push({
                                                name: `${namaDosenById[dosenId].firstname} ${namaDosenById[dosenId].lastname}`,
                                                terisiDosenCount: terisiDosenCount,
                                                // absenLink: `<a href="https://sikola-v2.unhas.ac.id/mod/attendance/manage.php?id=${absenDosen[0].id}" target="_blank" class="">Presensi Dosen <i class="fe-external-link"></i></a>`
                                            });

                                            dosenByCourse[courseName].weeklyData.pekan1.push(weekCountersDosen[dosenId].pekan1 || '');
                                            dosenByCourse[courseName].weeklyData.pekan2.push(weekCountersDosen[dosenId].pekan2 || '');
                                            dosenByCourse[courseName].weeklyData.pekan3.push(weekCountersDosen[dosenId].pekan3 || '');
                                            dosenByCourse[courseName].weeklyData.pekan4.push(weekCountersDosen[dosenId].pekan4 || '');
                                            dosenByCourse[courseName].weeklyData.pekan5.push(weekCountersDosen[dosenId].pekan5 || '');
                                            dosenByCourse[courseName].weeklyData.pekan6.push(weekCountersDosen[dosenId].pekan6 || '');
                                            dosenByCourse[courseName].weeklyData.pekan7.push(weekCountersDosen[dosenId].pekan7 || '');
                                            dosenByCourse[courseName].weeklyData.pekan8.push(weekCountersDosen[dosenId].pekan8 || '');
                                            dosenByCourse[courseName].weeklyData.pekan9.push(weekCountersDosen[dosenId].pekan9 || '');
                                            dosenByCourse[courseName].weeklyData.pekan10.push(weekCountersDosen[dosenId].pekan10 || '');
                                            dosenByCourse[courseName].weeklyData.pekan11.push(weekCountersDosen[dosenId].pekan11 || '');
                                            dosenByCourse[courseName].weeklyData.pekan12.push(weekCountersDosen[dosenId].pekan12 || '');
                                            dosenByCourse[courseName].weeklyData.pekan13.push(weekCountersDosen[dosenId].pekan13 || '');
                                            dosenByCourse[courseName].weeklyData.pekan14.push(weekCountersDosen[dosenId].pekan14 || '');
                                            dosenByCourse[courseName].weeklyData.pekan15.push(weekCountersDosen[dosenId].pekan15 || '');
                                            dosenByCourse[courseName].weeklyData.pekan16.push(weekCountersDosen[dosenId].pekan16 || '');
                                            dosenByCourse[courseName].weeklyData.pekan17.push(weekCountersDosen[dosenId].pekan17 || '');
                                            dosenByCourse[courseName].weeklyData.pekan18.push(weekCountersDosen[dosenId].pekan18 || '');
                                        });

                                        Object.keys(dosenByCourse).forEach((courseName, index) => {

                                            const addBreaks = (hasData) => {
                                                return hasData ? '<br> <br> <br> <br>' : '<br> <br> <br> <br> <br>';
                                            };

                                            const course = dosenByCourse[courseName];
                                            const dosenList = course.dosenList.map(dosen => `<li>${dosen.name}</li><br>`).join('');
                                            const terisiDosenCount = course.dosenList.map(dosen => `<li>${dosen.terisiDosenCount}</li> <br> <br> <br> <br>`).join('');
                                            // const absenLinks = course.dosenList.map(dosen => `<li>${dosen.absenLink}</li>`).join('');

                                            const weeklyDataPekan1 = course.weeklyData.pekan1.map(data => `<li>${data}</li>${addBreaks(data)}`).join('');
                                            const weeklyDataPekan2 = course.weeklyData.pekan2.map(data => `<li>${data}</li>${addBreaks(data)}`).join('');
                                            const weeklyDataPekan3 = course.weeklyData.pekan3.map(data => `<li>${data}</li>${addBreaks(data)}`).join('');
                                            const weeklyDataPekan4 = course.weeklyData.pekan4.map(data => `<li>${data}</li>${addBreaks(data)}`).join('');
                                            const weeklyDataPekan5 = course.weeklyData.pekan5.map(data => `<li>${data}</li>${addBreaks(data)}`).join('');
                                            const weeklyDataPekan6 = course.weeklyData.pekan6.map(data => `<li>${data}</li>${addBreaks(data)}`).join('');
                                            const weeklyDataPekan7 = course.weeklyData.pekan7.map(data => `<li>${data}</li>${addBreaks(data)}`).join('');
                                            const weeklyDataPekan8 = course.weeklyData.pekan8.map(data => `<li>${data}</li>${addBreaks(data)}`).join('');
                                            const weeklyDataPekan9 = course.weeklyData.pekan9.map(data => `<li>${data}</li>${addBreaks(data)}`).join('');
                                            const weeklyDataPekan10 = course.weeklyData.pekan10.map(data => `<li>${data}</li>${addBreaks(data)}`).join('');
                                            const weeklyDataPekan11 = course.weeklyData.pekan11.map(data => `<li>${data}</li>${addBreaks(data)}`).join('');
                                            const weeklyDataPekan12 = course.weeklyData.pekan12.map(data => `<li>${data}</li>${addBreaks(data)}`).join('');
                                            const weeklyDataPekan13 = course.weeklyData.pekan13.map(data => `<li>${data}</li>${addBreaks(data)}`).join('');
                                            const weeklyDataPekan14 = course.weeklyData.pekan14.map(data => `<li>${data}</li>${addBreaks(data)}`).join('');
                                            const weeklyDataPekan15 = course.weeklyData.pekan15.map(data => `<li>${data}</li>${addBreaks(data)}`).join('');
                                            const weeklyDataPekan16 = course.weeklyData.pekan16.map(data => `<li>${data}</li>${addBreaks(data)}`).join('');
                                            const weeklyDataPekan17 = course.weeklyData.pekan17.map(data => `<li>${data}</li>${addBreaks(data)}`).join('');
                                            const weeklyDataPekan18 = course.weeklyData.pekan18.map(data => `<li>${data}</li>${addBreaks(data)}`).join('');

                                            tableStatistik.row.add([
                                                `${counter++}`,
                                                `<a href="https://sikola-v2.unhas.ac.id/course/view.php?id=${course.id}" target="_blank" class="">${courseName} <i class="fe-external-link"></i></a>`,
                                                `<ul class="no-bullets">${dosenList}</ul>`,
                                                `<ul class="no-bullets">${terisiDosenCount}</ul>`,
                                                `${course.totalDosen}`,
                                                `<a href="https://sikola-v2.unhas.ac.id/mod/attendance/manage.php?id=${absenDosen[0].id}" target="_blank" class="">Presensi Dosen <i class="fe-external-link"></i></a>`,
                                                `<ul class="no-bullets">${weeklyDataPekan1}</ul>`,
                                                `<ul class="no-bullets">${weeklyDataPekan2}</ul>`,
                                                `<ul class="no-bullets">${weeklyDataPekan3}</ul>`,
                                                `<ul class="no-bullets">${weeklyDataPekan4}</ul>`,
                                                `<ul class="no-bullets">${weeklyDataPekan5}</ul>`,
                                                `<ul class="no-bullets">${weeklyDataPekan6}</ul>`,
                                                `<ul class="no-bullets">${weeklyDataPekan7}</ul>`,
                                                `<ul class="no-bullets">${weeklyDataPekan8}</ul>`,
                                                `<ul class="no-bullets">${weeklyDataPekan9}</ul>`,
                                                `<ul class="no-bullets">${weeklyDataPekan10}</ul>`,
                                                `<ul class="no-bullets">${weeklyDataPekan11}</ul>`,
                                                `<ul class="no-bullets">${weeklyDataPekan12}</ul>`,
                                                `<ul class="no-bullets">${weeklyDataPekan13}</ul>`,
                                                `<ul class="no-bullets">${weeklyDataPekan14}</ul>`,
                                                `<ul class="no-bullets">${weeklyDataPekan15}</ul>`,
                                                `<ul class="no-bullets">${weeklyDataPekan16}</ul>`,
                                                `<ul class="no-bullets">${weeklyDataPekan17}</ul>`,
                                                `<ul class="no-bullets">${weeklyDataPekan18}</ul>`
                                            ]).draw(false);
                                        });


                                        // let d1 = weekCountersDosen.pekan1,
                                        //     d2 = weekCountersDosen.pekan2,
                                        //     d3 = weekCountersDosen.pekan3,
                                        //     d4 = weekCountersDosen.pekan4,
                                        //     d5 = weekCountersDosen.pekan5,
                                        //     d6 = weekCountersDosen.pekan6,
                                        //     d7 = weekCountersDosen.pekan7,
                                        //     d8 = weekCountersDosen.pekan8,
                                        //     d9 = weekCountersDosen.pekan9,
                                        //     d10 = weekCountersDosen.pekan10,
                                        //     d11 = weekCountersDosen.pekan11,
                                        //     d12 = weekCountersDosen.pekan12,
                                        //     d13 = weekCountersDosen.pekan13,
                                        //     d14 = weekCountersDosen.pekan14,
                                        //     d15 = weekCountersDosen.pekan15,
                                        //     d16 = weekCountersDosen.pekan16;

                                        // tableStatistik.row.add([
                                        //     counter++,
                                        //     `<a href="https://sikola-v2.unhas.ac.id/course/view.php?id=${kelas.courses[0].id}" target="_blank" class="">${kelas.courses[0].fullname} <i class="fe-external-link"></i></a>`,
                                        //     `${terisiDosen.length}`,
                                        //     totalDosen,
                                        //     `<a href="https://sikola-v2.unhas.ac.id/mod/attendance/manage.php?id=${absenDosen[0].id}" target="_blank" class="">Presensi Dosen <i class="fe-external-link"></i></a>`,
                                        //     d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14, d15, d16,


                                        // ]).draw(false);


                                        groupByWeekMhs(terisiMhs);
                                        let m1 = weekCountersMhs.pekan1,
                                            m2 = weekCountersMhs.pekan2,
                                            m3 = weekCountersMhs.pekan3,
                                            m4 = weekCountersMhs.pekan4,
                                            m5 = weekCountersMhs.pekan5,
                                            m6 = weekCountersMhs.pekan6,
                                            m7 = weekCountersMhs.pekan7,
                                            m8 = weekCountersMhs.pekan8,
                                            m9 = weekCountersMhs.pekan9,
                                            m10 = weekCountersMhs.pekan10,
                                            m11 = weekCountersMhs.pekan11,
                                            m12 = weekCountersMhs.pekan12,
                                            m13 = weekCountersMhs.pekan13,
                                            m14 = weekCountersMhs.pekan14,
                                            m15 = weekCountersMhs.pekan15,
                                            m16 = weekCountersMhs.pekan16,
                                            m17 = weekCountersMhs.pekan17,
                                            m18 = weekCountersMhs.pekan18;


                                        tabelMhs.row.add([
                                            counter_m++,
                                            `<a href="https://sikola-v2.unhas.ac.id/course/view.php?id=${kelas.courses[0].id}" target="_blank" class="">${kelas.courses[0].fullname} <i class="fe-external-link"></i></a>`,
                                            terisiMhs.length,
                                            totalMahasiswa,
                                            `<a href="https://sikola-v2.unhas.ac.id/mod/attendance/manage.php?id=${absenMhs[0].id}" target="_blank" class="">Presensi Mahasiswa <i class="fe-external-link"></i></a>`,
                                            m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12, m13, m14, m15, m16, m17, m18

                                        ]).draw(false);


                                    })

                                .catch(error => {
                                    console.error(error)

                                    // tabelInforMk.row.add([
                                    //     counter++,
                                    //     kelas.courses[0].fullname,

                                    // ]).draw(false);

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

const clear_filter = async() => {
    isFilterCleared = true; // Setel flag menjadi true

    const chartElement = document.querySelector('#apex-pie-1');
    if (chartElement && chartElement._chartInstance) {
        console.log(chartElement._chartInstance);
        chartElement._chartInstance.destroy();
    }

    const chartElement2 = document.querySelector('#apex-column-2');
    if (chartElement2 && chartElement2._chartInstance) {
        console.log(chartElement2._chartInstance);
        chartElement2._chartInstance.destroy();
    }
    localStorage.removeItem('nama_prodi_storage');
    localStorage.removeItem('id_prodi_storage');
    localStorage.removeItem('semester_aktif_storage');
    localStorage.removeItem('selectedKodeMatkul_storage');
    localStorage.removeItem('fullname_sikola_storage');
    localStorage.removeItem('mk_value_storage');
    localStorage.removeItem('mk_aktif');


    $("#judul_prodi, #judul_prodi_mhs, #judul_prodi_e").html("")
    $("#filter_data").attr("disabled", true)

    tableStatistik.clear().draw();
    tabelMhs.clear().draw();
    tabelInforMk.clear().draw();
    $("#semester_select, #program_studi, #select_mk").val("").trigger("change");



}

async function getUserDosen(absenDosen, requestOptions) {
    try {
        const response = await fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=mod_attendance_get_sessions&attendanceid=${absenDosen[0].instance}`, requestOptions);
        const result = await response.json();
        const namaDosen = result[0].users;
        return namaDosen;
    } catch (error) {
        console.error(error);
        return null;
    }
}