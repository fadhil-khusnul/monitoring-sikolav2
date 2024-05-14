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

document.getElementById("program_studi_presensi").addEventListener("change", function() {
    prodi_presensi(this);
});

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

                optgroup.appendChild(option);
            });

            select.appendChild(optgroup);
        }

        $(select).on("change", function(e) {
            $("#loader").removeClass("d-none").addClass("d-flex")

            const selectedOption = this.options[this.selectedIndex].value;
            console.log(selectedOption);
            $("#kode_mk\\[1\\]").val(null).trigger("change");

            $("#judul_prodi").html("")

            $("#judul_prodi").html(selectedOption)


            tableStatistik.clear().draw();
            tabelInforMk.clear().draw();

            let counter = 1;
            let counter_e = 1;


            const requestOptions = {
                method: "GET",
                redirect: "follow"
            };

            fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=core_course_get_categories&criteria[0][key]=name&criteria[0][value]=${selectedOption}`, requestOptions)
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
                                                    <a href="https://sikola-v2.unhas.ac.id/course/view.php?id=${item.id}" target="_blank" class="">${item.fullname} <i class="fe-external-link"></i></a>

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

                                            console.log(item.fullname, "INF");
                                            tabelInforMk.row.add([
                                                counter++,
                                                item.fullname,

                                            ]).draw(false);

                                        });

                                        // let terisiDosen, totalDosen, terisiMhs, totalMahasiswa;

                                        // fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=mod_attendance_get_sessions&attendanceid=${absenMhs[0].instance}`, requestOptions)
                                        //     .then((response) => response.json())
                                        //     .then(absen => {
                                        //         // let tidakTerisiMhs = absen.filter(sessi => sessi.attendance_log && sessi.attendance_log.length === 0);
                                        //         terisiMhs = absen.filter(sessi => sessi.attendance_log && sessi.attendance_log.length > 0);
                                        //         totalMahasiswa = absen.length



                                        //     })
                                        //     .catch((error) => console.error(error));
                                        // fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=mod_attendance_get_sessions&attendanceid=${absenDosen[0].instance}`, requestOptions)
                                        //     .then((response) => response.json())
                                        //     .then(absen => {
                                        //         // let tidakTerisiMhs = absen.filter(sessi => sessi.attendance_log && sessi.attendance_log.length === 0);
                                        //         terisiDosen = absen.filter(sessi => sessi.attendance_log && sessi.attendance_log.length > 0);
                                        //         totalDosen = absen.length

                                        //     })
                                        //     .catch((error) => console.error(error));


                                        // console.log(terisiDosen, terisiMhs);
                                        // tableStatistik.row.add([
                                        //     counter++,
                                        //     item.fullname,
                                        //     terisiDosen,
                                        //     totalDosen,
                                        //     terisiMhs,
                                        //     totalMahasiswa,
                                        //     absenBermasalah

                                        //     // tidakTerisi.length,

                                        // ]).draw(false);


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




        })
    });

function prodi_presensi(prodi) {

    console.log(prodi.value);


}