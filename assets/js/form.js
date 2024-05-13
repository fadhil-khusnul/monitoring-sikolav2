var tableStatistik = $("#table_statistik_matkul").DataTable({

    // stateSave: true,
    lengthChange: true, // Atur ke true untuk mengaktifkan opsi perubahan jumlah baris per halaman
    dom: '<"dtsp-verticalContainer"<"dtsp-verticalPanes"P><"dtsp-dataTable"Bfrtip>>',
    pageLength: 25,
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
// tableStatistik.buttons().container().appendTo("#datatable-buttons_wrapper .col-md-6:eq(0)");

// var selectedMK = $('#kode_mk[1]').select2();
// console.log(selectedMK);

let activeSemester = "TA232"
fetch('assets/data/list_mk.json')
    .then(response => response.json())
    .then(data => {
        let groups = {};

        const select11 = document.getElementById("kode_mk[1]");
        const select22 = document.getElementById("id_kelas_kuliah[1]");


        data.forEach(item => {
            if (!groups[item.nama_prodi]) {
                groups[item.nama_prodi] = document.createElement('optgroup');
                groups[item.nama_prodi].label = item.nama_prodi;
                select11.appendChild(groups[item.nama_prodi]);
            }

            const option = document.createElement('option');

            option.setAttribute('data_kode_matkul', item.kode_matkul);
            option.setAttribute('nama_prodi', item.nama_prodi);
            option.setAttribute('fullname_sikola', item.fullname_sikola);

            option.value = item.idnumber_sikola;
            option.text = item.fullname_sikola;

            groups[item.nama_prodi].appendChild(option);
        });


        // Add event listener to select11
        $(select11).on("change", function(e) {
            $("#loader").removeClass("d-none").addClass("d-flex")

            const selectedOption = this.options[this.selectedIndex];
            const selectedKodeMatkul = selectedOption.getAttribute('data_kode_matkul');
            const nama_prodi = selectedOption.getAttribute('nama_prodi');
            const fullname_sikola = selectedOption.getAttribute('fullname_sikola');

            // $("#program_studi").val(null).trigger("change");
            $("#judul_prodi").html("")


            $("#judul_prodi").html(fullname_sikola + " / " + nama_prodi)
            console.log(selectedKodeMatkul);

            tableStatistik.clear().draw();

            let counter = 1;
            fetch('assets/data/list_mk_per_kelas.json')
                .then(response => response.json())
                .then(data => {

                    select22.innerHTML = "<option selected disabled>Pilih Kelas</option>";

                    const filteredData = data.filter(item => item.kode_matkul === selectedKodeMatkul);

                    let groups = {};
                    filteredData.forEach(item => {
                        console.log(item.shortname_sikola);


                        let requestOptions = {
                            method: "GET",
                            redirect: "follow"
                        };

                        fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=core_course_get_courses_by_field&field=shortname&value=${item.shortname_sikola}`, requestOptions)
                            .then((response) => response.json())
                            .then(data => {
                                fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=core_course_get_contents&courseid=${data.courses[0].id}`, requestOptions)
                                    .then((response) => response.json())
                                    .then(result => {
                                        let urls = result.map(section => {
                                            return section.modules.filter(modul => modul.modname === "url").length;
                                        }).reduce((total, current) => total + current, 0);

                                        let files = result.map(section => {
                                            return section.modules.filter(modul => modul.modname === "resource" || modul.modname === "folder").length;
                                        }).reduce((total, current) => total + current, 0);

                                        let forums = result.map(section => {
                                            return section.modules.filter(modul => modul.modname === "forum").length;
                                        }).reduce((total, current) => total + current, 0);



                                        let banyakAlur = result.filter(alur => alur.name !== "Info Matakuliah");
                                        let banyakTerisi = banyakAlur.filter(alur => alur.modules && alur.modules.length > 0);
                                        let tugas = result.map(section => {
                                            return section.modules.filter(modul => modul.modname === "assign").length;
                                        }).reduce((total, current) => total + current, 0);
                                        let surveys = result.map(section => {
                                            return section.modules.filter(modul => modul.modname === "survey").length;
                                        }).reduce((total, current) => total + current, 0);
                                        let quizes = result.map(section => {
                                            return section.modules.filter(modul => modul.modname === "quiz").length;
                                        }).reduce((total, current) => total + current, 0);


                                        console.log(files);

                                        let infoMK = result.filter(alur => alur.name == "Info Matakuliah");
                                        let rps = infoMK.filter(section => section.modules.some(modul => modul.modname == "resource"));


                                        tableStatistik.row.add([
                                            counter++,
                                            data.courses[0].fullname,
                                            banyakTerisi.length,
                                            banyakAlur.length,
                                            rps.length,
                                            tugas,
                                            tugas,
                                            urls,
                                            files,
                                            surveys,
                                            quizes,
                                            forums
                                        ]).draw(false);
                                    })
                                    .catch((error) => console.error(error));




                                console.log(data.courses[0].id);
                            })
                            .catch(error => {

                                console.error(error)
                            });

                        if (!groups[item.nama_prodi]) {
                            groups[item.nama_prodi] = document.createElement('optgroup');
                            groups[item.nama_prodi].label = item.nama_prodi;
                            select22.appendChild(groups[item.nama_prodi]);
                        }

                        const option = document.createElement('option');
                        option.setAttribute('fullname_kelas_sikola', item.fullname_kelas_sikola);

                        option.value = item.id_kelas;
                        option.text = item.fullname_kelas_sikola;
                        groups[item.nama_prodi].appendChild(option);
                    });
                    $("#loader").removeClass("d-flex").addClass("d-none")

                })
                .catch(error => {
                    $("#loader").removeClass("d-flex").addClass("d-none")


                    console.error('Error loading JSON file:', error)
                });
        });
    })
    .catch(error => console.error('Error loading JSON file:', error)).finally();



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

        const select = document.getElementById("program_studi");

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

            let counter = 1;


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

                                        let urls = result.map(section => {
                                            return section.modules.filter(modul => modul.modname === "url").length;
                                        }).reduce((total, current) => total + current, 0);

                                        let files = result.map(section => {
                                            return section.modules.filter(modul => modul.modname === "resource" || modul.modname === "folder").length;
                                        }).reduce((total, current) => total + current, 0);

                                        let forums = result.map(section => {
                                            return section.modules.filter(modul => modul.modname === "forum").length;
                                        }).reduce((total, current) => total + current, 0);



                                        let banyakAlur = result.filter(alur => alur.name !== "Info Matakuliah");
                                        let banyakTerisi = banyakAlur.filter(alur => alur.modules && alur.modules.length > 0);
                                        let tugas = result.map(section => {
                                            return section.modules.filter(modul => modul.modname === "assign").length;
                                        }).reduce((total, current) => total + current, 0);
                                        let surveys = result.map(section => {
                                            return section.modules.filter(modul => modul.modname === "survey").length;
                                        }).reduce((total, current) => total + current, 0);
                                        let quizes = result.map(section => {
                                            return section.modules.filter(modul => modul.modname === "quiz").length;
                                        }).reduce((total, current) => total + current, 0);


                                        console.log(files);

                                        let infoMK = result.filter(alur => alur.name == "Info Matakuliah");
                                        let rps = infoMK.filter(section => section.modules.some(modul => modul.modname == "resource"));

                                        tableStatistik.row.add([
                                            counter++,
                                            item.fullname,
                                            banyakTerisi.length,
                                            banyakAlur.length,
                                            rps.length,
                                            tugas,
                                            tugas,
                                            urls,
                                            files,
                                            surveys,
                                            quizes,
                                            forums
                                        ]).draw(false);

                                    })
                                    .catch((error) => console.error(error));



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

function get_id_prodi() {

}

async function get_mk(params) {
    console.log(params);

    $("#table_statistik_matkul_pra").DataTable({
        stateSave: !0,
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

    const selectedOption = params.options[params.selectedIndex];
    const selectedKodeMatkul = selectedOption.getAttribute('data_kode_matkul');
    console.log(selectedKodeMatkul, " KODE_MK");

}