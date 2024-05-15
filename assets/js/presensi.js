let tableStatistik = $("#table_presensi_matkul").DataTable({

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


const selectSemester = document.getElementById("semester_select")

optionDefault = document.createElement("option")
optionDefault.value = 72
optionDefault.text = "2023/2024 (20232/GENAP)"
optionDefault.setAttribute('ta_semester', "TA232");
optionDefault.setAttribute("mk_aktif", active);

selectSemester.appendChild(optionDefault)

async function get_prodi(params) {

    fetch('assets/data/get_all_prodi.json')
        .then(response => response.json())
        .then(data => {
            let groups = {};

            data.forEach(item => {
                const fakultasId = item.fakultas.id;
                if (!groups[fakultasId]) {
                    groups[fakultasId] = [];
                }
                groups[fakultasId].push(item);
            });

            const select = document.getElementById("program_studi_presensi");

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

            $("#loader").removeClass("d-none").addClass("d-flex");


            $(select).on("change", function(e) {

                const paramsOptions = params.options[params.selectedIndex];
                const mk_aktif = paramsOptions.getAttribute('mk_aktif');
                const selectedOption = this.options[this.selectedIndex];
                const nama_prodi = this.options[this.selectedIndex].value;
                const id_prodi = selectedOption.getAttribute('id_prodi');

                let counter = 1;
                let counter_e = 1;


                const requestOptions = {
                    method: "GET",
                    redirect: "follow"
                };


                $("#judul_prodi").html("")
                $("#judul_prodi").html(nama_prodi)




                select_mk_fun(id_prodi, nama_prodi, requestOptions, counter, mk_aktif, counter_e)

            })
        });
}

async function select_mk_fun(id_prodi, nama_prodi, requestOptions, counter, mk_aktif, counter_e) {
    $("#select_mk").empty();
    tableStatistik.clear().draw();
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



                                Promise.all([
                                        fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=mod_attendance_get_sessions&attendanceid=${absenMhs[0].instance}`, requestOptions),
                                        fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=mod_attendance_get_sessions&attendanceid=${absenDosen[0].instance}`, requestOptions)
                                    ])
                                    .then(responses => Promise.all(responses.map(response => response.json())))
                                    .then(data => {
                                        let absenMhsData = data[0];
                                        let absenDosenData = data[1];

                                        terisiMhs = absenMhsData.filter(sessi => sessi.attendance_log && sessi.attendance_log.length > 0);
                                        totalMahasiswa = absenMhsData.length;

                                        terisiDosen = absenDosenData.filter(sessi => sessi.attendance_log && sessi.attendance_log.length > 0);
                                        totalDosen = absenDosenData.length;

                                        console.log(terisiDosen, terisiMhs);
                                        tableStatistik.row.add([
                                            counter++,
                                            `<a href="https://sikola-v2.unhas.ac.id/course/view.php?id=${item.id}" target="_blank" class="">${item.fullname} <i class="fe-external-link"></i></a>`,
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

                                                    terisiMhs = absenMhsData.filter(sessi => sessi.attendance_log && sessi.attendance_log.length > 0);
                                                    totalMahasiswa = absenMhsData.length;

                                                    terisiDosen = absenDosenData.filter(sessi => sessi.attendance_log && sessi.attendance_log.length > 0);
                                                    totalDosen = absenDosenData.length;

                                                    console.log(terisiDosen, terisiMhs);
                                                    tableStatistik.row.add([
                                                        counter++,
                                                        `
                                                  <a href="https://sikola-v2.unhas.ac.id/course/view.php?id=${kelas.courses[0].id}" target="_blank" class="">${kelas.courses[0].fullname} <i class="fe-external-link"></i></a>

                                                  `,
                                                        `${terisiDosen.length}`,
                                                        totalDosen,
                                                        `
                                                  <a href="https://sikola-v2.unhas.ac.id/mod/attendance/manage.php?id=${absenDosen[0].id}" target="_blank" class="">Presensi Dosen <i class="fe-external-link"></i></a>
                                                  `,
                                                        terisiMhs.length,
                                                        totalMahasiswa,
                                                        `
                                                  <a href="https://sikola-v2.unhas.ac.id/mod/attendance/manage.php?id=${absenMhs[0].id}" target="_blank" class="">Presensi Mahasiswa <i class="fe-external-link"></i></a>
                                                  `,

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