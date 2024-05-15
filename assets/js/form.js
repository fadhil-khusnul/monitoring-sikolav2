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


let activeSemester = "TA232"
let active = "2023/2024 Genap"


const selectSemester = document.getElementById("semester_select")

optionDefault = document.createElement("option")
optionDefault.value = 72
optionDefault.text = "2023/2024 (20232/GENAP)"
optionDefault.setAttribute('ta_semester', "TA232");
optionDefault.setAttribute("mk_aktif", active);

selectSemester.appendChild(optionDefault)


function get_prodi(params) {
    tableStatistik.clear().draw();

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
                    option.setAttribute('id_prodi', item.id);

                    optgroup.appendChild(option);
                });

                select.appendChild(optgroup);
            }
            $("#loader").removeClass("d-none").addClass("d-flex")


            $(select).on("change", function(e) {
                const paramsOptions = params.options[params.selectedIndex];
                const mk_aktif = paramsOptions.getAttribute('mk_aktif');



                $("#judul_prodi").html("")




                let counter = 1;


                const requestOptions = {
                    method: "GET",
                    redirect: "follow"
                };

                const selectedOption = this.options[this.selectedIndex];
                const nama_prodi = this.options[this.selectedIndex].value;
                const id_prodi = selectedOption.getAttribute('id_prodi');
                $("#judul_prodi").html(nama_prodi)

                console.log(nama_prodi, id_prodi);

                select_mk_fun(id_prodi, nama_prodi, selectedOption, requestOptions, counter, mk_aktif)

            })
        });

}

function select_mk_fun(id_prodi, nama_prodi, selectedOption, requestOptions, counter, mk_aktif) {
    console.log(mk_aktif);
    $("#select_mk").empty();


    tableStatistik.clear().draw();


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

                                // let uniqueValues = [...new Set([...result.map(section => section.modules.map(modul => modul.modname)).flat())]]
                                // Ensure that the values are numeric
                                // let numericValues = uniqueValues.map(value => parseInt(value));
                                tableStatistik.row.add([
                                    counter++,
                                    `<a href="https://sikola-v2.unhas.ac.id/course/view.php?id=${item.id}" target="_blank" class="">${item.fullname} <i class="fe-external-link"></i></a>`,
                                    banyakTerisi.length,
                                    banyakAlur.length,
                                    rps.length,
                                    tugas,
                                    tugas,
                                    urls,
                                    files,
                                    surveys,
                                    quizes,
                                    forums,
                                    `<a href="https://sikola-v2.unhas.ac.id/report/view.php?courseid=${item.id}" target="_blank" class="">Reports <i class="fe-external-link"></i></a>`,
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



    fetch_mk(mk_aktif, id_prodi, requestOptions)





}

function fetch_mk(mk_aktif, id_prodi, requestOptions) {
    tableStatistik.clear().draw();

    // console.log("MK AKTIFF", id_prodi);

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


            // console.log(listMk);
            $("#loader").removeClass("d-none").addClass("d-flex")

            $(select_mk).off("change");
            $(select_mk).on("change", function(e) {
                // $("#loader").removeClass("d-none").addClass("d-flex")

                const selectedOption = this.options[this.selectedIndex];
                const selectedKodeMatkul = selectedOption.getAttribute('data_kode_matkul');
                const nama_prodi = selectedOption.getAttribute('nama_prodi');
                const fullname_sikola = selectedOption.getAttribute('fullname_sikola');

                // $("#program_studi").val(null).trigger("change");
                $("#judul_prodi").html("")


                $("#judul_prodi").html(fullname_sikola + " / " + nama_prodi)
                console.log(selectedKodeMatkul);

                tableStatistik.clear().draw();

                fetch('assets/data/list_mk_per_kelas.json')
                    .then(response => response.json())
                    .then(data => {
                        console.log(selectedKodeMatkul);

                        let counter = 1;

                        const filteredData = data.filter(item => item.kode_matkul === selectedKodeMatkul);

                        console.log(filteredData);
                        filteredData.forEach(item => {
                            console.log(item.shortname_sikola);
                            fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=core_course_get_courses_by_field&field=shortname&value=${item.shortname_sikola}`, requestOptions)
                                .then((response) => response.json())
                                .then(data => {
                                    fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=core_course_get_contents&courseid=${data.courses[0].id}`, requestOptions)
                                        .then((response) => response.json())
                                        .then(result => {
                                            // let uniqueValues = [...new Set([...result.map(section => section.modules.map(modul => modul.modname)).flat()])];
                                            // console.log(uniqueValues);
                                            // let numericValues = uniqueValues.map(value => parseInt(value));
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
                                                `<a href="https://sikola-v2.unhas.ac.id/course/view.php?id=${data.courses[0].id}" target="_blank" class="">${data.courses[0].fullname} <i class="fe-external-link"></i></a>`,
                                                banyakTerisi.length,
                                                banyakAlur.length,
                                                rps.length,
                                                tugas,
                                                tugas,
                                                urls,
                                                files,
                                                surveys,
                                                quizes,
                                                forums,
                                                `<a href="https://sikola-v2.unhas.ac.id/report/view.php?courseid=${data.courses[0].id}" target="_blank" class="">Reports <i class="fe-external-link"></i></a>`,

                                            ]).draw(false);
                                        })
                                        .catch((error) => console.error(error));




                                    console.log(data.courses[0].id);
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