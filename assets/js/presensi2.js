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
    drawCallback: function() {
        $(".dataTables_paginate > .pagination").addClass("pagination-rounded")
    }

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
    scrollX: !0,
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

localStorage.setItem('mk_aktif', active);

let id_fakultas = 19;

const selectSemester = document.getElementById("semester_select")

optionDefault = document.createElement("option")
optionDefault.value = 72
optionDefault.text = "2023/2024 (20232/GENAP)"
optionDefault.setAttribute('ta_semester', "TA232");
optionDefault.setAttribute("mk_aktif", active);

selectSemester.appendChild(optionDefault)


let counter = 1;
let counter_m = 1;
let counter_e = 1;

const requestOptions = {
    method: "GET",
    redirect: "follow"
};
const nama_prodi_stor = localStorage.getItem('nama_prodi');
const id_prodi_stor = localStorage.getItem('id_prodi');
const mk_aktif = localStorage.getItem('mk_aktif');
const params_storage = localStorage.getItem('params_storage');

get_prodi(true).then(() => {
    if (nama_prodi_stor && id_prodi_stor) {
        tableStatistik.clear().draw();

        $("#judul_prodi").html(nama_prodi_stor);
        $("#program_studi_presensi").val(nama_prodi_stor).trigger('change'); // Menggunakan select2 method untuk set nilai
        $("#semester_select").val(72).trigger('change'); // Menggunakan select2 method untuk set nilai
        $("#judul_prodi_kendala").html(nama_prodi_stor);

        let counter = 1;
        let counter_m = 1;
        let counter_e = 1;
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        select_mk_fun(id_prodi_stor, nama_prodi_stor, requestOptions, counter, mk_aktif, counter_e, counter_m);


    }
});
async function get_prodi(skipInitialLoad = false) {

    tableStatistik.clear().draw();

    const response = await fetch('assets/data/get_all_prodi.json');
    const data = await response.json();

    let groups = {};
    const select = document.getElementById("program_studi_presensi");

    const listProdi = data.filter(prodi => prodi.fakultas.id === id_fakultas)
    listProdi.forEach(item => {
        const option = document.createElement("option");
        option.value = item.nama_resmi;
        option.text = item.nama_resmi;
        option.setAttribute('data_fakultas', item.fakultas.nama_resmi);
        option.setAttribute('id_prodi', item.id);

        select.appendChild(option);
    });



    $("#loader").removeClass("d-none").addClass("d-flex");


    $(select).on("change", function(e) {

        if (skipInitialLoad) {
            skipInitialLoad = false; // Reset the flag after the initial load
            return; // Skip the function call if it's the initial load
        }
        // console.log(params);

        // const paramsOptions = params.options[params.selectedIndex];
        const mk_aktif = localStorage.getItem("mk_aktif");
        const selectedOption = this.options[this.selectedIndex];
        const nama_prodi = this.options[this.selectedIndex].value;
        const id_prodi = selectedOption.getAttribute('id_prodi');

        let counter = 1;
        let counter_m = 1;
        let counter_e = 1;


        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        localStorage.setItem('nama_prodi', nama_prodi);
        localStorage.setItem('id_prodi', id_prodi);
        localStorage.setItem('mk_aktif', mk_aktif);


        $("#judul_prodi").html("")
        $("#judul_prodi").html(nama_prodi)
        $("#judul_prodi_kendala").html("")
        $("#judul_prodi_kendala").html(nama_prodi)


        if (!skipInitialLoad) {

            select_mk_fun(id_prodi, nama_prodi, requestOptions, counter, mk_aktif, counter_e, counter_m)
        }




    })

}

async function select_mk_fun(id_prodi, nama_prodi, requestOptions, counter, mk_aktif, counter_e, counter_m) {
    $("#select_mk").empty();
    tableStatistik.clear().draw();
    tabelMhs.clear().draw();
    tabelInforMk.clear().draw();

    fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=core_course_get_categories&criteria[0][key]=name&criteria[0][value]=${nama_prodi}`, requestOptions)
        .then((response) => response.json())
        .then(result => {
            console.log(result[0].id)
            fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=core_course_get_courses_by_field&field=category&value=${result[0].id}`, requestOptions)
                .then((response) => response.json())
                .then(dataCourses => {

                    let filteredCourses = dataCourses.courses.filter(course => course.shortname.includes(activeSemester));

                    filteredCourses.forEach(item => {
                        fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=core_course_get_contents&courseid=${item.id}`, requestOptions)
                            .then((response) => response.json())
                            .then(result => {



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
                                const numWeeks = 16;
                                const weeks = generateWeeks(startDate, numWeeks);
                                const weekCountersMhs = Object.fromEntries(Object.keys(weeks).map(week => [week, 0]));
                                const weekCountersDosen = Object.fromEntries(Object.keys(weeks).map(week => [week, 0]));

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

                                const groupByWeekDosen = (dataAbsen) => {
                                    dataAbsen.forEach(item => {
                                        const sessdate = formatDate(new Date(item.sessdate * 1000));

                                        for (const [week, range] of Object.entries(weeks)) {
                                            if (sessdate >= range.start && sessdate <= range.end) {
                                                weekCountersDosen[week]++;
                                                break;
                                            }
                                        }
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

                                        terisiDosen = absenDosenData.filter(sessi => sessi.attendance_log && sessi.attendance_log.length > 0 && sessi.groupid === dosenGroupId);
                                        totalDosen = absenDosenData.filter(sessi => sessi.groupid === dosenGroupId).length;

                                        // Group data by week
                                        groupByWeekMhs(terisiMhs);
                                        groupByWeekDosen(terisiDosen);
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
                                            m16 = weekCountersMhs.pekan16;

                                        let d1 = weekCountersDosen.pekan1,
                                            d2 = weekCountersDosen.pekan2,
                                            d3 = weekCountersDosen.pekan3,
                                            d4 = weekCountersDosen.pekan4,
                                            d5 = weekCountersDosen.pekan5,
                                            d6 = weekCountersDosen.pekan6,
                                            d7 = weekCountersDosen.pekan7,
                                            d8 = weekCountersDosen.pekan8,
                                            d9 = weekCountersDosen.pekan9,
                                            d10 = weekCountersDosen.pekan10,
                                            d11 = weekCountersDosen.pekan11,
                                            d12 = weekCountersDosen.pekan12,
                                            d13 = weekCountersDosen.pekan13,
                                            d14 = weekCountersDosen.pekan14,
                                            d15 = weekCountersDosen.pekan15,
                                            d16 = weekCountersDosen.pekan16;



                                        // console.log(weekCounters, "M1");



                                        tableStatistik.row.add([
                                            counter++,
                                            `<a href="https://sikola-v2.unhas.ac.id/course/view.php?id=${item.id}" target="_blank" class="">${item.fullname} <i class="fe-external-link"></i></a>`,
                                            `${terisiDosen.length}`,
                                            totalDosen,
                                            `<a href="https://sikola-v2.unhas.ac.id/mod/attendance/manage.php?id=${absenDosen[0].id}" target="_blank" class="">Presensi Dosen <i class="fe-external-link"></i></a>`,
                                            d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14, d15, d16,

                                        ]).draw(false);

                                        tabelMhs.row.add([
                                            counter_m++,
                                            `<a href="https://sikola-v2.unhas.ac.id/course/view.php?id=${item.id}" target="_blank" class="">${item.fullname} <i class="fe-external-link"></i></a>`,
                                            terisiMhs.length,
                                            totalMahasiswa,
                                            `<a href="https://sikola-v2.unhas.ac.id/mod/attendance/manage.php?id=${absenMhs[0].id}" target="_blank" class="">Presensi Mahasiswa <i class="fe-external-link"></i></a>`,
                                            m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12, m13, m14, m15, m16,

                                        ]).draw(false);


                                    })

                                .catch(error => {
                                    console.error(error)

                                    console.log(item.fullname, "INF");
                                    tabelInforMk.row.add([
                                        counter++,
                                        item.fullname,

                                    ]).draw(false);

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
                    $("#loader").removeClass("d-flex").addClass("d-none")

                })
                .catch((error) => console.error(error));
        })
        .catch(error => {
            console.error(error);
            $("#loader").removeClass("d-flex").addClass("d-none")

        });

    fetch_mk(mk_aktif, id_prodi, requestOptions)


}

async function fetch_mk(mk_aktif, id_prodi, requestOptions) {

    fetch('assets/data/list_mk.json').then(response => response.json())
        .then(data => {

            const select_mk = document.getElementById("select_mk");

            const default_Mk = document.createElement("option")
            default_Mk.text = "Pilih Mk"
            default_Mk.setAttribute("value", "")
            default_Mk.setAttribute("disabled", "true")
            default_Mk.setAttribute("selected", "true")
            select_mk.appendChild(default_Mk)

            const listAktif = data.filter(mk => mk.nama_category_periode_sikola === mk_aktif)
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
            $("#loader").removeClass("d-none").addClass("d-flex")
            $(select_mk).off("change");
            $(select_mk).on("change", function(e) {

                const selectedOption = this.options[this.selectedIndex];
                const selectedKodeMatkul = selectedOption.getAttribute('data_kode_matkul');
                const nama_prodi = selectedOption.getAttribute('nama_prodi');
                const fullname_sikola = selectedOption.getAttribute('fullname_sikola');

                // $("#program_studi").val(null).trigger("change");
                $("#judul_prodi").html("")


                $("#judul_prodi").html(fullname_sikola + " / " + nama_prodi)
                console.log(selectedKodeMatkul);

                tableStatistik.clear().draw();

                // let counter = 1;
                fetch('assets/data/list_mk_per_kelas.json')
                    .then(response => response.json())
                    .then(data => {
                        console.log(selectedKodeMatkul);


                        const filteredData = data.filter(item => item.kode_matkul === selectedKodeMatkul);
                        let counter = 1;
                        let counter_e = 1;

                        filteredData.forEach(item => {
                            console.log(item.shortname_sikola);
                            fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=core_course_get_courses_by_field&field=shortname&value=${item.shortname_sikola}`, requestOptions)
                                .then((response) => response.json())
                                .then(kelas => {
                                    fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=core_course_get_contents&courseid=${kelas.courses[0].id}`, requestOptions)
                                        .then((response) => response.json())
                                        .then(result => {
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


                                            Promise.all([
                                                    fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=mod_attendance_get_sessions&attendanceid=${absenMhs[0].instance}`, requestOptions),
                                                    fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=mod_attendance_get_sessions&attendanceid=${absenDosen[0].instance}`, requestOptions)
                                                ])
                                                .then(responses => Promise.all(responses.map(response => response.json())))
                                                .then(data => {
                                                    let absenMhsData = data[0];
                                                    let absenDosenData = data[1];

                                                    var m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12, m13, m14, m15, m16 = 0


                                                    terisiMhs = absenMhsData.filter(sessi => sessi.attendance_log && sessi.attendance_log.length > 0);
                                                    totalMahasiswa = absenMhsData.length;

                                                    terisiDosen = absenDosenData.filter(sessi => sessi.attendance_log && sessi.attendance_log.length > 0);
                                                    totalDosen = absenDosenData.length;

                                                    console.log(terisiDosen, terisiMhs);
                                                    tableStatistik.row.add([
                                                        counter++,
                                                        `<a href="https://sikola-v2.unhas.ac.id/course/view.php?id=${kelas.courses[0].id}" target="_blank" class="">${kelas.courses[0].fullname} <i class="fe-external-link"></i></a>`,
                                                        m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12, m13, m14, m15, m16,
                                                        `${terisiDosen.length}`,
                                                        totalDosen,
                                                        `<a href="https://sikola-v2.unhas.ac.id/mod/attendance/manage.php?id=${absenDosen[0].id}" target="_blank" class="">Presensi Dosen <i class="fe-external-link"></i></a>`,
                                                        terisiMhs.length,
                                                        totalMahasiswa,
                                                        `<a href="https://sikola-v2.unhas.ac.id/mod/attendance/manage.php?id=${absenMhs[0].id}" target="_blank" class="">Presensi Mahasiswa <i class="fe-external-link"></i></a>`,

                                                    ]).draw(false);
                                                })

                                            .catch(error => {
                                                console.error(error)

                                                tabelInforMk.row.add([
                                                    counter++,
                                                    kelas.courses[0].fullname,

                                                ]).draw(false);

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
                        $("#loader").removeClass("d-flex").addClass("d-none")

                    })
                    .catch(error => {
                        $("#loader").removeClass("d-flex").addClass("d-none")


                        console.error('Error loading JSON file:', error)
                    });
            });


        }).catch(error => {
            console.log(error)

        })

}