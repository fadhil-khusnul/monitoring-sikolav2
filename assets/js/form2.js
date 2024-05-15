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

        const select11 = document.getElementById("kode_mk[2]");
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




const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Accept", "*/*      ");
myHeaders.append("Access-Control-Allow-Origin", "*");
myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjE0OTNiZWJlYjk3NGE4OWQ2NjVkMzA0NTM1YmNjODZhZWRlMDllYmYzYTZhMWYyODcwZjEzZjliZjM0ODUxZjYxNGNjZjgyYmQwMTYwNjZiIn0.eyJhdWQiOiIyIiwianRpIjoiMTQ5M2JlYmViOTc0YTg5ZDY2NWQzMDQ1MzViY2M4NmFlZGUwOWViZjNhNmExZjI4NzBmMTNmOWJmMzQ4NTFmNjE0Y2NmODJiZDAxNjA2NmIiLCJpYXQiOjE3MTU2MTQwNzksIm5iZiI6MTcxNTYxNDA3OSwiZXhwIjoxNzE2MDQ2MDc5LCJzdWIiOiI4NTQ5NiIsInNjb3BlcyI6WyIqIl19.W5pUkAElWObnACMpL2cCnaph1Cep3bKJ7PrSfB-KVUtRov-77LJC8CvgkiZZM8UludPJJguXdaC4daEQ6hNgd6TJFt47UWz8WsgubozI8089Q8k7HF0k_BniSOGBcYvYIwpDuBhOMqP1r6r6G5_gFa7uVDUx3tCIBd1pvEgARzl31QwQ7fDcwHjPlxkwJ3WN3kL3ECcbQbSrHGTxCM2eoWdzSQq6jXf44zSRBAiFGCdK-9AJLSyb5_ZVYhYZQxNFNc60g0EnmJ4y68KqV33N1JEl_zhIPVoTvO5H4V8fQf-2O6GPTIiA1gmwTiS1YhhGPoFbDzoI_lw8nfjfhsaeWzZaj_7akT4JBuXcidwG-KhZZfz3o28oIwUBo0bjNtZXpglXVV_h-_C1R2VdMRf-ybhcuNeJErxTU29dmqV21pn_qf_bhzrViTCjnslgJXLsuRNeYDPiwKITmhgoxJQt_dahKui6S9REF2EWON577IEo4KnsNrvHey1SPeGjWty5fUCVfbBbHBc8okdr4lZciCcRpP54Gw8q2ZOxwaCGjMM2qKxxocmRILftBXXIW1GXAiB6yOWuxUMg_lvXF6ObpC2vMSbKUg9NzGELfuTdDhhu-Q6JiEdw9otPO8qIeRvALXMcTF5odc08XcBpTuDtLFRAVvKaT51EFBWQ6Z9MD1Q");


console.log(myHeaders);
const requestOptionsNeosia = {
    method: "GET",
    headers: myHeaders,
    // maxBodyLength: Infinity,
    // withCredentials: true,
    crossorigin: true,
    redirect: "follow",
    origin: 'http:'
        // mode: 'no-cors',

};
// fetch("http://api.neosia.unhas.ac.id/api/admin_mkpk/activeSemester", requestOptionsNeosia)
//     .then((response) => response.json())
//     .then(result => {
//         console.log(result);


//         result.forEach(semester => {
//             const option = document.createElement("option")
//             option.value = semester.activeSemester.id
//             option.text = `${semester.activeSemester.tahun_ajaran} (${semester.activeSemester.kode}/${semester.activeSemester.jenis})`


//             selectSemester.appendChild(option)
//         })


//     })
//     .catch((error) => console.error(error));


const selectSemester = document.getElementById("semester_select")

optionDefault = document.createElement("option")
optionDefault.value = 72
optionDefault.text = "2023/2024 (20232/GENAP)"
optionDefault.setAttribute('ta_semester', "TA232");

selectSemester.appendChild(optionDefault)



async function get_prodi(params) {
    console.log(params);

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

            $(select).on("change", function(e) {
                $("#loader").removeClass("d-none").addClass("d-flex")


                $("#judul_prodi").html("")



                tableStatistik.clear().draw();

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
                select_mk_fun(id_prodi, nama_prodi, selectedOption)



                // fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=core_course_get_categories&criteria[0][key]=name&criteria[0][value]=${selectedOption}`, requestOptions)
                //     .then((response) => response.json())
                //     .then(result => {
                //         console.log(result[0].id)
                //         fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=core_course_get_courses_by_field&field=category&value=${result[0].id}`, requestOptions)
                //             .then((response) => response.json())
                //             .then(dataCourses => {

                //                 let filteredCourses = dataCourses.courses.filter(course => course.shortname.includes(activeSemester));

                //                 filteredCourses.forEach(item => {
                //                     fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=core_course_get_contents&courseid=${item.id}`, requestOptions)
                //                         .then((response) => response.json())
                //                         .then(result => {

                //                             let urls = result.map(section => {
                //                                 return section.modules.filter(modul => modul.modname === "url").length;
                //                             }).reduce((total, current) => total + current, 0);

                //                             let files = result.map(section => {
                //                                 return section.modules.filter(modul => modul.modname === "resource" || modul.modname === "folder").length;
                //                             }).reduce((total, current) => total + current, 0);

                //                             let forums = result.map(section => {
                //                                 return section.modules.filter(modul => modul.modname === "forum").length;
                //                             }).reduce((total, current) => total + current, 0);



                //                             let banyakAlur = result.filter(alur => alur.name !== "Info Matakuliah");
                //                             let banyakTerisi = banyakAlur.filter(alur => alur.modules && alur.modules.length > 0);
                //                             let tugas = result.map(section => {
                //                                 return section.modules.filter(modul => modul.modname === "assign").length;
                //                             }).reduce((total, current) => total + current, 0);
                //                             let surveys = result.map(section => {
                //                                 return section.modules.filter(modul => modul.modname === "survey").length;
                //                             }).reduce((total, current) => total + current, 0);
                //                             let quizes = result.map(section => {
                //                                 return section.modules.filter(modul => modul.modname === "quiz").length;
                //                             }).reduce((total, current) => total + current, 0);


                //                             console.log(files);

                //                             let infoMK = result.filter(alur => alur.name == "Info Matakuliah");
                //                             let rps = infoMK.filter(section => section.modules.some(modul => modul.modname == "resource"));

                //                             tableStatistik.row.add([
                //                                 counter++,
                //                                 `<a href="https://sikola-v2.unhas.ac.id/course/view.php?id=${item.id}" target="_blank" class="">${item.fullname} <i class="fe-external-link"></i></a>`,
                //                                 banyakTerisi.length,
                //                                 banyakAlur.length,
                //                                 rps.length,
                //                                 tugas,
                //                                 tugas,
                //                                 urls,
                //                                 files,
                //                                 surveys,
                //                                 quizes,
                //                                 forums
                //                             ]).draw(false);

                //                         })
                //                         .catch((error) => console.error(error));



                //                 });
                //                 $("#loader").removeClass("d-flex").addClass("d-none")

                //             })
                //             .catch((error) => console.error(error));
                //     })
                //     .catch(error => {
                //         console.error(error);
                //         $("#loader").removeClass("d-flex").addClass("d-none")

                //     });




            })
        });

}

function select_mk_fun(id_prodi, nama_prodi, selectedOption) {
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

    fetch('assets/data/list_mk.json').then(response => response.json())
        .then(data => {

            const select_mk = document.getElementById("select_mk");

            const listMk = data.filter(mk => mk.id_prodi == id_prodi)
            console.log(listMk);

            listMk.forEach(mk => {
                const option = document.createElement('option');
                option.value = mk.idnumber_sikola;
                option.text = mk.fullname_sikola;
                select_mk.appendChild(option);

            })


        }).catch(error => {
                console.log(error)

            }

        )

}