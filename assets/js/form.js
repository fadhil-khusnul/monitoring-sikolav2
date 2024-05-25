var scrollPosition = 0;
var tableStatistik = $("#table_statistik_matkul").DataTable({

    // stateSave: true,
    scrollX: true,
    // lengthChange: true, // Atur ke true untuk mengaktifkan opsi perubahan jumlah baris per halaman
    dom: '<"dtsp-verticalContainer"<"dtsp-verticalPanes"P><"dtsp-dataTable"Bfrtip>>',
    pageLength: 10,
    buttons: [

        { extend: 'copy', },
        { extend: 'csv' },
    ],

    preDrawCallback: function(settings) {
        // Simpan posisi scroll saat ini sebelum tabel di-draw ulang
        scrollPosition = $(window).scrollTop();
    },

    language: {
        paginate: {
            previous: "<i class='mdi mdi-chevron-left'>",
            next: "<i class='mdi mdi-chevron-right'>"
        }
    },
    drawCallback: function() {
        $(".dataTables_paginate > .pagination").addClass("pagination-rounded");
        $(window).scrollTop(scrollPosition);
    }
});


let activeSemester = "TA232"
let active = "2023/2024 Genap"
let id_fakultas = document.getElementById("id_fakultas").value;
// sessionStorage.setItem('mk_aktif', active);


// var chart;

const selectSemester = document.getElementById("semester_select")

optionDefault = document.createElement("option")
optionDefault.value = 72
optionDefault.text = "2023/2024 (20232/GENAP)"
optionDefault.setAttribute('ta_semester', "TA232");
optionDefault.setAttribute("mk_aktif", active);

selectSemester.appendChild(optionDefault)
    // const optionSecond = document.createElement("option");
    // optionSecond.value = 73;
    // optionSecond.text = "2024/2025 (20241/GANJIL)";
    // optionSecond.setAttribute('ta_semester', "TA241");
    // optionSecond.setAttribute("mk_aktif", active);
    // selectSemester.appendChild(optionSecond);







// if (nama_prodi_storage) {
//     $("#filter_data, #clear_filter").attr("disabled", true);
//     $("#btn_spinner").removeClass("d-none")
//     $("#judul_prodi, #apex-column-2, #apex-pie-1").html("")
//     tableStatistik.clear().draw();

//     // Set the stored values to the select elements
//     // document.getElementById("semester_select").value = semester_aktif_storage;



//     $("#semester_select").on("change", function(e) {
//         // Check if the event was triggered manually
//         console.log(e);
//         semester_select_fun()
//         $('#program_studi').val(nama_prodi_storage);
//         console.log(nama_prodi_storage);
//         prodi_select_fun()

//     });

//     $('#semester_select').val(semester_aktif_storage).trigger('change');



//     // document.getElementById("program_studi").value = nama_prodi_storage;
//     // $('#program_studi').val("EKONOMI PEMBANGUNAN DAN PERENCANAAN - S2").trigger('change');


//     // const select = document.getElementById("program_studi");
//     // const selectedOption = select.options[select.selectedIndex];
//     // const selectedOption1 = semester_select.options[semester_select.selectedIndex];
//     // console.log(selectedOption, selectedOption1);

//     // $("#select_mk").val(mk_value_storage).trigger('change'); // Use select2 method to set value

//     // const params = document.getElementById("program_studi")
//     // Call the required functions
//     // semester_select();
//     // prodi_select(params);
//     // filter_data();
// }



let nama_prodi_storage = sessionStorage.getItem('nama_prodi_storage');
const id_prodi_storage = sessionStorage.getItem('id_prodi_storage');
const semester_aktif_storage = sessionStorage.getItem('semester_aktif_storage');
let mk_value_storage = sessionStorage.getItem('mk_value_storage');
let isFilterCleared = false; // Variabel flag untuk melacak status filter
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

    sessionStorage.setItem('nama_prodi_storage', nama_prodi);


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

    console.log(active, "active");


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
    //     $('#select_mk').val("").trigger('change');

    //     sessionStorage.removeItem('mk_value_storage');

    //     filter_data() // Remove from sessionStorage


    // }

    if (nama_prodi_storage && !mk_value_storage) {
        console.log("1111");
        // $('#program_studi').val(nama_prodi_storage).trigger('change');
        filter_data();
        nama_prodi_storage = null;
        // sessionStorage.removeItem('nama_prodi_storage'); // Remove from sessionStorage
        // Reset mk_value_storage

    } else if (nama_prodi_storage && mk_value_storage) {
        console.log("222");
        $('#select_mk').val(mk_value_storage).trigger('change');
        filter_data();
        mk_value_storage = null; // Reset mk_value_storage
        sessionStorage.removeItem('mk_value_storage'); // Remove from sessionStorage

    }



    // nama_prodi_storage = null;

}



async function filter_data() {

    if (isFilterCleared) {
        return;
    }

    console.log("FILTERR");
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };
    $("#filter_data, #clear_filter").attr("disabled", true);
    $("#btn_spinner").removeClass("d-none")
    $("#judul_prodi, #apex-column-2, #apex-pie-1").html("")
    tableStatistik.clear().draw();

    let nama_prodi = document.getElementById("program_studi").value
    let semester_aktif = document.getElementById("semester_select").value
    let id_prodi = document.getElementById("program_studi");
    id_prodi = id_prodi.options[id_prodi.selectedIndex];
    id_prodi = id_prodi.getAttribute('id_prodi');
    // console.log(nama_prodi, id_prodi);
    console.log("HAHSHAHSAH", id_prodi, nama_prodi);

    sessionStorage.setItem('nama_prodi_storage', nama_prodi)
    sessionStorage.setItem('id_prodi_storage', id_prodi)
    sessionStorage.setItem('semester_aktif_storage', semester_aktif)



    const select_mk = document.getElementById("select_mk");

    const selectedOption = select_mk.options[select_mk.selectedIndex];
    const mk_value = selectedOption.value
    const selectedKodeMatkul = selectedOption.getAttribute('data_kode_matkul');
    const fullname_sikola = selectedOption.getAttribute('fullname_sikola');


    if (!selectedKodeMatkul && !fullname_sikola) {

        try {
            $("#judul_prodi").html(nama_prodi)

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

            counter = 1;


            const fetchPromises = filteredCourses.map(item => {
                return fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=core_course_get_contents&courseid=${item.id}`, requestOptions)
                    .then((response) => response.json())
                    .then(async result => {

                        let urls = result.map(section => {
                            return section.modules.filter(modul => modul.modname === "url").length;
                        }).reduce((total, current) => total + current, 0);

                        totalKasus += urls

                        let files = result.map(section => {
                            return section.modules.filter(modul => modul.modname === "resource" || modul.modname === "folder").length;
                        }).reduce((total, current) => total + current, 0);

                        totalDoc += files

                        let forums = result.map(section => {
                            return section.modules.filter(modul => modul.modname === "forum").length;
                        }).reduce((total, current) => total + current, 0);

                        totalForum += forums



                        let banyakAlur = result.filter(alur => alur.name !== "Info Matakuliah");
                        let banyakTerisi = banyakAlur.filter(alur => alur.modules && alur.modules.length > 0);

                        totalBanyakTerisi += banyakTerisi.length

                        let tugas = result.map(section => {
                            return section.modules.filter(modul => modul.modname === "assign").length;
                        }).reduce((total, current) => total + current, 0);

                        totalTugas += tugas

                        let surveys = result.map(section => {
                            return section.modules.filter(modul => modul.modname === "survey").length;
                        }).reduce((total, current) => total + current, 0);

                        totalSurvey += surveys

                        let quizes = result.map(section => {
                            return section.modules.filter(modul => modul.modname === "quiz").length;
                        }).reduce((total, current) => total + current, 0);

                        totalQuiz += quizes



                        let infoMK = result.filter(alur => alur.name === "Info Matakuliah");
                        let rps = infoMK.filter(section => section.modules.some(modul => modul.modname == "resource"));

                        totalRps += rps.length

                        let attendanceModules = [];

                        infoMK.forEach(section => {
                            section.modules.forEach(modul => {
                                if (modul.modname === "attendance") {
                                    attendanceModules.push(modul);
                                }

                            });
                        });
                        let absenDosen = attendanceModules.filter(alur => alur.name === "Presensi Pengampu Mata Kuliah");


                        const namaDosen = await getUserDosen(absenDosen, requestOptions);
                        // console.log(namaDosen, "NAMA DOSENN");

                        const namaDosenListItems = namaDosen.map(dosen => `<li>${dosen.firstname} ${dosen.lastname}</li>`).join('');

                        // Wrap the &lt;li&gt; elements in an &lt;ol&gt; tag
                        const namaDosenHtml = `<ol>${namaDosenListItems}</ol>`;



                        tableStatistik.row.add([
                            counter++,
                            `<a href="https://sikola-v2.unhas.ac.id/course/view.php?id=${item.id}" target="_blank" class="">${item.fullname} <i class="fe-external-link"></i></a>`,
                            banyakTerisi.length,
                            banyakAlur.length,
                            rps.length,
                            // tugas,
                            tugas,
                            // urls,
                            files,
                            surveys,
                            quizes,
                            forums,
                            `${namaDosenHtml}`,
                            `<a href="https://sikola-v2.unhas.ac.id/report/outline/index.php?id=${item.id}" target="_blank" class="">Activity Report <i class="fe-external-link"></i></a> <br>
                            <a href="https://sikola-v2.unhas.ac.id/report/progress/index.php?course=${item.id}" target="_blank" class="">Activity Completion <i class="fe-external-link"></i></a>`,
                        ]).draw(false);

                    })
                    .catch((error) => console.error(error));



            });


            Promise.all(fetchPromises).then(() => {
                console.log(totalBanyakTerisi, "BNAYY");
                grafik_statistik(totalBanyakTerisi, totalRps, totalProyek, totalTugas, totalKasus, totalDoc, totalSurvey, totalQuiz, totalForum, nama_prodi);
                $("#btn_spinner").addClass("d-none")
                $("#clear_filter").removeAttr("disabled")

                $("#filter_data").removeAttr("disabled")


            });

        } catch (error) {

            console.log(error);

        }
    } else {
        try {
            sessionStorage.setItem('selectedKodeMatkul_storage', selectedKodeMatkul)
            sessionStorage.setItem('fullname_sikola_storage', fullname_sikola)
            sessionStorage.setItem('mk_value_storage', mk_value)
            $("#judul_prodi").html(fullname_sikola + " / " + nama_prodi)

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

            const filteredData = data.filter(item => item.kode_matkul === selectedKodeMatkul);

            const fetchPromises = filteredData.map(item => {
                // console.log(item.shortname_sikola);
                return fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=core_course_get_courses_by_field&field=shortname&value=${item.shortname_sikola}`, requestOptions)
                    .then((response) => response.json())
                    .then(data => {
                        return fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=core_course_get_contents&courseid=${data.courses[0].id}`, requestOptions)
                            .then((response) => response.json())
                            .then(async result => {
                                let urls = result.map(section => {
                                    return section.modules.filter(modul => modul.modname === "url").length;
                                }).reduce((total, current) => total + current, 0);

                                totalKasus += urls


                                let files = result.map(section => {
                                    return section.modules.filter(modul => modul.modname === "resource" || modul.modname === "folder").length;
                                }).reduce((total, current) => total + current, 0);


                                totalDoc += files

                                let forums = result.map(section => {
                                    return section.modules.filter(modul => modul.modname === "forum").length;
                                }).reduce((total, current) => total + current, 0);

                                totalForum += forums

                                let banyakAlur = result.filter(alur => alur.name !== "Info Matakuliah");
                                let banyakTerisi = banyakAlur.filter(alur => alur.modules && alur.modules.length > 0);
                                totalBanyakTerisi += banyakTerisi.length

                                // totalBanyakTerisi += banyakTerisi.length;

                                let tugas = result.map(section => {
                                    return section.modules.filter(modul => modul.modname === "assign").length;


                                }).reduce((total, current) => total + current, 0);

                                totalTugas += tugas

                                let surveys = result.map(section => {
                                    return section.modules.filter(modul => modul.modname === "survey").length;
                                }).reduce((total, current) => total + current, 0);

                                totalSurvey += surveys

                                let quizes = result.map(section => {
                                    return section.modules.filter(modul => modul.modname === "quiz").length;
                                }).reduce((total, current) => total + current, 0);


                                totalQuiz += quizes


                                console.log(files);

                                let infoMK = result.filter(alur => alur.name == "Info Matakuliah");
                                let rps = infoMK.filter(section => section.modules.some(modul => modul.modname == "resource"));

                                totalRps += rps.length

                                let attendanceModules = [];

                                infoMK.forEach(section => {
                                    section.modules.forEach(modul => {
                                        if (modul.modname === "attendance") {
                                            attendanceModules.push(modul);
                                        }

                                    });
                                });
                                let absenDosen = attendanceModules.filter(alur => alur.name === "Presensi Pengampu Mata Kuliah");


                                const namaDosen = await getUserDosen(absenDosen, requestOptions);

                                const namaDosenListItems = namaDosen.map(dosen => `<li>${dosen.firstname} ${dosen.lastname}</li>`).join('');

                                // Wrap the &lt;li&gt; elements in an &lt;ol&gt; tag
                                const namaDosenHtml = `<ol>${namaDosenListItems}</ol>`;

                                tableStatistik.row.add([
                                    counter++,
                                    `<a href="https://sikola-v2.unhas.ac.id/course/view.php?id=${data.courses[0].id}" target="_blank" class="">${data.courses[0].fullname} <i class="fe-external-link"></i></a>`,
                                    banyakTerisi.length,
                                    banyakAlur.length,
                                    rps.length,
                                    // tugas,
                                    tugas,
                                    // urls,
                                    files,
                                    surveys,
                                    quizes,
                                    forums,
                                    namaDosenHtml,
                                    `
                                    <a href="https://sikola-v2.unhas.ac.id/report/outline/index.php?id=${data.courses[0].id}" target="_blank" class="">Activity Report <i class="fe-external-link"></i></a>
                                    <br>
                                    <a href="https://sikola-v2.unhas.ac.id/report/progress/index.php?course=${data.courses[0].id}" target="_blank" class="">Activity Completion <i class="fe-external-link"></i></a>
                                    
                                    `
                                ]).draw(false);
                            })
                            .catch((error) => console.error(error));
                    })
                    .catch(error => {
                        console.error(error)
                    });
            });

            Promise.all(fetchPromises).then(() => {

                console.log("bnnn", totalBanyakTerisi);

                nama_prodi = `${fullname_sikola} / ${nama_prodi}`

                grafik_statistik(totalBanyakTerisi, totalRps, totalProyek, totalTugas, totalKasus, totalDoc, totalSurvey, totalQuiz, totalForum, nama_prodi);


                $("#btn_spinner").addClass("d-none")
                $("#clear_filter").removeAttr("disabled")

                $("#filter_data").removeAttr("disabled")

            });


        } catch (error) {
            console.log(error);

        }
    }





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

async function grafik_statistik(totalBanyakTerisi, totalRps, totalProyek, totalTugas, totalKasus, totalDoc, totalSurvey, totalQuiz, totalForum, nama_prodi) {
    $("#apex-column-2").html("")
    $("#apex-pie-1").html("")

    // if (chart) {
    //     chart.destroy(); // Destroy the previous chart instance
    // }

    // console.log("BNNN");
    colors = ["#077AC3", "#4fc6e1", "#4892B5", "#405D88", "#4A81D4", "#00B19D", "#798385", "#B56C79", "#F1556C"];
    (dataColors = $("#apex-column-2").data("colors")) && (colors = dataColors.split(","));
    options = {
        chart: {
            height: 380,
            type: "bar",
            zoom: { enabled: !0 },
            toolbar: { show: !0 }
        },
        plotOptions: {
            bar: {
                dataLabels: { position: "top" },
                distributed: true
            }
        },
        dataLabels: {
            enabled: !0,
            offsetY: -30,
            style: { fontSize: "12px", colors: ["#304758"] }
        },
        // stroke: { width: [3, 3], curve: "smooth" },
        colors: colors,
        series: [{
            name: "Total",

            // type: 'bar',
            data: [totalBanyakTerisi, totalRps, totalTugas, totalDoc, totalSurvey, totalQuiz, totalForum]
        }, ],

        labels: ["Alur Pembelajaran (Terisi)", "RPS", "Tugas", "Doc", "Survey", "Quiz", "Forum"],

        xaxis: {
            // categories: ["Alur Pembelajaran (Terisi)", "RPS", "Proyek", "Tugas", "Kasus/Url", "Doc", "Survey", "Quiz", "Forum"],
            axisBorder: { show: !0 },
            axisTicks: { show: !0 },
            crosshairs: {
                fill: {
                    type: "gradient",
                    gradient: {
                        colorFrom: "#D8E3F0",
                        colorTo: "#BED1E6",
                        stops: [0, 100],
                        opacityFrom: .4,
                        opacityTo: .5
                    }
                }
            },
            tooltip: { enabled: !1, offsetY: -35 }
        },
        fill: { gradient: { enabled: !1, shade: "light", type: "horizontal", shadeIntensity: .25, gradientToColors: void 0, inverseColors: !0, opacityFrom: 1, opacityTo: 1, stops: [50, 0, 100, 100] } },
        yaxis: {
            axisBorder: { show: !0 },
            axisTicks: { show: !0 },
            labels: { show: !0 },
        },
        title: {
            text: nama_prodi,
            align: "center",
            style: { color: "#444" }
        },
        // legend: { show: !0, position: "bottom", horizontalAlign: "center", verticalAlign: "middle", floating: !1, fontSize: "14px", offsetX: 0, offsetY: 7 },

        grid: { row: { colors: ["transparent", "transparent"], opacity: .2 }, borderColor: "#f1f3fa" }
    };

    chart = new ApexCharts(document.querySelector("#apex-column-2"), options);
    chart.render();

    document.querySelector("#apex-column-2")._chartInstance = chart;



    colors = ["#077AC3", "#4fc6e1", "#4892B5", "#405D88", "#4A81D4", "#00B19D", "#798385", "#B56C79", "#F1556C"];
    (dataColors = $("#apex-pie-1").data("colors")) && (colors = dataColors.split(","));
    options = {
        chart: {
            height: 380,
            type: "pie",
            zoom: { enabled: !0 },
            toolbar: { show: !0 }
        },
        title: {
            text: nama_prodi,
            align: "center",
            style: { color: "#444" }
        },
        series: [totalBanyakTerisi, totalRps, totalTugas, totalDoc, totalSurvey, totalQuiz, totalForum],
        labels: ["Alur Pembelajaran (Terisi)", "RPS", "Tugas", "Doc", "Survey", "Quiz", "Forum"],
        colors: colors,
        legend: { show: !0, position: "bottom", horizontalAlign: "center", verticalAlign: "middle", floating: !1, fontSize: "14px", offsetX: 0, offsetY: 7 },
        responsive: [{ breakpoint: 600, options: { chart: { height: 240 }, legend: { show: !1 } } }]
    };
    (chart = new ApexCharts(document.querySelector("#apex-pie-1"), options)).render();

    document.querySelector("#apex-pie-1")._chartInstance = chart;

    // const chartPie = new ApexCharts(document.querySelector("#apex-pie-1"));
    // chartPie.option(options)
    // chartPie.render()



    $("#btn_spinner").addClass("d-none")
    $("#clear_filter").removeAttr("disabled")

    $("#filter_data").removeAttr("disabled")
        // chart.destroy(); // Destroy the previous chart instance

    // chart.destroy()
}
// $(document).ready(function() {

// Add an event listener for semester_select change


// });
// if (semester_aktif_storage && nama_prodi_storage) {
//     $('#semester_select').val(semester_aktif_storage).trigger('change');
//     $('#program_studi').val(nama_prodi_storage).trigger('change');
//     filter_data();
// }
// if (semester_aktif_storage && nama_prodi_storage && mk_value_storage) {
//     $('#semester_select').val(semester_aktif_storage).trigger('change');
//     $('#program_studi').val(nama_prodi_storage).trigger('change');
//     $('#select_mk').val(mk_value_storage);
//     filter_data();
// }
// Trigger the semester_select change event
// $('#semester_select').val(semester_aktif_storage).trigger('change');

// // Add an event listener for semester_select change
// $("#semester_select").on("change", function(e) {
//     if (!e.originalEvent) {
//         semester_select_fun();
//         prodi_select_fun();

//     }
// });

// Add an event listener for program_studi change
// $("#program_studi").on("change", function(e) {
//     if (!e.originalEvent) {
//         prodi_select_fun();
//     }
// });



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
    sessionStorage.removeItem('nama_prodi_storage');
    sessionStorage.removeItem('id_prodi_storage');
    sessionStorage.removeItem('semester_aktif_storage');
    sessionStorage.removeItem('selectedKodeMatkul_storage');
    sessionStorage.removeItem('fullname_sikola_storage');
    sessionStorage.removeItem('mk_value_storage');
    sessionStorage.removeItem('mk_aktif');


    $("#judul_prodi").html("")
    $("#filter_data").attr("disabled", true)

    tableStatistik.clear().draw();
    $("#semester_select, #program_studi, #select_mk").val("").trigger("change");



}